import type { Config as DrizzleConfig } from 'drizzle-kit';

export default {
  schema: './drizzle/_schema.ts',
  out: './drizzle/migrations/sql',
  driver: 'better-sqlite',
} satisfies DrizzleConfig
