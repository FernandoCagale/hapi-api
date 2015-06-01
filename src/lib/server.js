var Hapi = require('hapi');

var constants = require('../config/constants.js');
var routes = require('../routes');
var plugins = require('../plugins');

var server = new Hapi.Server();

server.connection({
  	host: constants.application['host'],
  	port: constants.application['port'],
    routes: {
        cors: true
    }
});

server.on('request-error', function (request, err) {
    console.log('Error response (500) sent for request: ' + request.route.path + ' because: ' + err.message);
});

server.register(plugins.concat(routes.concat(require('hapi-accept-language'))), function(err){
  if(err)
    throw err;
});




module.exports = server;
