var expect = require('chai').expect;
var server = require('../src/lib/server');
var db = require('../src/lib/db');

var token = null;
var userId = null;

describe('API test users', function() {

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

	describe('POST /api/v2/users', function() {

		it('Save user', function(done) {

			var opcoes = {
				method: 'POST',
				url: '/api/v2/users',
				headers: {
          			'Content-Type': 'application/json',
          			Authorization: 'Bearer ' + token
        		},
				payload: {
					name: 'Name',
					lastName: 'Last Name',
					email: 'user_test@user.com',
					password: 'password'
				}
			};

		 	server.inject(opcoes, function(response) {
		    	expect(response.statusCode).to.equal(200);
		    	userId = response.result.id;

		    	done();
		  	});
		});
	});	

    describe('PUT /api/v2/users/{id}', function() {

	    it('Update user', function(done) {

	      	var opcoes = {
	        	method: 'PUT',
	        	url: '/api/v2/users/' + userId,
	        	headers: {
	          		'Content-Type': 'application/json',
	           		Authorization: 'Bearer ' + token
	        	},
	        	payload: {
	          		name: 'Test'
	        	}
	      	};

	      	server.inject(opcoes, function(response) {
				expect(response.statusCode).to.equal(200);
	        	done();
	      	});
	    });
    });

    describe('GET /api/v2/users', function() {

    	it('List users', function(done) {

      		var opcoes = {
        		method: 'GET',
        		url: '/api/v2/users',
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

 	describe('DELETE /api/v2/users/{id}', function() {

	    it('Delete user', function(done) {

    		var opcoes = {
        		method: 'DELETE',
        		url: '/api/v2/users/' + userId,
        		headers: {
          			Authorization: 'Bearer ' + token
        		}
      		};

	      	server.inject(opcoes, function(response) {
	        	expect(response.statusCode).to.equal(200);
	        	userId = null;
	        	done();
	      	});
	    });
	});
});