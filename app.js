'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifyEnv = require('@fastify/env');
// Pass --options via CLI arguments in command to enable these options.
// const options = {}
const schema = {
  type: 'object',
  required: ['MONGODB_URI'],
  properties: {   
    MONGODB_URI: {
      type: 'string'
    }
  }
};

const options = {
  schema: schema,
  dotenv: true, // This enables reading from the .env file
  // data: process.env // Not strictly necessary if using dotenv: true
};

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // Register the plugin
  fastify.register(fastifyEnv, options);
  await fastify.after()

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.register(require('@fastify/mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,

    // url: 'mongodb://mongo/app-tgphanoi'
    // url: "mongodb://localhost:27017/app-tgphanoi"
    url: `${fastify.config.MONGODB_URI}`
  })

  fastify.register(require('@fastify/view'), {
      engine: {
        ejs: require('ejs')
      },
      root: path.join(__dirname, 'views') // Specify the directory where your view files are located
    })

  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'), // Specifies where your static files are
    prefix: '/', // Creates a virtual path prefix in the URL
  });

  


}

module.exports.options = options
