"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Author = /** @class */ (function () {
    function Author(data) {
        var _a, _b, _c;
        this.id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
        this.name = (_b = data === null || data === void 0 ? void 0 : data.name) !== null && _b !== void 0 ? _b : '';
        this.email = (_c = data === null || data === void 0 ? void 0 : data.email) !== null && _c !== void 0 ? _c : '';
        this.todos = [];
    }
    return Author;
}());
exports.default = Author;
