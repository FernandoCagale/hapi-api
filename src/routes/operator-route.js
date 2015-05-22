var Joi = require('joi');
var controllers = require('../controllers');
var validators = require('../validators');

exports.register = function(server, options, next) {

	/**
	* @api {get} /api/v1/operators
	* @apiName find
	* @apiGroup Operator
	* @apiDescription Returns a list of operators
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*/
	server.route({
		method: 'GET',
		path: '/api/v1/operators',
		config: {
			handler : controllers.OperatorController.find,
			validate: validators.OperatorValidator.find,
			auth: 'token'
		}
	});

	/**
	* @api {get} /api/v1/operators
	* @apiName findById
	* @apiGroup Operator
	* @apiDescription Returns a operator based on the parameter
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} id The operator id to be returned
	*/
	server.route({
		method: 'GET',
		path: '/api/v1/operators/{id}',
		config: {
		  	handler : controllers.OperatorController.findByID,
			validate: validators.OperatorValidator.findByID,
			auth: 'token'
		}
	});

	/**
	* @api {post} /api/v1/operator
	* @apiName insert
	* @apiGroup Operator
	* @apiDescription Create new operator
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} description The operator description
	* @apiParam {String} value The operator value
	*/
	server.route({ 
		method: 'POST',
		path: '/api/v1/operators',
		config: {
			handler: controllers.OperatorController.insert,
			validate: validators.OperatorValidator.insert,
			auth: 'token'
		}
	});

	/**
	* @api {put} /api/v1/operator
	* @apiName update
	* @apiGroup Operator
	* @apiDescription Update operator
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} [description] The operator description
	* @apiParam {String} [value] The operator value
	*
	* @apiParam {String} id The operator id to be updated
	*/
	server.route({
		method: 'PUT', 
		path: '/api/v1/operators/{id}',
		config: {
			handler: controllers.OperatorController.update,
			validate: validators.OperatorValidator.update,
			auth: 'token'
		} 
	}); 

	/**
	* @api {delete} /api/v1/operator
	* @apiName delete
	* @apiGroup Operator
	* @apiDescription Delete operator
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} id The operator id to be deleted
	*/
	server.route({
		method: 'DELETE',
		path: '/api/v1/operators/{id}',
		config: {
	    	handler: controllers.OperatorController.delete,
	    	validate: validators.OperatorValidator.delete,
	    	auth: 'token'
		}
	});		

	next();
};

exports.register.attributes = {
  name: 'operators-route',
  version: '0.0.1'
};
