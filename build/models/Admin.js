"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Admin = /** @class */ (function () {
    function Admin(data) {
        var _a, _b, _c, _d;
        this.id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
        this.email = (_b = data === null || data === void 0 ? void 0 : data.email) !== null && _b !== void 0 ? _b : '';
        this.password = (_c = data === null || data === void 0 ? void 0 : data.password) !== null && _c !== void 0 ? _c : '';
        this.name = (_d = data === null || data === void 0 ? void 0 : data.name) !== null && _d !== void 0 ? _d : '';
    }
    return Admin;
}());
exports.default = Admin;
