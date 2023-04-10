import {v4 as uuid} from 'uuid';

export type ICategory = {
  id: string;
  author_id: string;
  name: string;
};

class Category {
	id: string;
	authorID: string;
  name: string;

	constructor(data?: Partial<ICategory>) {
		this.id = data?.id ?? uuid();
		this.authorID = data?.author_id ?? '';
		this.name = data?.name ?? '';
	}
}

export default Category;
