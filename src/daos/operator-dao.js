require('js.augment');

var factory = require('../factory');
var db = require('../lib/db');

var OperatorController = factory.FactoryDao.augment({

  	constructor: function() {
    	factory.FactoryDao.call(this, db.models.Operator);
	}

});

module.exports = OperatorController;