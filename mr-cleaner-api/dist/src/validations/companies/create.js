"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const express_validator_1 = require("express-validator");
exports.createCompany = [
    (0, express_validator_1.body)('name')
        .isString().withMessage('Nome inválido.').bail()
        .isLength({ min: 1, max: 255 })
        .withMessage('Nome deve ter entre 1 e 255 caracteres.').bail(),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('E-mail inválido.').bail(),
    (0, express_validator_1.body)('phone')
        .isString().withMessage('Telefone inválido.').bail()
        .isNumeric().withMessage('Telefone inválido.').bail(),
    (0, express_validator_1.body)('coordinate_x')
        .isNumeric().withMessage('Coordenada X inválida.').bail().toFloat(),
    (0, express_validator_1.body)('coordinate_y')
        .isNumeric().withMessage('Coordenada Y inválida.').bail().toFloat()
];
