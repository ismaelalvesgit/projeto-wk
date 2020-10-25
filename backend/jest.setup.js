//@Author ismael alves
import env from './config/environments'
import mongoose from 'mongoose'

jest.mock('./config/server')

beforeAll( async()=>{
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
    };
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(env.db.url, opts)
})

afterAll( async()=>{
    await mongoose.disconnect()
})