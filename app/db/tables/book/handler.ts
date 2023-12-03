import { makeDb } from '~/db/setup';
import bookTable from './schema';

type Db = ReturnType<typeof makeDb>;

export class BookTableHandler {
  readonly db: Db;

  constructor(dbInstance?: Db) {
    this.db = dbInstance || makeDb();
  }

  async getAll() {
    return this.db.select({
      id: bookTable.id,
      title: bookTable.title,
      description: bookTable.description,
    }).from(bookTable);
  }
}
