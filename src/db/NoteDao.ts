import { Note } from '../models/';

// Represents a fake notes database.
class NoteDao {
  notes: Note[]

  constructor() {
    this.notes = [];

    this.addNote(new Note("54065fca-8040-4b5b-9bf9-e3d290da661d", "Mega note", "New"))
  }

  addNote = (t: Note) => {
    this.notes.push(t);
  };

  deleteById = (t: Note) => {
    this.notes = this.notes.filter(({ id }) => t.id !== id);
  };

  getAll = () => {
    return this.notes;
  };

  getById = (t: Note) => {
    const note = this.notes.find(({ id }) => t.id === id);

    if (note === undefined) {
      throw new Error(`Failed to retrieve note with id ${t.id}`)
    }

    return note;
  };
}

export default new NoteDao();
