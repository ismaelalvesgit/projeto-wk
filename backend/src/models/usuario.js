//@Author ismael alves
import mongoose from 'mongoose'
import Contato from './contatos'
import env from '../../config/environments'

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'nome e requirido']
    },
    cpf:{
        type: String,
        index: true, 
        unique: true,
        required:[true, 'cpf e Requirido']
    },
    telefone:{
        type: String,
        required:[true, 'telefone celular e Requirido']
    },
    saldo:{
        type: Number,
        default: 1000
    },
    saldoLimite:{
        type: Number,
        default: 500
    },
    foto:{
        type: String,
        default: env.files.user
    }
},{
    collection:"usuario",
    timestamps: { 
        createdAt: 'dataRegistro', 
        updatedAt: 'dataAtualizacao',
    }
})


const removeMiddleware = async function (next){
    await Contato.deleteOne({usuario: this._conditions._id})
    next()     
}
  
usuarioSchema.pre('deleteOne', removeMiddleware)

usuarioSchema.set('toObject', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
    }
})
usuarioSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;