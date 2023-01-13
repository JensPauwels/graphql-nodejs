"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
var Note = /** @class */ (function () {
    function Note(authorId, description, state) {
        var _this = this;
        this.setAuthor = function (author) {
            _this.author = author;
        };
        this.id = (0, uuidv4_1.uuid)();
        this.authorId = authorId;
        this.description = description;
        this.state = state;
        this.author = undefined;
    }
    return Note;
}());
exports.default = Note;
