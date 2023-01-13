"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorDao = exports.NoteDao = void 0;
var NoteDao_1 = require("./NoteDao");
Object.defineProperty(exports, "NoteDao", { enumerable: true, get: function () { return __importDefault(NoteDao_1).default; } });
var AuthorDao_1 = require("./AuthorDao");
Object.defineProperty(exports, "AuthorDao", { enumerable: true, get: function () { return __importDefault(AuthorDao_1).default; } });
