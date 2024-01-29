import { type UserLoginRequestDTO } from '../DTO/usersDTO'
import type UserRepository from '../repositories/UserRepository'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import bcrypt from 'bcryptjs'
import type TokenProvider from '../providers/TokenProvider'
import type RoleRepository from '../repositories/Rolerepository'
import type AccessLogRepository from '../repositories/AccessLogRepository'

export default class UserService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly tokenProvider: TokenProvider,
    private readonly accessLogRepository: AccessLogRepository
  ) {}

  public async login (userDTO: UserLoginRequestDTO): Promise<string> {
    const rescuedUser = await this.userRepository.getByEmail(userDTO.email)

    if (rescuedUser === null) {
      throw new UnauthorizedException('Credenciais inválidas ou inexistente.')
    }

    if (!bcrypt.compareSync(userDTO.password, rescuedUser.password)) {
      throw new UnauthorizedException('Credenciais inválidas ou inexistente.')
    }

    const rescuedRole = await this.roleRepository.getById(rescuedUser.role_id)

    const tokenPayload = {
      id: rescuedUser.id,
      name: rescuedUser.name,
      email: rescuedUser.email,
      role: rescuedRole!
    }

    const accessToken = this.tokenProvider.generateToken(tokenPayload)

    await this.userRepository.updateLastAccessToken(rescuedUser.id, accessToken)

    await this.accessLogRepository.save(rescuedUser.id)

    return accessToken
  }
}
