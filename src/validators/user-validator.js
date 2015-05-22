"use strict";

var Joi = require('joi');

var schemas = require('../schemas');

function UserValidator(){};

UserValidator.prototype = (function(){

	return {

		find: {
			query: (function query() {
				return {
					page: Joi.number().integer().optional(),
					search: Joi.string().optional()
				};
			})()
		},
		findByID: {
			params: (function payload() {
				var schema = new schemas.UserSchema().schema;
				return {
					id: schema.user_id.required()
				};
			})()
		},		
		insert: {
			payload: (function payload() {
				var schema = new schemas.UserSchema().schema;
				return {
					name: schema.name.required(),
					lastName: schema.lastName.required(),
					email: schema.email.required(),
					password: schema.password.required()
				};
			})()
		},

		update: {
			payload: (function payload() {
				var schema = new schemas.UserSchema().schema;
				return {
					name: schema.name.optional(),
					lastName: schema.lastName.optional(),
					email: schema.email.optional(),
					password: schema.password.optional()
				};
			})(),
			params: (function params() {
				var schema = new schemas.UserSchema().schema;
				return {
					id: schema.user_id.required()
				};
			})()
		},

		delete: {
			params: (function params() {
				var schema = new schemas.UserSchema().schema;
				return {
					id: schema.user_id.required()
				};
			})() 
		}
	};

})();

var userValidator = new UserValidator();
module.exports = userValidator;