import { Router } from 'express'
import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import * as validations from '../validations/users'
import UserRepository from '../repositories/UserRepository'
import TokenProvider from '../providers/TokenProvider'
import RoleRepository from '../repositories/Rolerepository'
import AccessLogRepository from '../repositories/AccessLogRepository'

const userRepository = new UserRepository()
const roleRepository = new RoleRepository()
const accessLogRepository = new AccessLogRepository()
const tokenProvider = new TokenProvider()
const userService = new UserService(userRepository, roleRepository, tokenProvider, accessLogRepository)
const userController = new UserController(userService)
export function usersRoutes (): Router {
  const router = Router()
  router.post('/login', validations.loginValidation, userController.login.bind(userController))
  return router
}
