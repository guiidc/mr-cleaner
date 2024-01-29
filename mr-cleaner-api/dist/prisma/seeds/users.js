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
exports.seedUsers = void 0;
const connection_1 = __importDefault(require("../../src/database/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersList = [
    {
        name: 'Admin',
        email: 'admin@mail.com',
        password: bcryptjs_1.default.hashSync('123456', 12)
    }
];
function seedUsers(rolesList) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = usersList.map((user) => __awaiter(this, void 0, void 0, function* () {
            return (yield connection_1.default.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role_id: rolesList[0].id
                }
            }));
        }));
        const insertedUsers = yield Promise.all(promises);
        insertedUsers.forEach((user) => {
            console.log(`🙋🏻‍User ${user.name} created with id ${user.id}`);
        });
        return insertedUsers;
    });
}
exports.seedUsers = seedUsers;
