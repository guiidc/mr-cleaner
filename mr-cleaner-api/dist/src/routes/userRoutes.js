"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserService_1 = __importDefault(require("../services/UserService"));
const validations = __importStar(require("../validations/users"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const TokenProvider_1 = __importDefault(require("../providers/TokenProvider"));
const Rolerepository_1 = __importDefault(require("../repositories/Rolerepository"));
const AccessLogRepository_1 = __importDefault(require("../repositories/AccessLogRepository"));
const userRepository = new UserRepository_1.default();
const roleRepository = new Rolerepository_1.default();
const accessLogRepository = new AccessLogRepository_1.default();
const tokenProvider = new TokenProvider_1.default();
const userService = new UserService_1.default(userRepository, roleRepository, tokenProvider, accessLogRepository);
const userController = new UserController_1.default(userService);
function usersRoutes() {
    const router = (0, express_1.Router)();
    router.post('/login', validations.loginValidation, userController.login.bind(userController));
    return router;
}
exports.usersRoutes = usersRoutes;
