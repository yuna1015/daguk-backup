import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | null = null;

function createDb(): Db {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return drizzle(client, { schema });
}

// Lazy singleton: constructing the libsql client eagerly throws when
// DATABASE_URL is missing, which would crash the whole serverless module
// at import time (breaking every route, including /api/health).
// Deferring construction to first use means only DB-dependent routes fail.
export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    if (!_db) _db = createDb();
    return Reflect.get(_db as object, prop, receiver);
  },
});
