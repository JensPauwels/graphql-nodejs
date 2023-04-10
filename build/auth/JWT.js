"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_NAME = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dayjs_1 = __importDefault(require("dayjs"));
exports.TOKEN_NAME = 'GRAPHQL_TOKEN';
var TOKEN_HASH = 'Dit_is-een!secret@key#vo-0rGr@pHQ|';
var JWT = /** @class */ (function () {
    function JWT() {
        // SetToken sets the signed JWT token as a cookie
        this.setToken = function (res, tokenData) {
            var oneWeek = 7 * 24 * 3600 * 1000;
            var tokenBody = __assign({ expiring: (0, dayjs_1.default)().add(7, 'd').unix() }, tokenData);
            var token = jsonwebtoken_1.default.sign(tokenBody, TOKEN_HASH);
            res.cookie(exports.TOKEN_NAME, token, {
                domain: 'graphql.local',
                maxAge: oneWeek,
                expires: new Date(Date.now() + oneWeek),
            });
        };
        // SetExpiredCookie overwrites the current token with an expired token, this is a hack to
        // remove the current token
        this.setExpiredCookie = function (res) {
            var tokenBody = {
                authenticated: false,
                expiring: Date.now(),
            };
            var token = jsonwebtoken_1.default.sign(tokenBody, TOKEN_HASH);
            res.cookie(exports.TOKEN_NAME, token, {
                domain: 'localhost',
                maxAge: 0,
            });
        };
    }
    return JWT;
}());
exports.default = new JWT();
