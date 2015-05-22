var Sequelize = require('sequelize');
var fs = require('fs');

var models = __dirname.replace('lib', 'models');

var files = fs.readdirSync(models);
var constants = require('../config/constants.js');
var db = require('../lib/db');

if (process.env.NODE_ENV == 'development') {
    console.log("======");
    console.log("Banco :"+ constants.database['database'] +" Local: "+ constants.database['host'] +"  Porta: "+ constants.database['port']);
    console.log("======");
}

var db = new Sequelize(
		constants.database['database'], 
		constants.database['user'], 
		constants.database['password'], {
    		dialect: "postgres",
    		port: constants.database['port'],
    		host: constants.database['host'],
    		omitNull: true,
    		logging: false,
    		define: { timestamp: true, underscored: true, charset: "utf8" },
    		pool: { maxConnections: 10, maxIdleTime: 30 }
  		});


files.forEach(function(file) {
    if (file !== 'index.js') {
        db.import(models + '/./' + file);
        db.sync().done(function() {
        });
    }
});

module.exports = db;