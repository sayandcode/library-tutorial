import bookTable from "./schema";
import { z } from "zod";
import { ErrorableAction } from "@/lib/types";
import { tryIt } from "@/lib/utils";
import makeDb, { DbQueryError } from "@/db/setup";
import { RunResult } from "better-sqlite3";

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

function insertBooks(db: ReturnType<typeof makeDb>, booksData: {}[]): ErrorableAction<any, z.ZodIssue[]> {
  const booksArrParseResult = booksArrSchema.safeParse(booksData);
  if (!booksArrParseResult.success) {
    console.log(booksArrParseResult.error.errors)
    return { success: false, err: booksArrParseResult.error.errors }
  }
  const sqlQueryAction: ErrorableAction<RunResult, DbQueryError> = tryIt(() => db.insert(bookTable).values(booksArrParseResult.data).run())
  if (!sqlQueryAction.success) {
    const err = mapDbQueryErrorToZodIssueArr(sqlQueryAction.err);
    return { success: false, err }
  }
  return { success: true, data: sqlQueryAction.data }
}

function mapDbQueryErrorToZodIssueArr(err: DbQueryError): z.ZodIssue[] {
  switch (err.code) {
    case 'SQLITE_CONSTRAINT_UNIQUE':
      const duplicatedFieldName = err.message.match(/failed: book\.(\w+)/)?.[1]
      if (!duplicatedFieldName) throw new Error('Table returned unique constraint error without specifying which field was duplicated')
      return [{code:'custom', path: [0, duplicatedFieldName], message: 'Another entry exists with the same value for this field. This field should be unique between entries'}]

    default:
      throw new Error('Table returned unique constraint error without specifying which field was duplicated')
  }
}

export { insertBooks }
