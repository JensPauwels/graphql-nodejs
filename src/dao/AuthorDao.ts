import { Author } from '../models/';

// Represents a fake authors database.
class AuthorDao {
  authors: Author[]

  constructor() {
    this.authors = [];
  }

  addAuthor = (t: Author) => {
    this.authors.push(t);
  };

  deleteById = (t: Author) => {
    this.authors = this.authors.filter(({ id }) => t.id !== id);
  };

  getAll = () => {
    return this.authors;
  };

  getById = (t: Author) => {
    const author = this.authors.find(({ id }) => t.id === id);

    if (author === undefined) {
      throw new Error(`Failed to retrieve author with id ${t.id}`)
    }

    return author;
  };
}

export default new AuthorDao();
