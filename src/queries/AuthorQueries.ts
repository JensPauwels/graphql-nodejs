import { GraphQLList } from 'graphql';
import { AuthorType } from '../types'
import { AuthorDao } from '../db/'

export const GET_ALL_AUTHORS = {
  description: 'List of all the authors',
  type: new GraphQLList(AuthorType),
  resolve: () => {
    return AuthorDao.authors;
  }
}
