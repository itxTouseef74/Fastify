// In userRoutes.js
const UserController = require('./UserController');
const { signupSchema, loginSchema } = require('./schema');


module.exports = function (fastify, options, done) {

  
  fastify.post('/register', { schema:  { body: signupSchema } }, UserController.signup );
  fastify.post('/login', { schema: { body: loginSchema } }, UserController.login);
  
  done();
};
