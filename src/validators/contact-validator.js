"use strict";

var Joi = require('joi');

var schemas = require('../schemas');

function ContactValidator(){};

ContactValidator.prototype = (function(){

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
				var schema = new schemas.ContactSchema().schema;
				return {
					id: schema.contact_id.required()
				};
			})()
		},
		insert: {
			payload: (function payload() {
				var schema = new schemas.ContactSchema().schema;
				return {
					name: schema.name.required(),
					phone: schema.phone.required(),
					operator: schema.operator.required()
				};
			})()
		},

		update: {
			payload: (function payload() {
				var schema = new schemas.ContactSchema().schema;
				return {
					name: schema.name.optional(),
					phone: schema.phone.optional(),
					operator: schema.operator.optional()
				};
			})(),
			params: (function params() {
				var schema = new schemas.ContactSchema().schema;
				return {
					id: schema.contact_id.required()
				};
			})()
		},

		delete: {
			params: (function params() {
				var schema = new schemas.ContactSchema().schema;
				return {
					id: schema.contact_id.required()
				};
			})()
		}
	};

})();

var contactValidator = new ContactValidator();

module.exports = contactValidator;
