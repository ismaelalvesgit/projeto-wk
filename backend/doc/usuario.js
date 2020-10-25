//@Author ismael alves

/**
 * @api {get} /usuario pega dados do usuário
 * @apiGroup Usuario
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
*     {"authorization": "hashToken"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "saldo": 1000,
        "saldoLimite": 500,
        "foto": "http://localhost:3000/uploads/system/user.png",
        "_id": "5f942f0e2361fc0d28dd5317",
        "nome": "Raquel Barra",
        "cpf": "84863016026",
        "telefone": "991234160",
        "dataRegistro": "2020-10-24T13:41:34.971Z",
        "dataAtualizacao": "2020-10-24T13:50:16.382Z",
        "__v": 0
      }
 */