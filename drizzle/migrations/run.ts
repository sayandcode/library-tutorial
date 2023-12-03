import { makeDb } from '~/db/setup';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const db = makeDb();
migrate(db, { migrationsFolder: 'drizzle/migrations/sql' });
