"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models/");
// Represents a fake notes database.
var NoteDao = /** @class */ (function () {
    function NoteDao() {
        var _this = this;
        this.addNote = function (t) {
            _this.notes.push(t);
        };
        this.deleteById = function (t) {
            _this.notes = _this.notes.filter(function (_a) {
                var id = _a.id;
                return t.id !== id;
            });
        };
        this.getAll = function () {
            return _this.notes;
        };
        this.getById = function (t) {
            var note = _this.notes.find(function (_a) {
                var id = _a.id;
                return t.id === id;
            });
            if (note === undefined) {
                throw new Error("Failed to retrieve note with id ".concat(t.id));
            }
            return note;
        };
        this.notes = [];
        this.addNote(new models_1.Note("54065fca-8040-4b5b-9bf9-e3d290da661d", "Mega note", "New"));
    }
    return NoteDao;
}());
exports.default = new NoteDao();
