//@Author ismael alves
import jsonwebtoken from 'jsonwebtoken'
import env from '../../config/environments'
import Usuario from '../models/usuario'

export default function authorize(profiles = []){
    return (req, resp, next)=>{  
        if(req.headers.authorization !== undefined){
            const token = req.headers.authorization
            try {
                const decode = jsonwebtoken.verify(token, env.security.secret)
                if(Date.now() >= decode.exp * 1000){next({name:'Forbidden', mensagem: 'Token está expirado'})}
                Usuario.findById(decode.valor).then((db)=>{
                    if(db){
                        req.user = db //atribuido o usuário a requisição
                        if(profiles[0] == undefined){
                            next()
                        }else if(profiles.some(profile => db.tipoUsuario.indexOf(profile) != -1)){
                            next()
                        }else{
                            next({name:'Unauthorized'})
                        }
                    }else{
                        next({name:'Forbidden', mensagem: 'Token inválido ou incorreto'})
                    }
                }).catch(next)  
            } catch (error) {
                next({name:'Forbidden', mensagem: 'Token inválido ou incorreto'})
            }
        }else{
            next({name:'Forbidden', mensagem: 'Token não encontrado'})
        }
    }
}