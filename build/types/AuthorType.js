"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var NoteType_1 = __importDefault(require("./NoteType"));
var db_1 = require("../db");
var AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        notes: {
            type: new graphql_1.GraphQLList(NoteType_1.default),
            resolve: function (author) {
                return db_1.NoteDao.notes.filter(function (_a) {
                    var authorId = _a.authorId;
                    return authorId === author.id;
                });
            }
        },
    }); }
});
exports.default = AuthorType;
