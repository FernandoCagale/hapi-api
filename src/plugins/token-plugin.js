var jwt = require('jsonwebtoken');
var config = require('config');
var Boom = require('boom');

exports.register = function(server, options, next){

	server.auth.scheme('token', function(){
		return {
			authenticate: function(request, reply){
        		var req = request.raw.req;
        		var headers = req.headers;

        		if(!headers.authorization)
          			return reply(Boom.unauthorized('login required'));

        		var token = headers.authorization.replace('Bearer ', '');
        		
        		jwt.verify(token, config.get('token.secret'), function(err, user){
          			if(err)
            			return reply(Boom.unauthorized('token invalid'));

          			reply.continue({
            			credentials: user
          			});
        		});
        	}
		}
	});

  server.auth.strategy('token', 'token');

  next();

};

exports.register.attributes = {
  name: 'token',
  version: '0.0.1'
};