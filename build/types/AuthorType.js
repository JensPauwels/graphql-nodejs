"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var TodoType_1 = __importDefault(require("./TodoType"));
var AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        notes: {
            type: new graphql_1.GraphQLList(TodoType_1.default),
            resolve: function (author) {
                return [];
            },
        },
    }); },
});
exports.default = AuthorType;
