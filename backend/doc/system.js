//@Author ismael alves

/**
 * @api {get} /system/healthcheck Analise da saúde da API
 * @apiGroup System
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
        {
            "process": 6408,
            "uptime": 66.506310001,
            "dataBase": {
                "status": "connected"
            },
            "speed": {
                "download": 87.165,
                "upload": 42.911,
                "originalDownload": 9599694,
                "originalUpload": 4709272
            },
            "client": {
                "ip": "131.161.111.118",
                "lat": -3.7822,
                "lon": -38.8025,
                "isp": "Tecnet Provedor De Acesso As Redes De Com. Ltda",
                "isprating": 3.7,
                "rating": 0,
                "ispdlavg": 0,
                "ispulavg": 0,
                "country": "BR"
            }
        }
 * @apiErrorExample {json} Erro
 *    HTTP/1.1 503 Service Unavailable
 *    "pilha de possiveis problemas"
 */

 /**
 * @api {get} /system/usuario Geramento do usuário do sistema
 * @apiDescription 
 * Atenção Todos os dados do banco serão zerado todas vez que for utilizado essa requisição
 * @apiGroup System
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
        {
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
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxvciI6IjVmOTQyYWU4ZDQzOGNkMzExY2ZhOTNhYiIsImlhdCI6MTYwMzU0NTgzMiwiZXhwIjoxNjAzNTQ5NDMyfQ.Sko387dWpkCjAhzftgYpZ79boNLOvHyW2x4PBOFvsYc"
        }
 */

 /**
 * @api {get} /system/usuario/refresh_token refresh do token do usuário do sistema
 * @apiGroup System
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeader {String} authorization token de autorização
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 *     {"authorization": "hashToken"}
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxvciI6IjVmOTQyZjBlMjM2MWZjMGQyOGRkNTMxNyIsImlhdCI6MTYwMzU0ODQyNCwiZXhwIjoxNjAzNTUyMDI0fQ.lEj1236tlx6sFJQslQlQPL_T2ayoge24KNYhb71NhEc"
        }
 */