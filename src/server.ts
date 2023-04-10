import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import bodyParser from 'body-parser';

import {TodoQueries, AuthorQueries, CategoryQueries} from './queries/';
import {validateToken, type Token} from './middleware/';
import {AuthController} from './controllers/';

const app = express();
app.use(bodyParser.json());

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: {
    updateTodo: TodoQueries.UPDATE_TODO,
    addTodo: TodoQueries.ADD_TODO,
    deleteTodo: TodoQueries.DELETE_TODO,
  },
});

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: {
    todos: TodoQueries.GET_ALL_TODOS,
    categories: CategoryQueries.GET_ALL_CATEGORIES,
    categoryByID: CategoryQueries.GET_BY_ID,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);
app.post('/api/auth/logout', AuthController.logout);

app.use('/api/graphql', validateToken, graphqlHTTP((req: any, res) => {
  const token = req.token as Token;

  return {
    schema,
    rootValue: rootQuery,
    graphiql: true,
    context: {
      token,
    },
  };
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
