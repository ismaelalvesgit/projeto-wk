//@Author ismael alves
// https://myaccount.google.com/lesssecureapps?pli=1

//db config
let userDB
let passDB
let hostDB
let portDB
let databaseDB
let dialectDB

//server config
let port
let url
let throttling

let enviroment = process.env.ENVIROMENT || 'TEST'
switch (enviroment) {
  case 'DEV':
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || false
    userDB = process.env.DB_USER || 'root'
    passDB = process.env.DB_PASS || 'wk'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'contas'
    break; 
  case 'TEST':
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || false
    userDB = process.env.DB_USER || 'root'
    passDB = process.env.DB_PASS || 'wk'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'contas'
    break;
  case 'PROD':
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || true
    userDB = process.env.DB_USER || 'root'
    passDB = process.env.DB_PASS || 'wk'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'contas'
    break;
  default:
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || false
    userDB = process.env.DB_USER || 'root'
    passDB = process.env.DB_PASS || 'wk'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'contas'
}

export default {
  enviroment: enviroment,
  server: { 
    port: port,
    url: url,
    throttling: throttling
  },
  files:{
    default: url+'/uploads/system/default.png',
    user: url+'/uploads/system/user.png',
    uploadsPath: './src/public/uploads/',
    uploadsUrl: url+'/uploads/'
  },
  db: {
    url: `mongodb://${userDB}:${passDB}@${hostDB}:${portDB}/${databaseDB}`,
    user: userDB,
    pass: passDB,
    host: hostDB,
    port: portDB,
    database: databaseDB,
    dialect: dialectDB
  },
  security: {
    saltRounds: process.env.SALT_ROUNDS || 10,
    secret: process.env.API_SECRET || 'wk2020',
  },
  email:{
    enviroment: process.env.EMAIL_ENV || 'SMTP', //  SMTP || OAuth2
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT ||  465,
    secure: process.env.EMAIL_SECURE || true,
    notificator: process.env.EMAIL_USER || 'seu Email',
    pass: process.env.EMAIL_PASSWORD || 'Sua senha',
    OAuth2:{
      clientId:  process.env.EMAIL_OAUTH2_CLIENTID || '',
      clientSecret: process.env.EMAIL_OAUTH2_CLIENTSECRET || '',
      refreshToken: process.env.EMAIL_OAUTH2_REFRESHTOKEN || '',
      redirectUri: process.env.EMAIL_OAUTH2_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
    },
  },
}