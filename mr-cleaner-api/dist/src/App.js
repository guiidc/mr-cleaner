"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)({ origin: '*', exposedHeaders: ['Authorization', 'Access-Token'] }));
        this.port = port;
        this.app.use(express_1.default.json());
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    setRoutes(prefix, router) {
        this.app.use(prefix, router);
    }
}
exports.default = App;
