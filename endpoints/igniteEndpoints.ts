import User from './user/igniteUserEndpoint'

export default async function (app) {
  app.get('/', (req, rep) => {
    rep.send('Service provider is working properly!')
  })

  app.register(User, { prefix: '/user' })
}
