"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var JWT_1 = require("../auth/JWT");
var getToken = function (req) {
    var _a = req.headers, cookie = _a.cookie, authorization = _a.authorization;
    if (cookie === undefined && authorization === undefined) {
        return undefined;
    }
    if (authorization !== undefined) {
        var token = authorization.split(' ')[1];
        if (token !== undefined) {
            return token;
        }
    }
    var value = "; ".concat(cookie);
    var parts = value.split("; ".concat(JWT_1.TOKEN_NAME, "="));
    if (parts.length >= 2) {
        var cookie_1 = parts.pop();
        if (cookie_1 !== undefined) {
            return cookie_1.split(';').shift();
        }
    }
};
var validateToken = function (req, res, next) {
    var cookie = getToken(req);
    if (cookie === undefined) {
        console.log("cookie is undefined");
        res.status(401).json({});
        return;
    }
    try {
        var token = (0, jwt_decode_1.default)(cookie);
        if (typeof token === 'object' && token !== null && 'expiring' in token) {
            if (typeof token.expiring === 'number' && token.expiring > Date.now() / 1000) {
                next();
                return;
            }
        }
        console.log(token);
        res.status(401).json({});
        return;
    }
    catch (err) {
        console.log(err);
        res.status(401).json({});
        return;
    }
};
exports.validateToken = validateToken;
