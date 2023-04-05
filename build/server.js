"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var body_parser_1 = __importDefault(require("body-parser"));
var queries_1 = require("./queries/");
var middleware_1 = require("./middleware/");
var controllers_1 = require("./controllers/");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
var rootQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: {
        notes: queries_1.NoteQueries.GET_ALL_NOTES,
        noteById: queries_1.NoteQueries.GET_NOTE_BY_ID,
        authors: queries_1.AuthorQueries.GET_ALL_AUTHORS,
    }
});
var schema = new graphql_1.GraphQLSchema({
    query: rootQuery,
});
app.post('/auth/register', controllers_1.AuthController.register);
app.post('/auth/login', controllers_1.AuthController.login);
app.post('/auth/logout', controllers_1.AuthController.logout);
app.use('/graphql', middleware_1.validateToken, (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: rootQuery,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
