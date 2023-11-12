import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import bookTable from "./schema";
import { z } from "zod";

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

type HandlerReturnType<D = any> = {success: true, data?: D} | {success: false, msg: string};

function insertBooks(db: BetterSQLite3Database, booksData: {}[]): HandlerReturnType {
  const booksArrParseResult = booksArrSchema.safeParse(booksData);
  if (!booksArrParseResult.success) {
    return { success: false, msg: booksArrParseResult.error.message }
  }
  const sqlResult = db.insert(bookTable).values(booksArrParseResult.data).run();
  console.log("Successfully added")
  return {success: true, data: sqlResult}
}

export {insertBooks}
