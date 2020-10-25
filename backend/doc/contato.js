//@Author ismael alves

/**
 * @api {get} /contato Listage de Todos
 * @apiGroup Contato
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado 
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
*     {"authorization": "hashToken"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "_links": {
            "self": "/contato"
        },
        "items": [
            {
                "_links": {
                    "self": "/contato/5f942bfa70e7fa0a248cf75a",
                    "all": "/contato"
                },
                "_id": "5f942bfa70e7fa0a248cf75a",
                "nome": "ismael alves ximenes",
                "usuario": {
                    "saldo": 1000,
                    "saldoLimite": 500,
                    "foto": "http://localhost:3000/uploads/system/user.png",
                    "_id": "5f942ae8d438cd311cfa93ab",
                    "nome": "Raquel Barra",
                    "cpf": "84863016026",
                    "telefone": "991234160",
                    "dataRegistro": "2020-10-24T13:23:52.706Z",
                    "dataAtualizacao": "2020-10-24T13:23:52.706Z",
                    "__v": 0
                },
                "dataRegistro": "2020-10-24T13:28:26.152Z",
                "dataAtualizacao": "2020-10-24T13:28:26.152Z",
                "__v": 0
            }
        ]
    }
 */

 /**
 * @api {get} /contato/:id Get por ID
 * @apiGroup Contato
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
*     {"authorization": "hashToken"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "_links": {
            "self": "/contato/5f942bfa70e7fa0a248cf75a",
            "all": "/contato"
        },
        "_id": "5f942bfa70e7fa0a248cf75a",
        "nome": "ismael alves ximenes",
        "usuario": {
            "saldo": 1000,
            "saldoLimite": 500,
            "foto": "http://localhost:3000/uploads/system/user.png",
            "_id": "5f942ae8d438cd311cfa93ab",
            "nome": "Raquel Barra",
            "cpf": "84863016026",
            "telefone": "991234160",
            "dataRegistro": "2020-10-24T13:23:52.706Z",
            "dataAtualizacao": "2020-10-24T13:23:52.706Z",
            "__v": 0
        },
        "dataRegistro": "2020-10-24T13:28:26.152Z",
        "dataAtualizacao": "2020-10-24T13:28:26.152Z",
        "__v": 0
      }
 */

 /**
 * @api {delete} /contato/:id Deletar Contato
 * @apiGroup Contato
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"authorization": "hashToken"}
 * @apiParam {String} id ID do Contato (requirido)
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 204 OK
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
 */

 /**
 * @api {put} /contato/:id Atualizar Contato
 * @apiGroup Contato
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"authorization": "hashToken"}
 * @apiParam {String} id ID da Contato (requirido)
 * @apiParam {String} nome Nome do Contato 
 * @apiParamExample {json} Input
*   {
        "nome": "Contato 01"
    } 
 * @apiSuccess {String} _id ID do Contato
 * @apiSuccess {String} nome Nome da Contato 
 * @apiSuccess {String} usuario Usuario dono do Contato 
 * @apiSuccess {String} dataRegistro Data de Registro do Contato 
 * @apiSuccess {String} dataAtualizacao Data de Atualização do Contato
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
        "_id": "5f942bfa70e7fa0a248cf75a",
        "nome": "ismael alves ximenes",
        "usuario": "5f942ae8d438cd311cfa93ab",
        "dataRegistro": "2020-10-24T13:28:26.152Z",
        "dataAtualizacao": "2020-10-24T13:31:55.459Z",
        "__v": 0
      }
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
*/

 /**
 * @api {post} /contato Cadastro de Contato
 * @apiGroup Contato
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"authorization": "hashToken"}
 * @apiParam {String} nome Nome do Contato (requirido)
 * @apiParamExample {json} Input
 *    {
 *      "nome": "Contato 01",
 *    }
 * @apiSuccess {String} _id ID do Contato
 * @apiSuccess {String} nome Nome do Contato 
 * @apiSuccess {String} usuario Usuario dono do Contato 
 * @apiSuccess {String} dataRegistro Data de Registro do Contato 
 * @apiSuccess {String} dataAtualizacao Data de Atualização do Contato
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
        "_id": "5f942d3370e7fa0a248cf75b",
        "nome": "ismael alves ximenes",
        "usuario": "5f942ae8d438cd311cfa93ab",
        "dataRegistro": "2020-10-24T13:33:39.477Z",
        "dataAtualizacao": "2020-10-24T13:33:39.477Z",
        "__v": 0
      }
 * @apiErrorExample {json} Campos Incorretos ou inexistentes
 *    HTTP/1.1 400 Bad Request
 *    [
        {
            "nome": "nome",
            "mensagem": "nome e requirido"
        }
      ]
 */