import { makeDb } from '~/db/setup';
import bookTable from './schema';
import { eq, like } from 'drizzle-orm';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import type { ActionResult } from '~/lib/types/ActionResult';

type Db = ReturnType<typeof makeDb>;
type BookTableSelectType = typeof bookTable.$inferSelect;
type BookTableInsertType = typeof bookTable.$inferInsert;

type AddBookDesiredData = Omit<BookTableInsertType, 'id'>;

export class BookTableHandler {
  readonly db: Db;

  constructor(dbInstance?: Db) {
    this.db = dbInstance || makeDb();
  }

  getAll = async (
    { title = '' }:
    { title?: BookTableSelectType['title'] }
    = { title: '' },
  ): Promise<Omit<BookTableSelectType, 'publishDate'>[]> => {
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

  getById = async (bookId: string): Promise<BookTableSelectType> => {
    const result = await this
      .db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, bookId));
    return result[0];
  };

  async add(bookData: unknown): Promise<
    ActionResult<Pick<BookTableSelectType, 'id'>, z.ZodError<AddBookDesiredData>>
  > {
    const bookInsertSchema: z.ZodSchema<AddBookDesiredData> = z.object({
      title: z.string().min(1),
      description: z.string().nullable().optional(),
      publishDate: z.string()
        .refine(
          dateStr => new Date(dateStr).toString() !== 'Invalid Date',
          { message: 'Given string is not representative of a valid date' },
        )
        .transform(dateStr => new Date(dateStr).toISOString()),
    });
    const parseResult = bookInsertSchema.safeParse(bookData);
    if (!parseResult.success) {
      return { success: false, error: parseResult.error };
    }

    const bookId = await this.makeId();
    const preparedBookData = { id: bookId, ...parseResult.data };
    const result = await this
      .db
      .insert(bookTable)
      .values(preparedBookData)
      .returning({ id: bookTable.id });
    return { success: true, data: { id: result[0].id } };
  }

  // internal methods
  private async makeId() {
    let isBookIdNew = false;
    let bookId = uuidv4();
    while (!isBookIdNew) {
      const book = await this.getById(bookId);
      if (!book) isBookIdNew = true;
      else bookId = uuidv4();
    }
    return bookId;
  }
}
