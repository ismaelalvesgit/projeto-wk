//@Author ismael alves
import env from '../../config/environments'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import Usuario from '../models/usuario'
import ejs from 'ejs'

// camada de transporte
let transport
try {
    switch (env.email.enviroment){
        case 'OAuth2':
            const oauth2Client = new google.auth.OAuth2(
                env.email.OAuth2.clientId,
                env.email.OAuth2.clientSecret,
                env.email.OAuth2.redirectUri
            )
            oauth2Client.setCredentials({
                refresh_token: env.email.OAuth2.refreshToken,
            })
            const accessToken = oauth2Client.getAccessToken()
            transport = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type: 'OAuth2',
                    user: env.email.notificator,
                    clientId: env.email.OAuth2.clientId,
                    clientSecret: env.email.OAuth2.clientSecret,
                    refreshToken: env.email.OAuth2.refreshToken,
                    accessToken: accessToken,
                },
            })
            break;
        case 'SMTP':    
            transport = nodemailer.createTransport({
                host: env.email.host,
                port: env.email.port,
                auth:{
                    user: env.email.notificator,
                    pass: env.email.pass,
                },
                secure: env.email.secure
            })
            break;
    }
} catch (error) {
    console.log(error)
}

class Mail{

    async notificacaoErro(error, user, idReq){
        let email = env.email.notificator
        let data
        if(user){
            return await Usuario.findById(user).select('-senha').then( async(doc)=>{
                data = {
                    id: idReq,
                    usuario: doc,
                    error: error
                }
               return await this.send(email, "Erro Events", "error", data)
            }) 
        }else{
            data = {
                id: idReq,
                error: error,
            }
            this.send(email, "Erro Events", "error", data)
        }
    }

    send(destinatario, subject, template, data, files){
        return new Promise((resolve, reject)=>{
            ejs.renderFile('./src/views/mail/'+template+'.ejs', data, function(err, html){
                if(err){
                    reject({name:'email', mensagem: err})
                }
                transport.sendMail({
                    to: destinatario,
                    from: env.email.notificator,
                    subject: subject,
                    html: html,
                    attachments: files,
                }).then(resolve).catch((err)=>{
                    reject({name:'email', mensagem: err})
                })
            })
        })
    }
}

export default new Mail()