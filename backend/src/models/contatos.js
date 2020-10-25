//@Author ismael alves
import mongoose, { Schema } from 'mongoose'

const contatoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'nome e requirido']
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: [true, 'usuario e requirido']
    }
},{
    collection:"contato",
    timestamps: { 
        createdAt: 'dataRegistro', 
        updatedAt: 'dataAtualizacao',
    }
})

contatoSchema.set('toObject', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
    }
})

contatoSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
    }
})

const Contato = mongoose.model('Contato', contatoSchema);

export default Contato;