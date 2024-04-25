const fastifyPlugin  =  require ('fastify-plugin')


async function dbConnector (fastify , options) {
    
    try {
        fastify.register(require ('@fastify/mongodb') , {
            url: 'mongodb://localhost:27017/fastify_database'
            
            
        })
        console.log("db connected")
    } catch (error) {
        console.log("Mongodb error ".error)
    }


    
}
module.exports = fastifyPlugin(dbConnector)
