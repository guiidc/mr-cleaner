"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('E-mail inválido').bail(),
    (0, express_validator_1.body)('password').exists().withMessage('A senha é obrigatória.').bail()
        .isString().withMessage('Senha inválida').bail()
        .isLength({ min: 6 }).withMessage('Credenciais inválidas ou inexistente.').bail()
];
