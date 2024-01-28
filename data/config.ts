export const INDEV =
  process.env.NODE_ENV === 'development' || process.env.TS_NODE_DEV === 'true'

export const {
  DB_HOST = INDEV ? '127.0.0.1' : 'postgres',
  DB_PORT = 5432,
  DB_USER = 'postgres',
  DB_PASSWORD = 'postgres',
  DB_DATABASE = 'name',
  // REDIS_HOST = INDEV ? 'localhost' : 'redis',
  // REDIS_PORT = 6379,
} = process.env

export const Config = {
  port: Number(process.env.PORT) || 32500,
  swagger: {
    swagger: {
      info: {
        title: 'Project Backend Swagger',
        description: 'Project Backend Swagger API',
        version: '0.1.0',
      },
      tags: [
        { name: 'Default', description: 'Default' },
        { name: 'User', description: 'User' },
      ],
    },
  },
  swaggerUI: {
    routePrefix: '/docs',
  },
  jwtSecret: 'ELIZA',
  db: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
}

export default Config
