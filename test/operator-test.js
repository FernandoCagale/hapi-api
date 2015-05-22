var expect = require('chai').expect;
var server = require('../src/lib/server');
var db = require('../src/lib/db');

var token = null;
var operatorId = null;

describe('API test operatos', function() {

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
	        	done();
	      	});
	    });
    });

	after(function(done) {

	    var User = db.models.User;
	        
		User.destroy({where: { email: ['test@test.com'] }}).then(function(){
			done();
		});
	});

  	describe('POST /api/v1/operators', function() {

	    it('Save operator', function(done) {

	    	var opcoes = {
	        	method: 'POST',
	        	url: '/api/v1/operators',
	        	headers: {
	          		'Content-Type': 'application/json',
	          		Authorization: 'Bearer ' + token
	        	},
	        	payload: {
	          		description: 'Vivo',
	          		value: '1.99'
	        	}
	        };

	        server.inject(opcoes, function(response) {
	        	expect(response.statusCode).to.equal(200);
	        	operatorId = response.result.id;
	        	done();
	      	});
	    });
  	});

  	describe('PUT /api/v1/operators/{id}', function() {

	    it('Update operator', function(done) {

		    var opcoes = {
        		method: 'PUT',
        		url: '/api/v1/operators/' + operatorId,
        		headers: {
          			'Content-Type': 'application/json',
          			Authorization: 'Bearer ' + token
        		},
        		payload: {
          			description: 'Tim'
        		}
      		};

		    server.inject(opcoes, function(response) {
		        expect(response.statusCode).to.equal(200);
        		done();
      		});
	    });
	});

 	describe('GET /api/v1/operators', function() {

    	it('List operators', function(done) {

		    var opcoes = {
        		method: 'GET',
        		url: '/api/v1/operators',
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

    describe('DELETE /api/v1/operators/{id}', function() {

    	it('Delete operator', function(done) {

	        var opcoes = {
	        	method: 'DELETE',
	        	url: '/api/v1/operators/' + operatorId,
	    		headers: {
	          		Authorization: 'Bearer ' + token
	        	}
	      	};

	      	server.inject(opcoes, function(response) {
	        	expect(response.statusCode).to.equal(200);
	        	operatorId = null;
	        	done();
	      	});
	    });
  	});
});

