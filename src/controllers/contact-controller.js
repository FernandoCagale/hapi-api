"use strict";

var Boom = require('boom');
var daos = require('../daos');

function ContactControLler(){};

ContactControLler.prototype = (function(){

	var dao = new daos.ContactDao();

	return {

	  	find: function (request, reply) {
	  		var page = request.query.page | 0;
	  		var search = request.query.search;

	  		dao.find(page, search).then(function (contact){
	  			reply(contact);
	  		});

	  	},
	 	findByID: function (request, reply) {
		    
		    dao.findByID(request.params).then(function (contacts){
		    	reply(contacts);
		    });

	  	},		
	    insert: function(request, reply) {

	    	dao.insert(request.payload).then(function (contact){
				reply(contact);
	    	});

	 	},

	 	update: function (request, reply) {

	 		dao.update(request.payload, request.params).then(function (contact){
	 			reply(contact);	
	 		})

	 	},

		delete: function(request, reply) {

			dao.delete(request.params).then(function (value){
				reply(value);	
			})
			
		}	 	

	}

})();

var contactControLler = new ContactControLler();

module.exports = contactControLler;

