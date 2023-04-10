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
var rootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: {
        updateTodo: queries_1.TodoQueries.UPDATE_TODO,
        addTodo: queries_1.TodoQueries.ADD_TODO,
        deleteTodo: queries_1.TodoQueries.DELETE_TODO,
    },
});
var rootQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: {
        todos: queries_1.TodoQueries.GET_ALL_TODOS,
        categories: queries_1.CategoryQueries.GET_ALL_CATEGORIES,
        categoryByID: queries_1.CategoryQueries.GET_BY_ID,
    },
});
var schema = new graphql_1.GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
});
app.post('/api/auth/register', controllers_1.AuthController.register);
app.post('/api/auth/login', controllers_1.AuthController.login);
app.post('/api/auth/logout', controllers_1.AuthController.logout);
app.use('/api/graphql', middleware_1.validateToken, (0, express_graphql_1.graphqlHTTP)(function (req, res) {
    var token = req.token;
    return {
        schema: schema,
        rootValue: rootQuery,
        graphiql: true,
        context: {
            token: token,
        },
    };
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
