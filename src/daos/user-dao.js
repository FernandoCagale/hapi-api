require('js.augment');

var jwt = require('jsonwebtoken');
var Boom = require('boom');

var config = require('config');
var factory = require('../factory');
var db = require('../lib/db');

var UserControllerFactory = factory.FactoryDao.augment({

  	constructor: function() {
    	factory.FactoryDao.call(this, db.models.User);
	},

	auth: function(params){
	    
	    var auth = params;

	    var sequelize = db.models.User;
	    
	    return {
	    	then: function(callback) {
			    sequelize.find({
			    	where: {
			        	email: auth.email
			      	}
			    }).then(function(user) {

			      	if (!user)
			        	callback(Boom.unauthorized('invalid user'));

			      	if (!user.checksPassword(auth.password))
			        	callback(Boom.unauthorized('invalid password'));

			      	var token = jwt.sign(
			      		{
			        		user: user.get('id')
			      		}, 
			      		config.get('token.secret'), config.get('token.options')
			      	);

			      	callback({token: token});
			    });
			}
		}
	}
});

module.exports = UserControllerFactory;