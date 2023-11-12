import makeDb from "@/db/setup";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

(async ()=>{
  const db = makeDb();
  await migrate(db, {migrationsFolder: 'drizzle/migrations/sql'})
})()
