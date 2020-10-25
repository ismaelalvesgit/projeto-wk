//@Author ismael alves
import Transferencia from '../models/transferencia'
import controllerBase from '../utils/controllerBase'
import authorize from '../middlewares/handlerAuthorizeMiddleware'
import verify from '../middlewares/verifiyHandlerMiddleware'
import transferenciaValidator from '../validators/transferenciaValidator'
import { subMinutes } from 'date-fns'
import Usuario from '../models/usuario'
import statusTransferencia from '../types/statusTransferencia'

module.exports = function(app){

    app.get('/transferencia',
        authorize(),
        controllerBase.findAll({
            model: Transferencia,
            skipLinks: true,
            populate: [
                {
                    path:'contato'
                }
            ],
            sort: {status: -1}
        })
    )

    app.post('/transferencia',
        authorize(),
        transferenciaValidator.transferir(),
        verify,
        async(req, resp, next) => {
            const options = {new: true, runValidators: true}
            const body = {...req.body, usuario: req.user._id}
            const usuario = await Usuario.findById(req.user._id)
            let usuarioSaldo = usuario.saldo
            let usuarioSaldoLimite = usuario.saldoLimite
            Transferencia.find({valor: body.valor, dataRegistro: {$gte: subMinutes(new Date(), 2)}, contato: body.contato, status: statusTransferencia.Finalizado}).then((up) => {
                up.forEach((transferencias)=>{
                    Transferencia.updateOne({_id: transferencias._id}, {status: statusTransferencia.Cancelado}).then()
                })
                // Cadastrando uma nova transferencia
                if(up.length === 0){
                    // Depreciar valor do saldo do usuário somente se não tiver ocorrido tranferencias sucessetivas dentro do periodo de 2m 
                    if(parseInt(body.valor) > usuario.saldo){
                        let valor = body.valor
                        valor = body.valor - usuario.saldo
                        usuarioSaldo = 0
                        usuarioSaldoLimite = usuario.saldoLimite - valor
                    }else{
                        usuarioSaldo = usuario.saldo - body.valor
                    }
                    console.log(`Saldo :${usuarioSaldo} \n Saldo Limite: ${usuarioSaldoLimite}`)
                }
                new Transferencia(body).save().then((doc)=>{
                    Usuario.findOneAndUpdate({_id: req.user._id}, {saldo: usuarioSaldo, saldoLimite: usuarioSaldoLimite}, options).then((user)=>{
                        resp.status(201).json({...doc.toJSON(), usuario: user.toJSON()})
                    }).catch((err)=>{
                        Transferencia.deleteOne({_id: doc._id}).then(()=>{
                            next({name: 'BadRequest', mensagem: "Ops não foi possivel realizar a transferencia tente de novo mais tarde :("})
                        })
                    })
                }).catch(next)
            }).catch(next)
        }
    )
}