import mysql2 from 'mysql2';
import { ERROR } from '../error/';

const settings = process.env.MODE === 'DEVELOPMENT' 
  ? require('../../settings/development.json') 
  : require('../../settings/production.json');

class Database {
  pool: mysql2.Pool | undefined

  constructor() {
    this.pool = mysql2.createPool({
      host: settings.HOST,
      user: settings.DB_USER,
      password: settings.DB_PASSWORD,
      database: settings.DB,
      charset : 'utf8mb4'
    });
  }

  getConnection = (): Promise<mysql2.PoolConnection> => {
    return new Promise((resolve, reject) => {
      if (this.pool === undefined) {
        throw new Error(ERROR.DB_POOL_NOT_INSTANTIATED);
      }

      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        };

        resolve(connection);
      });
    });
  }

  executeQuery = (query: string, values: any[]): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const connection = await this.getConnection();

      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
          return
        }

        try {
          resolve(results);
        } catch (err) {
          reject(err);
        }

        connection.destroy();
      });
    });
  };
}

export default Database;


