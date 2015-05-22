require('js.augment');

var Boom = require('boom');

var LIMIT = 10;

var FactoryDao = Object.augment({

  	constructor: function(model) {
  		if (typeof(model) === 'object') {
      		this.sequelize = model;
    	} else {
      		throw new TypeError('Argument <model> is not a sequelize!');
    	}
  	},

	findByID: function(params) {

		var sequelize = this.sequelize;

		var id = params.id;

    	return {
			then: function(callback) {

				if(id == null)
					callback(Boom.badData('parameter not informed'));

				sequelize.find({where :{id : id}}).then(function(model) {

					if (model)
			    		callback(model);
			    	else
			    		callback(Boom.badData('entity not found'));

			    }).catch(function(error){
			    	callback(Boom.badData(error.message));
			    });
			}
		}
	}, 	

	find: function(page, search) {
  	  	
		var sequelize = this.sequelize;

		var conditions = null;

		if (page == 0)
			page ++;

	    return {
			then: function(callback) {
				sequelize.count().then(function(value){
					if (value) {
						var offset = (LIMIT * (page-1));

						sequelize.findAll({where: (conditions != null ? conditions : null), offset: offset, limit: LIMIT, order: 'id ASC'}).then(function(models) {
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
	},	

	insert: function(value) {

		var sequelize = this.sequelize;

		return {
			then: function(callback) {
				sequelize.create(value).then(function(model) {
			    	callback(model);
			    }).catch(function(error){
			    	callback(Boom.badData(error.message));
			    });
			}
		}
    },

	update: function(value, params) {

		var sequelize = this.sequelize;

		var id = params.id;

		return {
			then: function(callback) {

				if(id == null)
					callback(Boom.badData('parameter not informed'));

				sequelize.find({where :{id : id}}).then(function(model) {
					if (model) {
						model.update(value, {where :{id : id}}).then(function(model){
							callback(model);
						});
					} else {
						callback(Boom.badData('entity not found'));
					}
			    }).catch(function(error){
			    	callback(Boom.badData(error.message));
			    });
			}
		}
	},

	delete: function (params) {

		var sequelize = this.sequelize;

		var id = params.id;

		return {
			then: function(callback) {

				if(id == null)
					callback(Boom.badData('parameter not informed'));


				sequelize.find({where :{id : id}}).then(function(model) {
					if (model) {
						model.destroy().then(function(){
							callback({
						        success: true
							});
						}).catch(function(error){
						    if (error.name == 'SequelizeForeignKeyConstraintError') {
						    	callback(Boom.badData('this record linked to another table'));
						    } else {
						      	callback(Boom.badData(error.message));
						    }		
						});
					} else {
						callback(Boom.badData('entity not found'));
					}
				}).catch(function(error){
		    		callback(Boom.badData(error.message));
			    });	
			}
		}
	}
});

module.exports = FactoryDao;