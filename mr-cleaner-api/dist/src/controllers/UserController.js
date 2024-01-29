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
const exception_handler_1 = __importDefault(require("../middlewares/exception-handler"));
const express_validator_1 = require("express-validator");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (!validationErrors.isEmpty()) {
                    return res.status(400).json({ message: validationErrors.array()[0].msg });
                }
                const accessToken = yield this.userService.login(req.body);
                res.setHeader('Access-Token', accessToken);
                return res.status(200).json({ message: 'Login realizado com sucesso.' });
            }
            catch (err) {
                yield (0, exception_handler_1.default)(err, req, res);
            }
        });
    }
}
exports.default = UserController;
