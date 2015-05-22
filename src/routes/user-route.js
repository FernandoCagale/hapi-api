var Joi = require('joi');
var controllers = require('../controllers');
var validators = require('../validators');

exports.register = function(server, options, next) {

	/**
	* @api {get} /api/v1/users
	* @apiName find
	* @apiGroup User
	* @apiDescription Returns a list of users
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*/
	server.route({
		method: 'GET',
		path: '/api/v1/users',
		config: {
			handler : controllers.UserController.find,
			validate: validators.UserValidator.find,
			auth: 'token'
		}
	});

	/**
	* @api {get} /api/v1/users
	* @apiName findById
	* @apiGroup User
	* @apiDescription Returns a user based on the parameter
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} id The user id to be returned
	*/
	server.route({
		method: 'GET',
		path: '/api/v1/users/{id}',
		config: {
		  	handler : controllers.UserController.findByID,
			validate: validators.UserValidator.findByID,
			auth: 'token'
		}
	});

	/**
	* @api {post} /api/v1/user
	* @apiName insert
	* @apiGroup User
	* @apiDescription Create new user
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} name User's first name
	* @apiParam {String} lastName Last name of the user
	* @apiParam {String} email The user email
	* @apiParam {String} password The user password
	*/
	server.route({
		method: 'POST',
		path: '/api/v1/users',
		config: {
			handler: controllers.UserController.insert,
			validate: validators.UserValidator.insert

		}
	});

	/**
	* @api {put} /api/v1/user
	* @apiName update
	* @apiGroup User
	* @apiDescription Update user
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} [name] User's first name
	* @apiParam {String} [lastName] Last name of the user
	* @apiParam {String} [email] The user email
	* @apiParam {String} [password] The user password
	*
	* @apiParam {String} id The user id to be updated
	*/
	server.route({
		method: 'PUT',
		path: '/api/v1/users/{id}',
		config: {
			handler: controllers.UserController.update,
			validate: validators.UserValidator.update,
			auth: 'token'
		}
	});

	/**
	* @api {delete} /api/v1/user
	* @apiName delete
	* @apiGroup User
	* @apiDescription Delete user
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} id The user id to be deleted
	*/
	server.route({
		method: 'DELETE',
		path: '/api/v1/users/{id}',
		config: {
	    	handler: controllers.UserController.delete,
	    	validate: validators.UserValidator.delete,
	    	auth: 'token'
		}
	});

	next();
};

exports.register.attributes = {
  name: 'users-factory-route',
  version: '0.0.1'
};
