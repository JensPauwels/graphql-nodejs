"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Author = /** @class */ (function () {
    function Author(id, name) {
        this.id = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
        this.name = name !== null && name !== void 0 ? name : '';
        this.notes = [];
    }
    return Author;
}());
exports.default = Author;
