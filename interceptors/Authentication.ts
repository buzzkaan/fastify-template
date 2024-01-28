import { JWT } from '@fastify/jwt'
import { pg } from './Postgres'
import { FastifyInstance } from 'fastify'

export interface ISession {
  id: string
  email: string
  username: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    session: ISession
  }

  export interface FastifyInstance {
    jwt: JWT
  }
}

export const Authenticator = (app) => async (req, rep) => {
  const token = req.headers.credentials

  if (!token) {
    return rep.status(401).send({ message: 'Unauthorized' })
  }

  // check from user_credentials table, is this token exist and valid?
  const credentials = await pg.query(
    'SELECT * FROM user_credentials WHERE credential = $1 and destroyedat is null',
    [token],
  )

  if (!credentials) {
    return rep.status(401).send({ message: 'Unauthorized' })
  }

  // jwt decode
  const session = app.jwt.decode(token as string)

  req.session = session as ISession
}

export const Authentication = async function (app: FastifyInstance) {
  app.addHook('preValidation', Authenticator(app))

  // return 0
}

export default Authentication
