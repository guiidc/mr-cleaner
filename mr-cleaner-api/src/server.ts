import App from './App'
import * as routes from './routes'
import 'dotenv/config'

let applicationPort = 4000

if (process.env.PORT != null) {
  applicationPort = parseInt(process.env.PORT, 10)

  if (isNaN(applicationPort)) {
    applicationPort = 4000
  }
}
const app = new App(applicationPort)

app.setRoutes('/v1/users', routes.usersRoutes())
app.setRoutes('/v1/companies', routes.companyRoutes())
app.setRoutes('/v1/paths', routes.pathRoutes())
app.run()
