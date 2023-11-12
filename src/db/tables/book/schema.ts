import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

const bookTable = sqliteTable('book', {
  id: integer('id').primaryKey(),
  title: text('title').notNull().unique(),
  description: text('description'),
  publishDate: text('publishDate').notNull(),
})

export default bookTable;
