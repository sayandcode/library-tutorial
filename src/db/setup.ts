import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";


function makeDb(){
  const db = new Database('mySqlite.db')
  console.log("Made new db")
  return drizzle(db);
}

export type DbQueryError = {code: string, message: string};
export default makeDb;
