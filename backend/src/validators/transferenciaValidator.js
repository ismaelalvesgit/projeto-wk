//@Author ismael alves
import { checkSchema } from 'express-validator'
import { subMinutes } from 'date-fns'
import Contato from '../models/contatos'
import Usuario from '../models/usuario'
import Transferencia from '../models/transferencia'
import statusTransferencia from '../types/statusTransferencia'

class TransferenciaValidator{

    transferir(){
        return checkSchema({
            contato: {
                in: 'body',
                notEmpty: {
                    errorMessage: "contato e requirido"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        if(value){
                            await Contato.findById(value).then(async(doc) => {
                                if(!doc){
                                    return Promise.reject("Contato não encontrado")
                                }
                            })
                        }
                    }
                }
            },
            status: {
                in: 'body',
                isEmpty: {
                    errorMessage: "status deve ser vázio"
                }
            },
            valor: {
                in: 'body',
                notEmpty: {
                    errorMessage: "valor e requirido"
                },
                isNumeric:{
                    errorMessage: "valor necessita ser um número"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        if(value){
                            const body = req.body
                            const usuario = await Usuario.findById(req.user._id)
                            const valor = parseInt(value)
                            const up = await Transferencia.find({valor: valor, dataRegistro: {$gte: subMinutes(new Date(), 2)}, contato: body.contato, status: statusTransferencia.Finalizado})
                            if(up.length == 0){
                                if((valor > usuario.saldo) && (valor > usuario.saldo + usuario.saldoLimite)){
                                    return Promise.reject("Saldo insuficiente na conta :(")
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}

export default new TransferenciaValidator()