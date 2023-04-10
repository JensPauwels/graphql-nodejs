"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Category = /** @class */ (function () {
    function Category(data) {
        var _a, _b, _c;
        this.id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
        this.authorID = (_b = data === null || data === void 0 ? void 0 : data.author_id) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = data === null || data === void 0 ? void 0 : data.name) !== null && _c !== void 0 ? _c : '';
    }
    return Category;
}());
exports.default = Category;