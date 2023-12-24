import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const userTable = sqliteTable('user', {
  username: text('username').primaryKey(),
  passwordHash: text('passwordHash').notNull(),
  salt: text('salt').notNull(),
  isAdmin: integer('isAdmin', { mode: 'boolean' }).default(false),
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
});

export default userTable;
