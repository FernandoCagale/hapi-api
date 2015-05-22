var expect = require('chai').expect;
var server = require('../src/lib/server');
var db = require('../src/lib/db');

var token = null;
var contactId = null;
var operator = null;

describe('API test contacts', function() {

	before(function(done) {

		var User = db.models.User;

		User.create({
      		name: 'Name',
      		lastName: 'Last Name',
      		email: 'test@test.com',
      		password: 'test'
    	}).then(function() {
	        
	        var opcoes = {
	        	method: 'POST',
	        	url: '/api/v1/auth',
	        	headers: {
	          		'Content-Type': 'application/json'
	        	},
	        	payload: {
	          		email: 'test@test.com',
	          		password: 'test'
	        	}
	        };

		    server.inject(opcoes, function(response) {
	    	    token = response.result.token;

			    var opcoesOperator = {
			    	method: 'POST',
			      	url: '/api/v1/operators',
			      	headers: {
			        	'Content-Type': 'application/json',
			        	Authorization: 'Bearer ' + token
			      	},
			      	payload: {
			        	description: 'Tim',
			        	value: '1.99'
			      	}
			    };
		   		server.inject(opcoesOperator, function(response) {

		      		operator = response.result;
		      		done();
		    	});	    
	      	});
	    });
    });

	after(function(done) {

	    var User = db.models.User;
	    var Operator = db.models.Operator;

		User.destroy({where: { email: ['test@test.com'] }}).then(function(){
			Operator.destroy({where: {id: operator.id}}).then(function(){
				done();	
			})
		});
	});

  	describe('POST /api/v1/contacts', function() {

	    it('Save contact', function(done) {

		    var opcoes = {
	        	method: 'POST',
	        	url: '/api/v1/contacts',
	        	headers: {
	          		'Content-Type': 'application/json',
	          		Authorization: 'Bearer ' + token
	        	},
	        	payload: {
	          		name: 'Contact',
	          		telephone: '99999-8888',
	          		operator: operator.id
	        	}
	      	};

		    server.inject(opcoes, function(response) {

		        expect(response.statusCode).to.equal(200);
	        	contactId = response.result.id;
		        done();
	    	});
	    });
    });

  	describe('PUT /api/v1/contacts/{id}', function() {

	    it('Update contact', function(done) {

		    var opcoes = {
	    	    method: 'PUT',
	        	url: '/api/v1/contacts/' + contactId,
	        	headers: {
	            	'Content-Type': 'application/json',
	          		Authorization: 'Bearer ' + token
	        	},
	        	payload: {
	          		name: 'Contact Update'
	        	}
	      	};

		    server.inject(opcoes, function(response) {

	    	    expect(response.statusCode).to.equal(200);
	        	done();
	      	});
	    });
	});	

  	describe('GET /api/v1/contacts', function() {

    	it('List contact', function(done) {

      		var opcoes = {
        		method: 'GET',
        		url: '/api/v1/contacts',
        		headers: {
          			Authorization: 'Bearer ' + token
        		}
    	  	};

	      	server.inject(opcoes, function(response) {
        
        		expect(response.result).to.be.an('array');
        		done();
    	  	});
	    });
	});	

  	describe('DELETE /api/v1/contacts/{id}', function() {

	    it('Delete contact', function(done) {

	      	var opcoes = {
	        	method: 'DELETE',
	        	url: '/api/v1/contacts/' + contactId,
	        	headers: {
	          		Authorization: 'Bearer ' + token
	        	}
	      	};

	      	server.inject(opcoes, function(response) {

		        expect(response.statusCode).to.equal(200);
		        contactId = null;
		        done();
	      	});
	    });
  	}); 	    
});	