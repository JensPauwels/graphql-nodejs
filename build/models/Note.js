"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Note = /** @class */ (function () {
    function Note(authorId, description, state) {
        var _this = this;
        this.setAuthor = function (author) {
            _this.author = author;
        };
        this.id = (0, uuid_1.v4)();
        this.authorId = authorId;
        this.description = description;
        this.state = state;
        this.author = undefined;
    }
    return Note;
}());
exports.default = Note;
