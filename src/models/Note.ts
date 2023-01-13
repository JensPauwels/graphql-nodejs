import { uuid } from 'uuidv4';
import Author from './Author';

class Note {
  id: string;
  authorId: string;
  description: string;
  state: string;
  author: Author | undefined;

  constructor(authorId: string, description: string, state: string) {
    this.id = uuid();
    this.authorId = authorId;
    this.description = description;
    this.state = state;
    this.author = undefined;
  }

  setAuthor = (author: Author) => {
    this.author = author;
  };
}

export default Note;
