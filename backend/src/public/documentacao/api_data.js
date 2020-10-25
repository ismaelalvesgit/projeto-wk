define({ "api": [
  {
    "type": "delete",
    "url": "/contato/:id",
    "title": "Deletar Contato",
    "group": "Contato",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do Contato (requirido)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Documento não encontrado",
          "content": "HTTP/1.1 404 Not Found\n\"documento não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/contato.js",
    "groupTitle": "Contato",
    "name": "DeleteContatoId"
  },
  {
    "type": "get",
    "url": "/contato",
    "title": "Listage de Todos",
    "group": "Contato",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"_links\": {\n         \"self\": \"/contato\"\n     },\n     \"items\": [\n         {\n             \"_links\": {\n                 \"self\": \"/contato/5f942bfa70e7fa0a248cf75a\",\n                 \"all\": \"/contato\"\n             },\n             \"_id\": \"5f942bfa70e7fa0a248cf75a\",\n             \"nome\": \"ismael alves ximenes\",\n             \"usuario\": {\n                 \"saldo\": 1000,\n                 \"saldoLimite\": 500,\n                 \"foto\": \"http://localhost:3000/uploads/system/user.png\",\n                 \"_id\": \"5f942ae8d438cd311cfa93ab\",\n                 \"nome\": \"Raquel Barra\",\n                 \"cpf\": \"84863016026\",\n                 \"telefone\": \"991234160\",\n                 \"dataRegistro\": \"2020-10-24T13:23:52.706Z\",\n                 \"dataAtualizacao\": \"2020-10-24T13:23:52.706Z\",\n                 \"__v\": 0\n             },\n             \"dataRegistro\": \"2020-10-24T13:28:26.152Z\",\n             \"dataAtualizacao\": \"2020-10-24T13:28:26.152Z\",\n             \"__v\": 0\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/contato.js",
    "groupTitle": "Contato",
    "name": "GetContato"
  },
  {
    "type": "get",
    "url": "/contato/:id",
    "title": "Get por ID",
    "group": "Contato",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"_links\": {\n         \"self\": \"/contato/5f942bfa70e7fa0a248cf75a\",\n         \"all\": \"/contato\"\n     },\n     \"_id\": \"5f942bfa70e7fa0a248cf75a\",\n     \"nome\": \"ismael alves ximenes\",\n     \"usuario\": {\n         \"saldo\": 1000,\n         \"saldoLimite\": 500,\n         \"foto\": \"http://localhost:3000/uploads/system/user.png\",\n         \"_id\": \"5f942ae8d438cd311cfa93ab\",\n         \"nome\": \"Raquel Barra\",\n         \"cpf\": \"84863016026\",\n         \"telefone\": \"991234160\",\n         \"dataRegistro\": \"2020-10-24T13:23:52.706Z\",\n         \"dataAtualizacao\": \"2020-10-24T13:23:52.706Z\",\n         \"__v\": 0\n     },\n     \"dataRegistro\": \"2020-10-24T13:28:26.152Z\",\n     \"dataAtualizacao\": \"2020-10-24T13:28:26.152Z\",\n     \"__v\": 0\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/contato.js",
    "groupTitle": "Contato",
    "name": "GetContatoId"
  },
  {
    "type": "post",
    "url": "/contato",
    "title": "Cadastro de Contato",
    "group": "Contato",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do Contato (requirido)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"nome\": \"Contato 01\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "usuario",
            "description": "<p>Usuario dono do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataRegistro",
            "description": "<p>Data de Registro do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataAtualizacao",
            "description": "<p>Data de Atualização do Contato</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5f942d3370e7fa0a248cf75b\",\n    \"nome\": \"ismael alves ximenes\",\n    \"usuario\": \"5f942ae8d438cd311cfa93ab\",\n    \"dataRegistro\": \"2020-10-24T13:33:39.477Z\",\n    \"dataAtualizacao\": \"2020-10-24T13:33:39.477Z\",\n    \"__v\": 0\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Campos Incorretos ou inexistentes",
          "content": "HTTP/1.1 400 Bad Request\n[\n     {\n         \"nome\": \"nome\",\n         \"mensagem\": \"nome e requirido\"\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/contato.js",
    "groupTitle": "Contato",
    "name": "PostContato"
  },
  {
    "type": "put",
    "url": "/contato/:id",
    "title": "Atualizar Contato",
    "group": "Contato",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID da Contato (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do Contato</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n      \"nome\": \"Contato 01\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "usuario",
            "description": "<p>Usuario dono do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataRegistro",
            "description": "<p>Data de Registro do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataAtualizacao",
            "description": "<p>Data de Atualização do Contato</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5f942bfa70e7fa0a248cf75a\",\n    \"nome\": \"ismael alves ximenes\",\n    \"usuario\": \"5f942ae8d438cd311cfa93ab\",\n    \"dataRegistro\": \"2020-10-24T13:28:26.152Z\",\n    \"dataAtualizacao\": \"2020-10-24T13:31:55.459Z\",\n    \"__v\": 0\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Documento não encontrado",
          "content": "HTTP/1.1 404 Not Found\n\"documento não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/contato.js",
    "groupTitle": "Contato",
    "name": "PutContatoId"
  },
  {
    "type": "get",
    "url": "/system/healthcheck",
    "title": "Analise da saúde da API",
    "group": "System",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n       \"process\": 6408,\n       \"uptime\": 66.506310001,\n       \"dataBase\": {\n           \"status\": \"connected\"\n       },\n       \"speed\": {\n           \"download\": 87.165,\n           \"upload\": 42.911,\n           \"originalDownload\": 9599694,\n           \"originalUpload\": 4709272\n       },\n       \"client\": {\n           \"ip\": \"131.161.111.118\",\n           \"lat\": -3.7822,\n           \"lon\": -38.8025,\n           \"isp\": \"Tecnet Provedor De Acesso As Redes De Com. Ltda\",\n           \"isprating\": 3.7,\n           \"rating\": 0,\n           \"ispdlavg\": 0,\n           \"ispulavg\": 0,\n           \"country\": \"BR\"\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro",
          "content": "HTTP/1.1 503 Service Unavailable\n\"pilha de possiveis problemas\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/system.js",
    "groupTitle": "System",
    "name": "GetSystemHealthcheck"
  },
  {
    "type": "get",
    "url": "/system/usuario",
    "title": "Geramento do usuário do sistema",
    "description": "<p>Atenção Todos os dados do banco serão zerado todas vez que for utilizado essa requisição</p>",
    "group": "System",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n       \"usuario\": {\n           \"saldo\": 1000,\n           \"saldoLimite\": 500,\n           \"foto\": \"http://localhost:3000/uploads/system/user.png\",\n           \"_id\": \"5f942ae8d438cd311cfa93ab\",\n           \"nome\": \"Raquel Barra\",\n           \"cpf\": \"84863016026\",\n           \"telefone\": \"991234160\",\n           \"dataRegistro\": \"2020-10-24T13:23:52.706Z\",\n           \"dataAtualizacao\": \"2020-10-24T13:23:52.706Z\",\n           \"__v\": 0\n       },\n       \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxvciI6IjVmOTQyYWU4ZDQzOGNkMzExY2ZhOTNhYiIsImlhdCI6MTYwMzU0NTgzMiwiZXhwIjoxNjAzNTQ5NDMyfQ.Sko387dWpkCjAhzftgYpZ79boNLOvHyW2x4PBOFvsYc\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/system.js",
    "groupTitle": "System",
    "name": "GetSystemUsuario"
  },
  {
    "type": "get",
    "url": "/system/usuario/refresh_token",
    "title": "refresh do token do usuário do sistema",
    "group": "System",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n       \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxvciI6IjVmOTQyZjBlMjM2MWZjMGQyOGRkNTMxNyIsImlhdCI6MTYwMzU0ODQyNCwiZXhwIjoxNjAzNTUyMDI0fQ.lEj1236tlx6sFJQslQlQPL_T2ayoge24KNYhb71NhEc\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/system.js",
    "groupTitle": "System",
    "name": "GetSystemUsuarioRefresh_token"
  },
  {
    "type": "get",
    "url": "/transferencia",
    "title": "Listage de Todas",
    "group": "Transferencia",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"items\": [\n       {\n         \"status\": \"Finalizado\",\n         \"_id\": \"5f942e05fba25847bcca77ae\",\n         \"contato\": \"5f942d3370e7fa0a248cf75b\",\n         \"valor\": 1500,\n         \"usuario\": \"5f942ae8d438cd311cfa93ab\",\n         \"dataRegistro\": \"2020-10-24T13:37:09.884Z\",\n         \"dataAtualizacao\": \"2020-10-24T13:37:09.884Z\",\n         \"__v\": 0\n       }\n     ]\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/transferencia.js",
    "groupTitle": "Transferencia",
    "name": "GetTransferencia"
  },
  {
    "type": "post",
    "url": "/transferencia",
    "title": "Cadastro de transferencias do usuário",
    "description": "<p>Atenção se for transferido em menos de 2 minutos, o mesmo valor, para o mesmo usuário, cancelar a transação anterior e manter a última.</p>",
    "group": "Transferencia",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"Content-Type\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contato",
            "description": "<p>ID do Contato (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "valor",
            "description": "<p>Valor da transferencia (requirido)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n    \"contato\": \"5f943060fcad593434ee8b6c\",\n    \"valor\": 1500\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID da Transferencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contato",
            "description": "<p>ID do Contato</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "valor",
            "description": "<p>Valor da Transferencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "usuario",
            "description": "<p>Usuario atualizado apos transferencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status da Transferencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataRegistro",
            "description": "<p>Data de Registro do Transferencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataAtualizacao",
            "description": "<p>Data de Atualização do Transferencia</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n {\n     \"status\": \"Finalizado\",\n     \"_id\": \"5f943118dc91e6330832cd47\",\n     \"contato\": \"5f943060fcad593434ee8b6c\",\n     \"valor\": 1500,\n     \"usuario\": {\n       \"saldo\": 0,\n       \"saldoLimite\": 0,\n       \"foto\": \"http://localhost:3000/uploads/system/user.png\",\n       \"_id\": \"5f942f0e2361fc0d28dd5317\",\n       \"nome\": \"Raquel Barra\",\n       \"cpf\": \"84863016026\",\n       \"telefone\": \"991234160\",\n       \"dataRegistro\": \"2020-10-24T13:41:34.971Z\",\n       \"dataAtualizacao\": \"2020-10-24T13:50:16.382Z\",\n       \"__v\": 0\n     },\n     \"dataRegistro\": \"2020-10-24T13:50:16.380Z\",\n     \"dataAtualizacao\": \"2020-10-24T13:50:16.380Z\",\n     \"__v\": 0\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Campos Incorretos ou inexistentes",
          "content": "HTTP/1.1 400 Bad Request\n[\n     {\n       \"nome\": \"contato\",\n       \"mensagem\": \"contato e requirido\"\n     },\n     {\n       \"nome\": \"valor\",\n       \"mensagem\": \"valor e requirido\"\n     },\n     {\n       \"nome\": \"valor\",\n       \"mensagem\": \"Saldo insuficiente na conta :(\"\n     },\n     {\n       \"nome\": \"status\",\n       \"mensagem\": \"status deve ser vázio\"\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/transferencia.js",
    "groupTitle": "Transferencia",
    "name": "PostTransferencia"
  },
  {
    "type": "get",
    "url": "/usuario",
    "title": "pega dados do usuário",
    "group": "Usuario",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>token de autorização</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}\n{\"authorization\": \"hashToken\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"saldo\": 1000,\n     \"saldoLimite\": 500,\n     \"foto\": \"http://localhost:3000/uploads/system/user.png\",\n     \"_id\": \"5f942f0e2361fc0d28dd5317\",\n     \"nome\": \"Raquel Barra\",\n     \"cpf\": \"84863016026\",\n     \"telefone\": \"991234160\",\n     \"dataRegistro\": \"2020-10-24T13:41:34.971Z\",\n     \"dataAtualizacao\": \"2020-10-24T13:50:16.382Z\",\n     \"__v\": 0\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/usuario.js",
    "groupTitle": "Usuario",
    "name": "GetUsuario"
  }
] });
