require('js.augment');

var Boom = require('boom');

var factory = require('../factory');
var db = require('../lib/db');

var LIMIT = 10;

var ContactController = factory.FactoryDao.augment({

  	constructor: function() {
    	factory.FactoryDao.call(this, db.models.Contact);
	},

	find: function(page, search){
		var sequelize = db.models.Contact;

		var conditions = null;

		if (page == 0)
			page ++;

	    return {
			then: function(callback) {
				sequelize.count().then(function(value){
					if (value) {
						var offset = (LIMIT * (page-1));

						sequelize.associate(db.models)

						sequelize.findAll(
							{
								//attributes: ['name'],
								include: [{model : db.models.Operator, attributes: ['description']}]
							},
							{where: (conditions != null ? conditions : null), offset: offset, limit: LIMIT, order: 'id ASC'}).
						then(function(models) {
					    	callback(models);
					    }).catch(function(error){
					    	callback(Boom.badData(error.message));
					    });
					} else {
						callback(null);
					}
				}).catch(function(error){
					callback(Boom.badData(error.message));
				});
			}
		}
	}

});

module.exports = ContactController;