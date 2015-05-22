"use strict";

var Boom = require('boom');
var daos = require('../daos');

function UserController(){};

UserController.prototype = (function(){

	var dao = new daos.UserDao();

	return {

	  	find: function (request, reply) {
	  		var page = request.query.page | 0;
	  		var search = request.query.search;

	  		dao.find(page, search).then(function (user){
	  			reply(user);
	  		});

	  	},
	 	findByID: function (request, reply) {

		    dao.findByID(request.params).then(function (users){
		    	reply(users);
		    });

	  	},
	    insert: function(request, reply) {

	    	dao.insert(request.payload).then(function (user){
					reply(user);
	    	});

	 	},

	 	update: function (request, reply) {

	 		dao.update(request.payload, request.params).then(function (user){
	 			reply(user);
	 		})

	 	},

		delete: function(request, reply) {

			dao.delete(request.params).then(function (value){
				reply(value);
			})

		}

	}

})();

var UserController = new UserController();

module.exports = UserController;
