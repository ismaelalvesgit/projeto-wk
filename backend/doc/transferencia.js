//@Author ismael alves

/**
 * @api {get} /transferencia Listage de Todas
 * @apiGroup Transferencia
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
*     {"authorization": "hashToken"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "items": [
          {
            "status": "Finalizado",
            "_id": "5f942e05fba25847bcca77ae",
            "contato": "5f942d3370e7fa0a248cf75b",
            "valor": 1500,
            "usuario": "5f942ae8d438cd311cfa93ab",
            "dataRegistro": "2020-10-24T13:37:09.884Z",
            "dataAtualizacao": "2020-10-24T13:37:09.884Z",
            "__v": 0
          }
        ]
      }
 */

 /**
 * @api {post} /transferencia Cadastro de transferencias do usuário
 * @apiDescription 
 * Atenção se for transferido em menos de 2 minutos, o mesmo valor, para o mesmo usuário, cancelar a
transação anterior e manter a última. 
 * @apiGroup Transferencia
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"Content-Type": "hashToken"}
 * @apiParam {String} contato ID do Contato (requirido)
 * @apiParam {Number} valor Valor da transferencia (requirido)
 * @apiParamExample {json} Input
*   {
      "contato": "5f943060fcad593434ee8b6c",
      "valor": 1500
    }
 * @apiSuccess {String} _id ID da Transferencia
 * @apiSuccess {String} contato ID do Contato
 * @apiSuccess {Number} valor Valor da Transferencia
 * @apiSuccess {Object} usuario Usuario atualizado apos transferencia
 * @apiSuccess {String} status Status da Transferencia
 * @apiSuccess {String} dataRegistro Data de Registro do Transferencia 
 * @apiSuccess {String} dataAtualizacao Data de Atualização do Transferencia
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
 *     {
        "status": "Finalizado",
        "_id": "5f943118dc91e6330832cd47",
        "contato": "5f943060fcad593434ee8b6c",
        "valor": 1500,
        "usuario": {
          "saldo": 0,
          "saldoLimite": 0,
          "foto": "http://localhost:3000/uploads/system/user.png",
          "_id": "5f942f0e2361fc0d28dd5317",
          "nome": "Raquel Barra",
          "cpf": "84863016026",
          "telefone": "991234160",
          "dataRegistro": "2020-10-24T13:41:34.971Z",
          "dataAtualizacao": "2020-10-24T13:50:16.382Z",
          "__v": 0
        },
        "dataRegistro": "2020-10-24T13:50:16.380Z",
        "dataAtualizacao": "2020-10-24T13:50:16.380Z",
        "__v": 0
      }
 * @apiErrorExample {json} Campos Incorretos ou inexistentes
 *    HTTP/1.1 400 Bad Request
 *    [
        {
          "nome": "contato",
          "mensagem": "contato e requirido"
        },
        {
          "nome": "valor",
          "mensagem": "valor e requirido"
        },
        {
          "nome": "valor",
          "mensagem": "Saldo insuficiente na conta :("
        },
        {
          "nome": "status",
          "mensagem": "status deve ser vázio"
        }
      ]
 */