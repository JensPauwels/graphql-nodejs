import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import TodoType from './TodoType';
import {TodoDao} from '../db';
import {type Author} from '../models';

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    notes: {
      type: new GraphQLList(TodoType),
      resolve(author: Author) {
        return [];
      },
    },
  }),
});

export default AuthorType;
