// /configs/database.ts
import mysql from "mysql2/promise";

// ✅ Use a global variable to store the pool during development
declare global {
  var mysqlPool: ReturnType<typeof mysql.createPool> | undefined;
}

const createPool = () =>
  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "edepcheckdb",
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0,
  });


export const pool = global.mysqlPool ?? createPool();

if (process.env.NODE_ENV !== "production") global.mysqlPool = pool;
