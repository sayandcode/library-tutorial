import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

const bookTable = sqliteTable('book', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  publishDate: text('publishDate').notNull(),
});

export default bookTable;
