//@Author ismael alves
import mail from '../utils/mail'
import mongoose from 'mongoose'
import speedTest from 'speedtest-net'
import Usuario from '../models/usuario'
import Contato from '../models/contatos'
import Transferencia from '../models/transferencia'
import utils from '../utils/utils'
import authorize from '../middlewares/handlerAuthorizeMiddleware'
import jsonwebtoken from 'jsonwebtoken'
import env from '../../config/environments'

module.exports = function(app){

    //metodo que verifica a saude do sistema
    app.get('/system/healthcheck', 
        (req, resp, next) => {
            try {
                let data = {
                    process: process.pid,
                    uptime: process.uptime(),
                    dataBase:{
                        status: mongoose.STATES[mongoose.connection.readyState],
                    }
                }
                const test = speedTest({maxTime: 5000})
                test.on('data', network => {
                    data.speed = network.speeds
                    data.client = network.client
                    resp.json(data)
                })   
            }  catch (error) {
                mail.notificacaoErro(JSON.stringify(error), null, null)
                resp.status(503).json({nome: "system", mensagem: "serviço indisponivel :("})
            }
        }
    )

    app.get('/system/usuario', async (req, resp, next) => {
        await Transferencia.deleteMany({})
        await Contato.deleteMany({})
        await Usuario.deleteMany({})
        new Usuario({
            nome: "Raquel Barra",
            cpf: 84863016026,
            telefone: 991234160
        }).save().then((doc) => {
            resp.json({usuario: doc.toJSON(), token: utils.gerarToken(doc._id)})
        }).catch(next)
    })

    app.get("/system/usuario/refresh_token",
        authorize(), 
        (req, resp, next) => {
            try {
                const token = req.headers.authorization
                const decode = jsonwebtoken.verify(token, env.security.secret)
                Usuario.findById(decode.valor).then((db)=>{
                    resp.json({token: utils.gerarToken(db._id)})
                }).catch(next)  
            } catch (error) {
                console.log(error)
                next({name:'Forbidden', mensagem: 'Token inválido ou incorreto'})
            }
        }
    )
}