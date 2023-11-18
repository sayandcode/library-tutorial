import bookTable, { BookTableItem } from "./schema";
import { z } from "zod";
import { ErrorableAction } from "@/lib/types";
import { tryItAsync } from "@/lib/utils";
import makeDb, { DbActionError } from "@/db/setup";
import { RunResult } from "better-sqlite3";
import { eq, inArray } from "drizzle-orm";

const bookSchema: z.ZodType<typeof bookTable.$inferInsert> = z.object({
  title: z.string().min(2, { message: "Book must have at least a two-character title" }),
  description: z.string().optional(),
  publishDate: z.string().datetime({ offset: true }).refine(dateStrVal => {
    const isDateInPast = new Date(dateStrVal).getTime() < new Date().getTime();
    const isStrValid = isDateInPast;
    return isStrValid;
  }, 'Date cannot be in future')
})

const booksArrSchema = z.array(bookSchema)

type Db = ReturnType<typeof makeDb>;

async function insertBooks(db: Db, booksData: {}[]): Promise<ErrorableAction<RunResult, z.ZodIssue[]>> {
  const booksArrParseResult = booksArrSchema.safeParse(booksData);
  if (!booksArrParseResult.success) {
    console.log(booksArrParseResult.error.errors)
    return { success: false, err: booksArrParseResult.error.errors }
  }

  const dbAction = await tryItAsync<RunResult, DbActionError>(() => db.insert(bookTable).values(booksArrParseResult.data))
  if (!dbAction.success) {
    const err = mapDbErrorToZodIssueArr(dbAction.err);
    return { success: false, err }
  }

  return { success: true, data: dbAction.data }
}

async function getBooks(db: Db, ids?: BookTableItem['id'][]): Promise<ErrorableAction<BookTableItem[], DbActionError>> {
  return tryItAsync<BookTableItem[], DbActionError>(
    () => {
      const baseQuery = db.select().from(bookTable).$dynamic();
      if(ids) return baseQuery.where(inArray(bookTable.id, ids));
      return baseQuery
    }
  );
}

async function deleteBook(db: Db, bookId: number) {
  return tryItAsync(
    () => db.delete(bookTable).where(eq(bookTable.id, bookId))
  );
}

function mapDbErrorToZodIssueArr(err: DbActionError): z.ZodIssue[] {
  switch (err.code) {
    case 'SQLITE_CONSTRAINT_UNIQUE':
      const duplicatedFieldName = err.message.match(/failed: book\.(\w+)/)?.[1]
      if (!duplicatedFieldName) throw new Error('Table returned unique constraint error without specifying which field was duplicated')
      return [{ code: 'custom', path: [0, duplicatedFieldName], message: 'Another entry exists with the same value for this field. This field should be unique between entries' }]

    default:
      throw new Error('Something went wrong when interacting with the database')
  }
}

export { insertBooks, getBooks, deleteBook }
