import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import NoteType from './NoteType';
import { NoteDao } from '../dao';
import { type Author } from '../models';

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    notes: { 
      type: new GraphQLList(NoteType),
      resolve: (author: Author) => {
        return NoteDao.notes.filter(({ authorId }) => authorId === author.id)
      }
    },
  })
});

export default AuthorType;
