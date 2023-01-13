"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_NOTE_BY_ID = exports.GET_ALL_NOTES = void 0;
var graphql_1 = require("graphql");
var types_1 = require("../types");
var dao_1 = require("../dao/");
exports.GET_ALL_NOTES = {
    description: 'List of all the notes',
    type: new graphql_1.GraphQLList(types_1.NoteType),
    resolve: function () {
        return dao_1.NoteDao.notes;
    }
};
exports.GET_NOTE_BY_ID = {
    description: 'A note by id',
    type: types_1.NoteType,
    args: {
        id: { type: graphql_1.GraphQLString }
    },
    resolve: function (_, _a) {
        var id = _a.id;
        return dao_1.NoteDao.notes.find(function (note) { return note.id === id; });
    }
};
