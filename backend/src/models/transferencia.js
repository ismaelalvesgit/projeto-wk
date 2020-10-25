//@Author ismael alves
import mongoose, { Schema } from 'mongoose'
import statusTransferencia from '../types/statusTransferencia';

const transferenciaSchema = new mongoose.Schema({
    valor:{
        type: Number,
        required: [true, 'valor e requirido']
    },
    status:{
        type: String,
        enum: {
            values: Object.values(statusTransferencia),
            message: 'O valor {VALUE} não faz parte dos tipos de status existentes!'
        },
        trim: true,
        default: statusTransferencia.Finalizado
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: [true, 'usuario e requirido']
    },
    contato: { 
        type: Schema.Types.ObjectId, 
        ref: 'Contato',
        required: [true, 'contato e requirido']
    }
},{
    collection:"transferencia",
    timestamps: { 
        createdAt: 'dataRegistro', 
        updatedAt: 'dataAtualizacao',
    }
})

transferenciaSchema.set('toObject', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
    }
})

transferenciaSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.id;
    }
})

const Transferencia = mongoose.model('Transferencia', transferenciaSchema);

export default Transferencia;