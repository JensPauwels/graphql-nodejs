import { GraphQLList, GraphQLString } from 'graphql';
import { NoteType } from '../types'
import { NoteDao } from '../db/'

export const GET_ALL_NOTES = {
  description: 'List of all the notes',
  type: new GraphQLList(NoteType),
  resolve: () => {
    return NoteDao.notes;
  }
}

export const GET_NOTE_BY_ID = {
  description: 'A note by id',
  type: NoteType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (_: any, { id }: any) => {
    return NoteDao.notes.find(note => note.id === id);
  }
}
