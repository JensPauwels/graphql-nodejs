import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import TodoType from './TodoType';
import type ContextType from '../types/ContextType';
import {TodoDao} from '../db';
import {type Category, type Todo} from '../models';

const CategoryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    todos: {
      type: new GraphQLList(TodoType),
      async resolve(category: Category, _: any, context: ContextType) {
        return TodoDao.getAllByCategoryID(category.id, context.token.authorID);
      },
    },
  }),
});

export default CategoryType;
