# backend - @Author Ismael Alves <cearaismael1997@gmail.com>
Este projeto foi gerado com [Express.js](https://expressjs.com/pt-br/) versão 4.17.1.

# Development server
Rode `npm run dev` no cmd para rodar o servidor dev. Navege para `http://localhost:3000`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

# Start in Server
Rode `npm start` no cmd para rodar o servidor de prod Navege para `http://localhost:3000`

# Build Docker
Rode `npm run docker:build` para que seja gerada um nova imagem docker do projeto, o arquivo de configuração da imagem está  localizado em `Dockerfile`.

## Developer Debug
Debug pelo vs code use a tecla `F5` copie e cole no `launch.json` as configurações abaixo.
```json
{
    "type": "node",
    "request": "launch",
    "protocol": "inspector",
    "name": "ES6 Debugger",
    "program": "${workspaceFolder}/index.js",
    "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node"
}
```

# Testes
Este projeto foi projeto com base no desenvolvimento [TDD](https://www.vector.com/int/en/lp/us/test-driven-development/?gclid=Cj0KCQiA_rfvBRCPARIsANlV66Nlrg_ef3hoOGlt4ZVr_Uzm-ZRGHjMYMFNZBa_NpIVgQy2XF9IAJY4aAnN1EALw_wcB) 
foram utiladas as libs [jest](https://jestjs.io/docs/en/getting-started) versão 24.9.0 e 
[supertest](https://www.npmjs.com/package/supertest) versão 4.0.2, [husky](https://www.npmjs.com/package/husky) versão 3.1.0
para auto teste quando o projeto for subido para o repositorio do git.

# Development TDD
Para executar os testes automatizados rode `npm test` para iniciar o test criados no diretorio `test/`
Caso queria entrar no modo de desenvolvimento seguro rode `npm run secure-mode`

# Logs
O projeto foi configurado para gerar e armazena logs de acesso e de erros organizados por dia
os logs estão localizados em `logs/`, tambem sera enviado um email para o administrador com
o id da requisição e o erro gerado.

# DevOps
O projeto foi configurado para fazer [CICD](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007) integrado com
[Jenkinis](https://www.jenkins.io/) arquivo de configuração localizado em `Jenkinisfile`.

# Documentação
Foi criada uma documentação do projeto usando [apidoc](https://apidocjs.com/#getting-started)
os arquivos da documentação estão localizados em `doc/` pra gerar um novo aterfato de documentação
rode o comando `npm run doc` depois acesse a url `http://localhost:3000/documentacao`

# Metricas
Foi implementado no projeto metricas pra ser utlizado com a ferramenta [Prometheus](https://prometheus.io/) o endpoint esta localizado em `http://localhost:3000/metrics`

# Cloud
O projeto foi implantado em um servidor do ip `31.220.49.94` links do projeto backend: `http://31.220.49.94:3000`, mongoDB: `http://31.220.49.94:27017` 
ATENÇÃO esses link estarão disponiveis até duas semanas do dia de hoje `25/10/2020` após o duas semanas os link serão automaticamente desativados :)

# Importante
Antes de colocar o projeto para iniciar e necessário criar uma base dados no mongoDB com o nome de `contas`, usuário `root` e senha `wk` conforme está escrito em no arquivo `./config/environments.js`.

# Extra

## Dependencias do projeto
O projeto necessita que o SO onde o projeto esteja rodando contenha as ferramentas [python](https://www.python.org/)
, [mongoDB](https://www.mongodb.com/download-center/community), [nodejs](https://nodejs.org/en/).

## Healthcheck
Foi criado um serviço de analise de saúde do sistema analizando a conexão com o banco de dados, caso queira executalo
navege para `http://localhost:3000/system/healthcheck`

## Performace
No projeto foi criado politicas de [Throttling](https://www.progress.com/blogs/how-to-rate-limit-an-api-query-throttling-made-easy) então por padrão um endereço IP 
dentro de um periodo de 20s(vinte) segundos podera somente fazer 1000 requisições na aplicação

# Variaveis de ambiente
O projeto foi pre-configurado com algumas variaveis de ambiente que está localizado em `config/environments.js`.

- ENVIROMENT = '(STRING) - `DEV | TEST | PROD` Caso essa variavel esteja presente no ambiente, A API por padrão ficara limitada a 100(duzentos) requisições por um periodo de 15(quinze) minutos'
- SERVER_URL = '(STRING) Url da API exemplo `http://localhost:3000` ou `http://exemple.com/api` obs sem o barra no final'
- SERVER_PORT = '(NUMBER) Porta da API exemplo `3000` ou `8080` obs por padrao usará porta 3000'
- SERVER_THROTTLING = '(BOOL) por padrão desabilitado nos ambientes `DEV | TEST` e habilitado no ambiente de `PROD`, utilizado para implatantar politicas de throttling na api'
- DB_HOST = '(STRING) Url do banco de dados exemplo `31.220.49.94`'
- DB_PORT = '(NUMBER) Porta do banco de dados exemplo `27017` ou `27018` obs por padrao usará porta 27017'
- DB_USER = '(STRING) Usuário do do banco de dados exemplo `root` obs por padrao usará o usuário root'
- DB_PASS = '(STRING) Senha da base de dados'
- DB_DATABASE = '(STRING) Nome da base de dados'

![App UI](/backend/app.png)