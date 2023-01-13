import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { NoteQueries, AuthorQueries } from './queries/';

const app = express();

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

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootQuery,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
