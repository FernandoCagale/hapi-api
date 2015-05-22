"use strict";

var Joi = require('joi');

function OperatorShema(){
	this.schema = {
		operator_id: Joi.number().integer().label('enter a number'),
		description: Joi.string().min(2).max(40).label("description should contain 2-30 characters"),
		value: Joi.number().precision(2).default(0)
	};
};

module.exports = OperatorShema;