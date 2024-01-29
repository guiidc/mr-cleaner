"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundException';
    }
}
exports.default = NotFoundException;
