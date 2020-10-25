//@Author ismael alves
import request  from 'supertest'
import Contato from '../src/models/contatos'
import Usuario from '../src/models/usuario'
import Transferencia from '../src/models/transferencia'
import contatoData from './fixtures/contatoData'
import statusTransferencia from '../src/types/statusTransferencia'
const address = global.address

//antes de todo teste
afterEach( async()=>{
    await Usuario.deleteMany({})
    await Contato.deleteMany({})
    await Transferencia.deleteMany({})
})

describe('Fluxo normal de tratamento de erros das tranferencias do usuário', () => {

    test('post - cadastro de uma transferencia do usuário com o valor maior que o saldo e saldoLimite do usuário', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc)=>{
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).post(`/transferencia`)
        .set('authorization', token)
        .send({
            valor: 1501,
            contato: `${contatoId}`
        })
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)
    })

    test('get - cadastro de uma transferencia do usuário com a mesma valor e contato dentro do periodo de 2m', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        let transferenciaId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc)=>{
                contatoId = doc._id
            }),
            await request(address).post(`/transferencia`)
            .set('authorization', token)
            .send({
                valor: 1100,
                contato: `${contatoId}`
            }),
            await request(address).post(`/transferencia`)
            .set('authorization', token)
            .send({
                valor: 1100,
                contato: `${contatoId}`
            }).then((response)=>{
                transferenciaId = response.body._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/transferencia`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.items).toBeTruthy();
            expect(response.body.items.length).toBeGreaterThan(0)
            expect(response.body).toHaveProperty('items')
            expect(response.body.items[0]._id).toBe(transferenciaId)
            expect(response.body.items[0].status).toBe(statusTransferencia.Finalizado)
            expect(response.body.items[1].status).toBe(statusTransferencia.Cancelado)
 
        }).catch(fail)
    })

    test('post - cadastro de transferencias do usuário sem os dados requiridos', async() => {
        let token = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).post(`/contato`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)
    })
    
    test('post - cadastro de transferencias do usuário sem o token', async() => {
        //teste
        return request(address).post(`/transferencia`)
        .send(contatoData[0])
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Token não encontrado')
        }).catch(fail)
    })

})

describe('Fluxo normal de dados contatos do usuário', () => {

    test('get - lista de transferencias do usuário', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc)=>{
                contatoId = doc._id
            }),
            await request(address).post(`/transferencia`)
            .set('authorization', token)
            .send({
                valor: 1100,
                contato: `${contatoId}`
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/transferencia`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.items).toBeTruthy();
            expect(response.body.items.length).toBeGreaterThan(0)
            expect(response.body).toHaveProperty('items')
        }).catch(fail)
    })

    test('post - cadastro de uma transferencia do usuário', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc)=>{
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).post(`/transferencia`)
        .set('authorization', token)
        .send({
            valor: 1100,
            contato: `${contatoId}`
        })
        .then(response=>{
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('valor')
            expect(response.body).toHaveProperty('contato')
            expect(response.body).toHaveProperty('usuario')
            expect(response.body).toHaveProperty('status')
            expect(response.body.valor).toBe(1100)
            expect(response.body.usuario.saldo).toBe(0)
            expect(response.body.usuario.saldoLimite).toBe(400)
            expect(response.body.status).toBe('Finalizado')
        }).catch(fail)
    })

})