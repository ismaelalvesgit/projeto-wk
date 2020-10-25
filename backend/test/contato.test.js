//@Author ismael alves
import request  from 'supertest'
import Contato from '../src/models/contatos'
import Usuario from '../src/models/usuario'
import contatoData from './fixtures/contatoData'
const address = global.address

//antes de todo teste
afterEach( async()=>{
    await Usuario.deleteMany({})
    await Contato.deleteMany({})
})


describe('Fluxo normal de tratamento de erros dos contatos do usuário', () => {

    test('get - lista de contatos do usuário sem o token', async() => {
        let usuarioId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save()
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/contato`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Token não encontrado')
        }).catch(fail)
    })

    test('get - pegar contatos do usuário por id do contato sem o token', async() => {
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc) => {
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/contato/${contatoId}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Token não encontrado')
        }).catch(fail)
    })

    test('delete - deletar contatos por id do usuário sem o token', async() => {
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc) => {
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).delete(`/contato/${contatoId}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Token não encontrado')
        }).catch(fail)
    })

    test('put - atualizar contatos por id do usuário sem o token', async() => {
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc) => {
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).put(`/contato/${contatoId}`)
        .send(contatoData[0])
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Token não encontrado')
        }).catch(fail)
    })

    test('post - cadastro de contatos do usuário sem os dados requiridos', async() => {
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
    
    test('post - cadastro de contatos do usuário sem o token', async() => {
        //teste
        return request(address).post(`/contato`)
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

    test('get - lista de contatos do usuário', async() => {
        let token = ''
        let usuarioId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save()
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/contato`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.items).toBeTruthy();
            expect(response.body.items.length).toBeGreaterThan(0)
            expect(response.body).toHaveProperty('_links')
            expect(response.body).toHaveProperty('items')
        }).catch(fail)
    })

    test('get - pegar contatos do usuário por id do contato', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc) => {
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/contato/${contatoId}`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toBeTruthy()
            expect(response.body).toHaveProperty('_links')
            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('usuario')
        }).catch(fail)
    })

    test('delete - deletar contatos por id do usuário', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc) => {
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).delete(`/contato/${contatoId}`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(204)
        }).catch(fail)
    })

    test('put - atualizar contatos por id do usuário', async() => {
        let token = ''
        let usuarioId = ''
        let contatoId = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
                usuarioId = response.body.usuario._id
            }),
            await new Contato({...contatoData[1], usuario: usuarioId}).save().then((doc) => {
                contatoId = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).put(`/contato/${contatoId}`)
        .set('authorization', token)
        .send(contatoData[0])
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('usuario')
        }).catch(fail)
    })

    test('post - cadastro de contatos do usuário', async() => {
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
        .send(contatoData[0])
        .then(response=>{
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('usuario')
        }).catch(fail)
    })

})