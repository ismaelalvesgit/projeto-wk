//@Author ismael alves
import controllerBase from '../utils/controllerBase'
import authorize from '../middlewares/handlerAuthorizeMiddleware'
import Contato from '../models/contatos'
import validateId from '../middlewares/handlerValidateIdMiddleware'

module.exports = function(app){
    
    // metodo que lista os contatos do usuario autenticado
    app.get('/contato',
        authorize(),
        controllerBase.findAll({
            model: Contato,
            populate: [
				{
					path: 'usuario',
					select: '-senha'
				}
			],
            sort: {dataRegistro: -1}
        })
    )

    // metodo que pega os contatos por id do usuario autenticado
    app.get('/contato/:id',
        authorize(),
        controllerBase.findOne({
            model: Contato,
            populate: [
				{
					path: 'usuario',
					select: '-senha'
				}
            ],
            params: [
                {
                    user: true,
                    path: 'usuario'
                },
                {
                    params: 'id',
                    path: '_id'
                }
            ] 
        })
    )

    // metodo que deleta os contatos do usuario autenticado
	app.delete('/contato/:id',
        validateId,
        authorize(),
        controllerBase.delete({
            model: Contato,
            params: [
                {
                    user: true,
                    path: 'usuario'
                },
                {
                    params: 'id',
                    path: '_id'
                }
            ]  
        })
    )

    // metodo que atualiza os contatos do usuario autenticado
	app.put('/contato/:id',
        validateId,
        authorize(),
        controllerBase.update({
            model: Contato,
            params: [
                {
                    user: true,
                    path: 'usuario'
                },
                {
                    params: 'id',
                    path: '_id'
                }
            ]  
        })
    )

    // metodo que cadastra os contatos do usuario autenticado
    app.post('/contato', 
        authorize(),
        controllerBase.save({
            model: Contato,
            addFields: [
                {
                    user: true,
                    path: 'usuario'
                }
            ]
        })
    )
}