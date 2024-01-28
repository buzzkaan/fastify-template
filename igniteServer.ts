import fastify from 'fastify'
import { INDEV, Config } from './data/config'
import fastifySwagger from '@fastify/swagger'
import { Postgres, Authentication } from 'interceptors'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import Endpoints from './endpoints/igniteEndpoints'

const server = fastify({
  bodyLimit: 1048576 * 10,
  pluginTimeout: INDEV ? 30000 : 10000,
})

server.register(fastifySwagger, {
  ...Config.swagger,
})
server.register(fastifySwaggerUi, {
  ...Config.swaggerUI,
})

server.register(fastifyJwt, {
  secret: Config.jwtSecret,
})

server.register(fastifyMultipart, {
  limits: {
    files: 3,
    fileSize: 1048576 * 10, // 10MB
    headerPairs: 2000,
    fields: 100,
    fieldSize: 1048576 * 10, // 10MB
  },
})

server.register(Authentication)
server.register(Postgres)

server.register(Endpoints)

server.listen(
  {
    port: Config.port,
    host: INDEV ? '::1' : '0.0.0.0',
  },
  (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  },
)
