const fastify = require ('fastify')();
const UserController = require ('./UserController')
const {signupSchema , loginSchema } = require ('./schema')

// fastify.register(require('fastify-cors'));

fastify.post('/signup', { schema: { body: signupSchema } }, UserController.signup);
fastify.post('/login', { schema: { body: loginSchema } }, UserController.login);

module.exports = fastify