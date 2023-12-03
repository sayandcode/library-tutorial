import SqliteDatabase from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

let dbConn: SqliteDatabase.Database | undefined;

export function makeDb() {
  if (!dbConn) dbConn = new SqliteDatabase('mySqlite.db');
  const db = drizzle(dbConn);
  return db;
}
