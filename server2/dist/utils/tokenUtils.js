"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(type, info) {
    return new Promise((resolve, reject) => {
        let secret = type === 'accessToken'
            ? process.env.JWT_ACCESS_TOKEN
            : process.env.JWT_REFRESH_TOKEN;
        if (!secret) {
            return reject(new Error('Secret key is missing'));
        }
        let expires = type === 'accessToken' ? '1m' : '3d';
        jsonwebtoken_1.default.sign(info, secret, { expiresIn: expires }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}
