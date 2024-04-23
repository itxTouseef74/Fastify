const fastify = require("fastify")({
    logger: true,
    ignoreTrailingSlash: true
})

// Method to register routes , plugins , etc 

fastify.register(require('./our-db-connector.js'))
fastify.register(require('./our-first-route'))
fastify.register(require('./userRoutes.js'))

fastify.get('/' , function (request , reply) {
    reply.send({hello:'world'})
})



fastify.listen({port:3000 ,  host: '127.0.0.1'}, function (err , address) {
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})