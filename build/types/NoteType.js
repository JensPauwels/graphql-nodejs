"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var AuthorType_1 = __importDefault(require("./AuthorType"));
var dao_1 = require("../dao");
var models_1 = require("../models");
var NoteType = new graphql_1.GraphQLObjectType({
    name: 'Note',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        authorId: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        state: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorType_1.default,
            resolve: function (note) {
                var author = new models_1.Author(note.authorId);
                dao_1.AuthorDao.getById(author);
                return author;
            }
        },
    }); }
});
exports.default = NoteType;
