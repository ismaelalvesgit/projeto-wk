//@Author ismael alves
import request  from 'supertest'
import Usuario from '../src/models/usuario'
const address = global.address

//antes de todo teste
afterEach( async()=>{
    await Usuario.deleteMany({})
})

describe('Fluxo normal de dados usuarios', () => {

    test('get - lista de todos os usuários', async() => {
        let token = ''
        //montando o cenario
        const cenario = [
            await request(address).get('/system/usuario').then(response => {
                token = response.body.token
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/usuario`)
        .set('authorization', token)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.saldo).toBe(1000)
            expect(response.body.saldoLimite).toBe(500)
            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('cpf')
            expect(response.body).toHaveProperty('telefone')
            expect(response.body).toHaveProperty('foto')
        }).catch(fail)
    })

})