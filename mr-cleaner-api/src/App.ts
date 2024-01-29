import { type Express, type Router } from 'express'
import express from 'express'
import cors from 'cors'

export default class App {
  private readonly app: Express
  private readonly port: number

  constructor (port: number) {
    this.app = express()
    this.app.use(cors({ origin: '*', exposedHeaders: ['Authorization', 'Access-Token'] }))
    this.port = port
    this.app.use(express.json())
  }

  public run (): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

  public setRoutes (prefix: string, router: Router): void {
    this.app.use(prefix, router)
  }
}
