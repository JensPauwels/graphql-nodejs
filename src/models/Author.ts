import {v4 as uuid} from 'uuid';
import type Todo from './Todo';

export type IAuthor = {
  id: string;
  name: string;
  email: string;
};

class Author {
	id: string;
	name: string;
  email: string;
	todos: Todo[];

	constructor(data?: IAuthor) {
		this.id = data?.id ?? uuid();
		this.name = data?.name ?? '';
    this.email = data?.email ?? '';
		this.todos = [];
	}
}

export default Author;
