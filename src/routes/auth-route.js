var controllers = require('../controllers');
var validators = require('../validators');

exports.register = function(server, options, next) {

  /**
   * @api {post} /api/v1/auth
   * @apiName  Auth
   * @apiGroup Auth
   * @apiDescription Creates a new JWT from a user and password
   *
   * @apiParam {String} email The user's e-mail logging in
   * @apiParam {String} password The password registered in the database
   */
  server.route({
    method: 'POST',
    path: '/api/v1/auth',
    config: {
      handler:  controllers.AuthController.auth,
      validate: validators.AuthValidator.auth
    }
  });

  /**
   * @api {get} /api/v1/auth
   * @apiName  Get
   * @apiGroup Auth
   * @apiDescription Returns information about the current token
   *
   * @apiHeader {String} Authorization O bearer token com o JWT
   */
  server.route({
    method: 'GET',
    path: '/api/v1/auth',
    config: {
      handler : controllers.AuthController.getAuth,
      auth: 'token'
    }
  });

  next();
};

exports.register.attributes = {
  name: 'auth-route',
  version: '0.0.1'
};
