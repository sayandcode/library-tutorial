import { makeDb } from '~/db/setup';
import bookTable from './schema';
import { eq, like } from 'drizzle-orm';

type Db = ReturnType<typeof makeDb>;
type BookTableSelectResult = typeof bookTable.$inferSelect;

export class BookTableHandler {
  readonly db: Db;

  constructor(dbInstance?: Db) {
    this.db = dbInstance || makeDb();
  }

  getAll = async (
    { title = '' }:
    { title?: BookTableSelectResult['title'] }
    = { title: '' },
  ): Promise<Omit<BookTableSelectResult, 'publishDate'>[]> => {
    return this
      .db
      .select({
        id: bookTable.id,
        title: bookTable.title,
        description: bookTable.description,
      })
      .from(bookTable)
      .where(like(bookTable.title, `%${title}%`));
  };

  getById = async (bookId: string): Promise<BookTableSelectResult> => {
    const result = await this
      .db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, bookId));
    return result[0];
  };
}
