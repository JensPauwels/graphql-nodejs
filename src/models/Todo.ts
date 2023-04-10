import {v4 as uuid} from 'uuid';

export type ITodo = {
  id: string;
  author_id: string;
  content: string;
  checked: boolean;
  category_id: string;
};

class Todo {
	id: string;
	authorID: string;
  content: string;
  checked: boolean;
  categoryID: string;

	constructor(data?: Partial<ITodo>) {
		this.id = data?.id ?? uuid();
		this.authorID = data?.author_id ?? '';
		this.content = data?.content ?? '';
    this.checked = data?.checked ?? false;
    this.categoryID = data?.category_id ?? '';
	}
}

export default Todo;
