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
//loon andmebaasiga ühenduse
const pool = MariaDBService.createPool({ //ühenduste võimalus kasutajate limiidiga; andmed, mida on ühenduseks vaja
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectionLimit: 5,
  bigIntAsNumber: true,
});

const DB = {
  query: async (sql: string, params?: Array<number | string>) => { //andmebaasist päringu funktsioon - päringu lause, päringu parameetrid - list ja nr või text
    let conn;
    try {
      conn = await pool.getConnection();//andmebaasiga ühendus
      return await conn.query(sql, params).finally(() => {}); //tagastab päringu tulemused, päring tehakse ühenduse sees
    } finally { //ootamisega funktsioon, lõpetab andmebaasi ühenduse
      if (conn) conn.release().finally(() => {}); // vabastab ühenduse
    }
  },
};

export default DB;
