"use strict";

var Boom = require('boom');
var daos = require('../daos');

function OperatorControLler(){};

OperatorControLler.prototype = (function(){

	var dao = new daos.OperatorDao();

	return {

	  	find: function (request, reply) {
	  		var page = request.query.page | 0;
	  		var search = request.query.search;

	  		dao.find(page, search).then(function (operator){
	  			reply(operator);
	  		});

	  	},
	 	findByID: function (request, reply) {
		    
		    dao.findByID(request.params).then(function (operators){
		    	reply(operators);
		    });

	  	},		
	    insert: function(request, reply) {

	    	dao.insert(request.payload).then(function (operator){
				reply(operator);
	    	});

	 	},

	 	update: function (request, reply) {

	 		dao.update(request.payload, request.params).then(function (operator){
	 			reply(operator);	
	 		})

	 	},

		delete: function(request, reply) {

			dao.delete(request.params).then(function (value){
				reply(value);	
			})
			
		}	 	

	}

})();

var operatorControLler = new OperatorControLler();

module.exports = operatorControLler;

