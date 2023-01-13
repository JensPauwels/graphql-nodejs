import { uuid } from 'uuidv4';
import Note from './Note';

class Author {
  id: string;
  name: string;
  notes: Note[]

  constructor(id?: string, name?: string) {
    this.id = id ?? uuid();
    this.name = name ?? '';
    this.notes = []
  }
}

export default Author;
