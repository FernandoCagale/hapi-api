"use strict";

var Boom = require('boom');
var daos = require('../daos');

function ContactControLler(){};

ContactControLler.prototype = (function(){

	var dao = new daos.UserDao();

	return {

	  	auth: function (request, reply) {

	    	dao.auth(request.payload).then(function (auth){
				reply(auth);
	    	});

	  	},

	    getAuth: function(request, reply) {

	    	reply(request.auth.credentials);

		}

	}

})();

var contactControLler = new ContactControLler();

module.exports = contactControLler;
