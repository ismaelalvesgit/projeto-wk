//@Author ismael alves
import mongoose from 'mongoose'

export default function multipleValidateId(params = []){
  return (req, resp, next)=>{
    for(let i = 0; i < params.length; i++){
      if(!mongoose.Types.ObjectId.isValid(req.params[params[i]])){
        next({name:'NotFound'})
        break;
      }else if(i+1 == params.length){
        next()
      }
    }
  }
}