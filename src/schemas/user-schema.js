"use strict";

var Joi = require('joi');

function UserShema(){
	this.schema = {
		user_id: Joi.number().integer().label('enter a number'),
		name: Joi.string().min(3).max(20).label('name must contain 3-20 characters'),
        lastName: Joi.string().min(3).max(20).label('last name must contain 3-20 characters'),
        email: Joi.string().email().max(40).label('enter a valid e-mail'),
        password: Joi.string().min(3).max(60).label('password must be 6 characters or more')
	};
};

module.exports = UserShema;