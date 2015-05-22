"use strict";

var schemas = require('../schemas');

function AuthValidator(){};

AuthValidator.prototype = (function(){
	return {
		auth: {
			payload: (function payload() {
				var schema = new schemas.UserSchema().schema;
				return {
					email: schema.email.required(),
					password: schema.password.required()
				};
			})()
		}
	};
})();

var authValidator = new AuthValidator();

module.exports = authValidator;