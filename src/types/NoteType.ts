import {GraphQLObjectType, GraphQLString} from 'graphql';
import AuthorType from './AuthorType';
import {AuthorDao} from '../db';
import {Author, type Note} from '../models';

const NoteType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Note',
	fields: () => ({
		id: {type: GraphQLString},
		authorId: {type: GraphQLString},
		description: {type: GraphQLString},
		state: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(note: Note) {
				const author = new Author(note.authorId);
				AuthorDao.getById(author);
				return author;
			},
		},
	}),
});

export default NoteType;
