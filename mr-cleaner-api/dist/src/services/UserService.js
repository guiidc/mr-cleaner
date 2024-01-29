"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnauthorizedException_1 = __importDefault(require("../exceptions/UnauthorizedException"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor(userRepository, roleRepository, tokenProvider, accessLogRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenProvider = tokenProvider;
        this.accessLogRepository = accessLogRepository;
    }
    login(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const rescuedUser = yield this.userRepository.getByEmail(userDTO.email);
            if (rescuedUser === null) {
                throw new UnauthorizedException_1.default('Credenciais inválidas ou inexistente.');
            }
            if (!bcryptjs_1.default.compareSync(userDTO.password, rescuedUser.password)) {
                throw new UnauthorizedException_1.default('Credenciais inválidas ou inexistente.');
            }
            const rescuedRole = yield this.roleRepository.getById(rescuedUser.role_id);
            const tokenPayload = {
                id: rescuedUser.id,
                name: rescuedUser.name,
                email: rescuedUser.email,
                role: rescuedRole
            };
            const accessToken = this.tokenProvider.generateToken(tokenPayload);
            yield this.userRepository.updateLastAccessToken(rescuedUser.id, accessToken);
            yield this.accessLogRepository.save(rescuedUser.id);
            return accessToken;
        });
    }
}
exports.default = UserService;
