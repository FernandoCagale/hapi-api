"use strict";

var Joi = require('joi');

function ContactShema(){
	this.schema = {
		contact_id: Joi.number().integer().label('enter a number'),
		operator: Joi.number().integer().label('enter a number'),
		name: Joi.string().min(2).max(40).label("name must contain 2 - 40 characters"),
		phone: Joi.string().min(8).max(10).label("phone should contain 8 to 10 characters")
	};
};

module.exports = ContactShema;
