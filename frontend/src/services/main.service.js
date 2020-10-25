import axios from 'axios'
import env from '../env'

class MainService{

    baseUrl = env.BASE_URL

    getUsuarioIntial(){
        return new Promise((resolve, reject) =>{
            axios.get(`${this.baseUrl}/system/usuario`).then((response) =>{
                this.setToken(response.data.token)
                this.setUsuario(response.data.usuario)
                resolve(response.data)
            }).catch(reject)
        })
    }

    getGenreric(base){
        return axios.get(`${this.baseUrl}${base}`, {
            headers: {
                "authorization": this.getToken()
            }
        })
    }

    postGenreric(base, data){
        return axios.post(`${this.baseUrl}${base}`, data, {
            headers: {
                "authorization": this.getToken()
            }
        })  
    }

    putGenreric(base, data){
        return axios.put(`${this.baseUrl}${base}`, data, {
            headers: {
                "authorization": this.getToken()
            }
        })  
    }

    delGenreric(base){
        return axios.delete(`${this.baseUrl}${base}`, {
            headers: {
                "authorization": this.getToken()
            }
        }) 
    }

    getToken(){
        return window.localStorage.getItem('token') 
    }

    setToken(token){
        window.localStorage.setItem('token', token)
    }

    getUsuario(){
        return JSON.parse(window.localStorage.getItem('usuario'))
    }

    setUsuario(usuario){
        window.localStorage.setItem('usuario', JSON.stringify(usuario))
    }


}

export default new MainService();