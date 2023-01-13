"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
var Author = /** @class */ (function () {
    function Author(id, name) {
        this.id = id !== null && id !== void 0 ? id : (0, uuidv4_1.uuid)();
        this.name = name !== null && name !== void 0 ? name : '';
        this.notes = [];
    }
    return Author;
}());
exports.default = Author;
