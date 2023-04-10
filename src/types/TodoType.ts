import {GraphQLBoolean, GraphQLObjectType, GraphQLString} from 'graphql';

const TodoType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: {type: GraphQLString},
    authorID: {type: GraphQLString},
    content: {type: GraphQLString},
    checked: {type: GraphQLBoolean},
    category_id: {type: GraphQLString},
  }),
});

export default TodoType;
