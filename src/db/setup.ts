import Database from "better-sqlite3";
import type { Database as BetterSqlite3Database } from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

let db: BetterSqlite3Database | undefined;

function makeDb() {
  if(!db) db = new Database('mySqlite.db')
  return drizzle(db);
}

export type DbQueryError = { code: string, message: string };
export default makeDb;
