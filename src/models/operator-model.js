"use strict";

module.exports = function(sequelize, DataTypes) {

  	var Operator = sequelize.define('Operator', {
	    description: {
	    	type: DataTypes.STRING(30),
	        allowNull: false,
	        validate :{
	        	len: {
	        		args: [2, 30],
	        		msg: 'name must contain 2-30 characters'
	        	}
	      	}
	    },
	    value: {
	    	type: DataTypes.DECIMAL(10,5),
	    	allowNull: false
	    }
  	});
};
