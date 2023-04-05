import {v4 as uuid} from 'uuid';
import type Note from './Note';

class Author {
	id: string;
	name: string;
	notes: Note[];

	constructor(id?: string, name?: string) {
		this.id = id ?? uuid();
		this.name = name ?? '';
		this.notes = [];
	}
}

export default Author;
