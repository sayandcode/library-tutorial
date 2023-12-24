import crypto from 'node:crypto';
import { z } from 'zod';
import { makeDb } from '~/db/setup';
import type { ActionResult } from '~/lib/types';
import userTable from './schema';

type Db = ReturnType<typeof makeDb>;
type RequiredInputForCreate = { username: string, password: string };

export class UserTableHandler {
  readonly db: Db;

  constructor(dbInstance?: Db) {
    this.db = dbInstance || makeDb();
  }

  async create(inputs: Record<keyof RequiredInputForCreate, unknown>):
  Promise<ActionResult<Pick<RequiredInputForCreate, 'username'>, z.ZodError<RequiredInputForCreate>>> {
    const userInsertSchema = z.object({ username: z.string().min(4),
      password: z.string().refine(
        val => val.length >= 8,
        { message: 'Password must be at least 8 characters long' }) });
    const inputsParseResult = userInsertSchema.safeParse(inputs);
    if (!inputsParseResult.success) {
      return { success: false, error: inputsParseResult.error };
    }

    const { username, password } = inputsParseResult.data;
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'SHA-512').toString('hex');
    await this.db.insert(userTable).values({
      username, passwordHash, salt,
    });
    return { success: true, data: { username } };
  }
}
