"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Todo = /** @class */ (function () {
    function Todo(data) {
        var _a, _b, _c, _d, _e;
        this.id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
        this.authorID = (_b = data === null || data === void 0 ? void 0 : data.author_id) !== null && _b !== void 0 ? _b : '';
        this.content = (_c = data === null || data === void 0 ? void 0 : data.content) !== null && _c !== void 0 ? _c : '';
        this.checked = (_d = data === null || data === void 0 ? void 0 : data.checked) !== null && _d !== void 0 ? _d : false;
        this.categoryID = (_e = data === null || data === void 0 ? void 0 : data.category_id) !== null && _e !== void 0 ? _e : '';
    }
    return Todo;
}());
exports.default = Todo;
