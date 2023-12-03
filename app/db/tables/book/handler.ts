import { makeDb } from '~/db/setup';
import bookTable from './schema';
import { like } from 'drizzle-orm';

type Db = ReturnType<typeof makeDb>;

export class BookTableHandler {
  readonly db: Db;

  constructor(dbInstance?: Db) {
    this.db = dbInstance || makeDb();
  }

  async getAll(
    { title = '' }:
    { title?: typeof bookTable.$inferSelect.title }
    = { title: '' },
  ) {
    return this
      .db
      .select({
        id: bookTable.id,
        title: bookTable.title,
        description: bookTable.description,
      })
      .from(bookTable)
      .where(like(bookTable.title, `%${title}%`));
  }
}
