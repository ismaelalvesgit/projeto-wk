//@Author ismael alves
import Usuario from '../models/usuario'
import controllerBase from '../utils/controllerBase'
import authorize from '../middlewares/handlerAuthorizeMiddleware'

module.exports = function(app){

    // Metodo que pega os dados do usuario autenticado
    app.get('/usuario',
        authorize(),
        controllerBase.findOne({
            model: Usuario,
            params: [
                {
                    user: true,
                    path: '_id'
                }
            ],
            select: [
                '-senha'
            ],
            skipLinks: true
        })
    )

}