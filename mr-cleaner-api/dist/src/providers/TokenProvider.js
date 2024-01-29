"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class TokenProvider {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }
    generateToken(data) {
        const tokenPayload = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        };
        return jsonwebtoken_1.default.sign(tokenPayload, this.secret, {
            expiresIn: '1d',
            issuer: 'MrClean',
            subject: data.email
        });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.default = TokenProvider;
