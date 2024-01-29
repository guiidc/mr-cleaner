"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidArgumentException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentException';
    }
}
exports.default = InvalidArgumentException;
