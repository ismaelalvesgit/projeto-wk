/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const mongoClient = require('mongodb').MongoClient;
const dbConfig = require('../../cypress.json').db;
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const pool  = await mongoClient.connect(`mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {useNewUrlParser: true, useUnifiedTopology: true})
  on('task', {
    "query":{
      "deleteAll": (modelName) =>{
        return pool.db(dbConfig.database).collection(modelName).deleteMany({})
      },
      "save": ({modelName, values}) =>{
        return pool.db(dbConfig.database).collection(modelName).insertOne(values)
      },
      // "update": (modelName, _id, values)=>{
      //   return mongoose.model(modelName).findByIdAndUpdate(_id, values)
      // }
    }
  });
}

