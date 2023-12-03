import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/_schema.ts',
  out: './drizzle/migrations/sql',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'mySqlite.db',
  },
} satisfies Config;
