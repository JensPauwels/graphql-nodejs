import Database from './Database';
import Todo, {type ITodo} from '../models/Todo';

class TodoDao extends Database {
  addTodo = async (todo: Todo) => {
    const query = `
      INSERT INTO todo(id, author_id, content, checked, category_id)
      VALUES(?, ?, ?, ?, ?)
    `;

    await this.executeQuery(query, [
      todo.id,
      todo.authorID,
      todo.content,
      todo.checked,
      todo.categoryID,
    ]) as ITodo[];
  };

  deleteById = async (todo: Todo) => {
    const query = `
      DELETE FROM todo
      where id = ?
    `;

    await this.executeQuery(query, [todo.id]) as ITodo[];
  };

  getAll = async (authorID: string): Promise<Todo[]> => {
    const query = `
      SELECT id, author_id, content, checked, category_id
      FROM todo
      WHERE author_id = ?
    `;

    const todos = await this.executeQuery(query, [authorID]) as ITodo[];
    return todos.map(todo => new Todo(todo));
  };

  getAllByCategoryID = async (categoryID: string, authorID: string): Promise<Todo[]> => {
    const query = `
      SELECT id, author_id, content, checked, category_id
      FROM todo
      WHERE author_id = ? and category_id = ?
    `;

    const todos = await this.executeQuery(query, [authorID, categoryID]) as ITodo[];
    return todos.map(todo => new Todo(todo));
  };

  getById = async (todoID: string): Promise<Todo> => {
    const query = `
      SELECT id, author_id, content, checked, category_id
      FROM todo
      WHERE id = ?
    `;

    const todos = await this.executeQuery(query, [todoID]) as ITodo[];

    if (todos.length === 0) {
      throw new Error(`Failed to retrieve todo with id ${todoID}`);
    }

    return new Todo(todos[0]);
  };

  updateTodo = async (todo: Todo) => {
    const query = `
      UPDATE todo
      SET content = ?, checked = ?
      WHERE id = ?
    `;

    await this.executeQuery(query, [todo.content, todo.checked, todo.id]) as ITodo[];
  };
}

export default new TodoDao();
