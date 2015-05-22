"use strict";

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate :{
        len: {
          args: [3, 20],
          msg: 'name must contain 3-20 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'lastname',
      validate :{
        len: {
          args: [3, 20],
          msg: 'last name must contain 3-20 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate :{
        len: {
          args: [3, 60],
          msg: 'password must be 6 characters or more'
        }
      }
    },
    email: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false
    }
  }, {
    instanceMethods: {

      checksPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
      
    }
  });

  User.hook('beforeCreate', function(user, opts, cb) {
    var password = user.get('password');

    if (!password)
      return cb(null, user);

    bcrypt.hash(password, 10, function(err, hash) {
      if (err)
        cb(err);

      user.set({
        password: hash
      });
      cb(null, user);
    });
  });

  User.hook('beforeUpdate', function(user, opts, cb) {
    var password = user.get('password');

    if (!password || !user.changed('password'))
      return cb(null, user);

    bcrypt.hash(password, 10, function(err, hash) {
      if (err)
        cb(err);

      user.set({
        password: hash
      });
      cb(null, user);
    });
  });

  User.types = function(){
    var propertys = [];

    var id = {
      tipo: 'INTEGER'
    };

    propertys.push(id);

    var name = {
      tipo: 'STRING'
    }

    propertys.push(name);

    var lastName = {
      tipo: 'STRING'
    }

    propertys.push(lastName);

    var email = {
      tipo: 'STRING'
    }

    propertys.push(email);

    return propertys;
  };

};
