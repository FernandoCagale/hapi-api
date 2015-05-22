"use strict";

var Joi = require('joi');

var schemas = require('../schemas');

function OperatorValidator(){};

OperatorValidator.prototype = (function(){

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
				var schema = new schemas.OperatorSchema().schema;
				return {
					id: schema.operator_id.required()
				};
			})()
		},		
		insert: {
			payload: (function payload() {
				var schema = new schemas.OperatorSchema().schema;
				return {
					description: schema.description.required(),
					value: schema.value.required()
				};
			})()
		},

		update: {
			payload: (function payload() {
				var schema = new schemas.OperatorSchema().schema;
				return {
					description: schema.description.optional(),
					value: schema.value.optional()
				};
			})(),
			params: (function params() {
				var schema = new schemas.OperatorSchema().schema;
				return {
					id: schema.operator_id.required()
				};
			})()
		},

		delete: {
			params: (function params() {
				var schema = new schemas.OperatorSchema().schema;
				return {
					id: schema.operator_id.required()
				};
			})() 
		}
	};

})();

var operatorValidator = new OperatorValidator();

module.exports = operatorValidator;