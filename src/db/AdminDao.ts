import { ERROR } from '../error';
import { Admin } from '../models/';
import Database from './Database';

class AdminDao extends Database {
  exists = async (email: string): Promise<boolean> => {
    const query = `
      SELECT id, email, password 
      FROM admin
      WHERE email = ?
    `;

    const rows = await this.executeQuery(query, [email])
    return rows.length > 0
  };

  getByEmail = async (email: string): Promise<Admin> => {
    const query = `
      SELECT id, email, password 
      FROM admin
      WHERE email = ?
    `;

    const rows = await this.executeQuery(query, [email])

    if (rows.length === 0) {
      throw new Error(ERROR.MISSING_RESULT);
    }

    return new Admin(rows[0]);
  };

  insert = async (admin: Admin) => {
    const query = `
      INSERT INTO admin(id, email, password)
      VALUES(?, ?, ?)
    `;

    await this.executeQuery(query, [
      admin.id,
      admin.email,
      admin.password,
    ]);
  };
}

export default new AdminDao();
