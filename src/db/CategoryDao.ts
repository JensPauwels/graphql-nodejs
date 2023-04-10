import Database from './Database';
import Category, {type ICategory} from '../models/Category';

class CategoryDao extends Database {
  addCategory = async (category: Category) => {
    const query = `
      INSERT INTO category(id, name, author_id)
      VALUES(?, ?, ?)
    `;

    await this.executeQuery(query, [
      category.id,
      category.name,
      category.authorID,
    ]) as ICategory[];
  };

  deleteById = async (category: Category) => {
    const query = `
      DELETE FROM category
      where id = ?
    `;

    await this.executeQuery(query, [category.id]) as ICategory[];
  };

  getAll = async (authorID: string): Promise<Category[]> => {
    const query = `
      SELECT id, name, author_id
      FROM category
      WHERE author_id = ?
    `;

    const categorys = await this.executeQuery(query, [authorID]) as ICategory[];
    return categorys.map(category => new Category(category));
  };

  getById = async (category: Category) => {
    const query = `
      SELECT id, author_id, name
      FROM category
      WHERE id = ? AND author_id = ?
    `;

    const categorys = await this.executeQuery(query, [category.id, category.authorID]) as ICategory[];

    if (categorys.length === 0) {
      throw new Error(`Failed to retrieve category with id ${category.id}`);
    }

    const {name} = categorys[0];
    category.name = name;
  };

  updateCategory = async (category: Category) => {
    const query = `
      UPDATE category
      SET name = ?
      WHERE id = ? AND author_id ?
    `;

    await this.executeQuery(query, [category.name, category.id, category.authorID]) as ICategory[];
  };
}

export default new CategoryDao();
