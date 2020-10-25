//@Author ismael alves
import request  from 'supertest'

const address = global.address
describe('Teste da rota inicial', () => {
    test('get - inicial', async () => {
        return request(address).get('/').then(response=>{
            expect(response.status).toBe(200)
        }).catch(fail)
    })
})