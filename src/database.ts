/*import mysql from "mysql2";
import config from "./apiConfig";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
}).promise();

export default pool;*/

import config from "./apiConfig";
import MariaDBService from "mariadb";

const pool = MariaDBService.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectionLimit: 5,
  bigIntAsNumber: true,
});

const DB = {
  query: async (sql: string, params?: Array<number | string>) => {
    let conn;
    try {
      conn = await pool.getConnection();
      return await conn.query(sql, params).finally(() => {});
    } finally {
      if (conn) conn.release().finally(() => {}); // release to pool
    }
  },
};

export default DB;
