"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var TodoType = new graphql_1.GraphQLObjectType({
    name: 'Note',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        authorID: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        checked: { type: graphql_1.GraphQLBoolean },
        category_id: { type: graphql_1.GraphQLString },
    }); },
});
exports.default = TodoType;
