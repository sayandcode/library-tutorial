import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import bookTable from "./schema";
import { z } from "zod";
import { ErrorableAction } from "@/lib/types";
import { tryIt } from "@/lib/utils";

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

function insertBooks(db: BetterSQLite3Database, booksData: {}[]): ErrorableAction {
  const booksArrParseResult = booksArrSchema.safeParse(booksData);
  if (!booksArrParseResult.success) {
    return { success: false, msg: booksArrParseResult.error.message }
  }
  const sqlQueryAction = tryIt(() => db.insert(bookTable).values(booksArrParseResult.data).run())
  if (!sqlQueryAction.success) {
    console.log(sqlQueryAction.msg)
    const errMsg = getErrMsgFromQueryActionMsg(sqlQueryAction.msg)
    return { success: false, msg: errMsg }
  }
  return { success: true, data: sqlQueryAction.data }
}

function getErrMsgFromQueryActionMsg(msg:string): string{
  switch(msg){
    case '{"code":"SQLITE_CONSTRAINT_UNIQUE"}': return "A book with a same unique identifier exists";
    default: return "Something went wrong while adding that table to the database"
  }
}

export { insertBooks }
