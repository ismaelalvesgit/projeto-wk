//@Author ismael alves
import fs from 'fs'
import shell from 'shelljs'
import env from '../../config/environments'
import rimraf from 'rimraf'
import jsonwebtoken from 'jsonwebtoken'

class Utils{

    //metodo que deleta uma folder
    deleteFolder(path){
        rimraf.sync(path)
    }

    //metodo que deleta um arquivo de upload
    deleteFile(url){
        const file  = url.split(env.files.uploadsUrl)[1]
        if(file != 'system/default.png'){
            fs.unlinkSync(env.files.uploadsPath+file)
        }
    }

    //metodo que gera o token do usuario
    gerarToken(valor) {
        return jsonwebtoken.sign({valor: valor}, env.security.secret, {
            expiresIn: '1h',
        })
    }

    //metodo que gera o token do usuario
    decryptToken(valor) {
        return jsonwebtoken.verify(valor, env.security.secret)
    }

    //metodo que criar folders
    defaultFolder(folder){
        if (!fs.existsSync(folder)){
            shell.mkdir('-p', folder)
        }
    }

    //metodo gerador de nome
    generateName() {
        const date = new Date().valueOf();
        let text = '';
        const possibleText =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
          text += possibleText.charAt(
            Math.floor(Math.random() * possibleText.length)
          );
        }
        return date + '.' + text;
    }
}

export default new Utils()