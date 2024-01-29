"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCompany = void 0;
const express_validator_1 = require("express-validator");
exports.getSingleCompany = [
    (0, express_validator_1.param)('company_id')
        .isUUID().withMessage('ID da empresa inválido.').bail()
];
