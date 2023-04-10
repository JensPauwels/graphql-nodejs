"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.Token = void 0;
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var JWT_1 = require("../auth/JWT");
var Token = /** @class */ (function () {
    function Token(data) {
        var _a, _b;
        this.expiring = (_a = data === null || data === void 0 ? void 0 : data.expiring) !== null && _a !== void 0 ? _a : Date.now() / 1000;
        this.authorID = (_b = data === null || data === void 0 ? void 0 : data.author_id) !== null && _b !== void 0 ? _b : '';
    }
    return Token;
}());
exports.Token = Token;
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
    if (cookie === undefined) {
        return undefined;
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
        res.status(401).json({});
        return;
    }
    try {
        var token = (0, jwt_decode_1.default)(cookie);
        if (typeof token === 'object' && token !== null && 'expiring' in token && 'author_id' in token) {
            if (typeof token.expiring === 'number' && typeof token.author_id === 'string' && token.expiring > Date.now() / 1000) {
                var newToken = new Token();
                newToken.expiring = token.expiring;
                newToken.authorID = token.author_id;
                req.token = newToken;
                next();
                return;
            }
        }
        res.status(401).json({});
        return;
    }
    catch (err) {
        res.status(401).json({});
    }
};
exports.validateToken = validateToken;
