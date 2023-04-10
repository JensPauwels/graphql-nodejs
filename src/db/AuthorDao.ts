import Database from './Database';
import Author, {type IAuthor} from '../models/Author';

// Represents a fake authors database.
class AuthorDao extends Database {
	authors: Author[];

	constructor() {
    super();
		this.authors = [];
	}

	addAuthor = (t: Author) => {
		this.authors.push(t);
	};

	deleteById = (t: Author) => {
		this.authors = this.authors.filter(({id}) => t.id !== id);
	};

	getAll = () => this.authors;

	getById = async (authorID: string) => {
    const query = `
      SELECT id, email, name
      FROM admin
      WHERE id = ?
    `;

    const authors = await this.executeQuery(query, [authorID]) as IAuthor[];

    if (authors.length === 0) {
      throw new Error(`Failed to retrieve note with id ${authorID}`);
    }

    return new Author(authors[0]);
	};
}

export default new AuthorDao();
