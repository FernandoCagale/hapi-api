var Joi = require('joi');
var controllers = require('../controllers');
var validators = require('../validators');

exports.register = function(server, options, next) {

	/**
	* @api {get} /api/v1/contacts
	* @apiName find
	* @apiGroup Contact
	* @apiDescription Returns a list of contacts
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*/
	server.route({
		method: 'GET',
		path: '/api/v1/contacts',
		config: {
			handler : controllers.ContactController.find,
			validate: validators.ContactValidator.find,
			auth: 'token'
		}
	});

	/**
	* @api {get} /api/v1/contacts
	* @apiName findById
	* @apiGroup Contact
	* @apiDescription Returns a contact based on the parameter
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} id The contact id to be returned
	*/
	server.route({
		method: 'GET',
		path: '/api/v1/contacts/{id}',
		config: {
		  	handler : controllers.ContactController.findByID,
			validate: validators.ContactValidator.findByID,
			auth: 'token'
		}
	});

	/**
	* @api {post} /api/v1/contact
	* @apiName insert
	* @apiGroup Contact
	* @apiDescription Create new contact
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} name The contact name
	* @apiParam {String} phone The contact phone
	*/
	server.route({ 
		method: 'POST',
		path: '/api/v1/contacts',
		config: {
			handler: controllers.ContactController.insert,
			validate: validators.ContactValidator.insert,
			auth: 'token'
		}
	});

	/**
	* @api {put} /api/v1/contact
	* @apiName update
	* @apiGroup Contact
	* @apiDescription Update contact
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} [name] The contact name
	* @apiParam {String} [phone] The contact phone
	*
	* @apiParam {String} id The contact id to be updated
	*/
	server.route({
		method: 'PUT', 
		path: '/api/v1/contacts/{id}',
		config: {
			handler: controllers.ContactController.update,
			validate: validators.ContactValidator.update,
			auth: 'token'
		} 
	}); 

	/**
	* @api {delete} /api/v1/contact
	* @apiName delete
	* @apiGroup Contact
	* @apiDescription Delete contact
	*
	* @apiHeader {String} Authorization The valid JWT token with the authorization
	*
	* @apiParam {String} id The contact id to be deleted
	*/
	server.route({
		method: 'DELETE',
		path: '/api/v1/contacts/{id}',
		config: {
	    	handler: controllers.ContactController.delete,
	    	validate: validators.ContactValidator.delete,
	    	auth: 'token'
		}
	});		

	next();
};

exports.register.attributes = {
  name: 'contacts-route',
  version: '0.0.1'
};
