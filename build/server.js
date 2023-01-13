"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var types_1 = require("./types");
var app = (0, express_1.default)();
var rootQuery = {
    name: 'Query',
    description: 'Root query',
    fields: {
        notes: {
            description: 'List of all the notes',
            type: new graphql_1.GraphQLList(types_1.NoteType),
        },
    }
};
var schema = new graphql_1.GraphQLSchema({
    query: rootQuery,
});
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: rootQuery,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
