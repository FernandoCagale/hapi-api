"use strict";

module.exports = function(sequelize, DataTypes) {

	var Contact = sequelize.define('Contact', {
		name: {
      		type: DataTypes.STRING(40),
 			    allowNull: false,
	        validate :{
	        	len: {
	        		args: [4, 40],
	        		msg: 'name must contain 4-40 characters'
	        	}
	      	}
    	},
    	phone: {
      		type: DataTypes.STRING(10),
 			    allowNull: false,
	        validate :{
	        	len: {
	        		args: [9, 10],
	        		msg: 'telephone must contain 9-10 characters'
	        	}
	      	}
    	},
    	operator: {
      		type: DataTypes.INTEGER,
      		allowNull: false,
            references: 'Operators',
            referencesKey: 'id',
            field: 'fk_operator'
    	}
	},
  {
    classMethods: {
    	associate: function(models) {
      	Contact.belongsTo(models.Operator, { foreignKey: 'fk_operator'});
      }
    }
  });
}
