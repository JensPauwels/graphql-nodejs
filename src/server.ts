import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import bodyParser from 'body-parser';

import { NoteQueries, AuthorQueries } from './queries/';
import { validateToken } from './middleware/'
import { AuthController  } from './controllers/';

const app = express();
app.use(bodyParser.json());

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: {
    notes: NoteQueries.GET_ALL_NOTES,
    noteById: NoteQueries.GET_NOTE_BY_ID,
    authors: AuthorQueries.GET_ALL_AUTHORS,
  }
});

const schema = new GraphQLSchema({
  query: rootQuery,
});

app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);
app.post('/auth/logout', AuthController.logout);

app.use('/graphql', validateToken, graphqlHTTP({
  schema: schema,
  rootValue: rootQuery,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
