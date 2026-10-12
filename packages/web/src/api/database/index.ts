import { drizzle } from "drizzle-orm/libsql";
// Use the "/web" build: the default "@libsql/client" entrypoint unconditionally
// imports the native sqlite3 binding (for local file:// DBs), which Vercel's
// serverless bundler fails to include and crashes the whole function on
// import alone (FUNCTION_INVOCATION_FAILED on every route, even /api/health).
// We only ever talk to a remote Turso DB over https/wss, so the lighter
// web client (fetch/WebSocket only, no native deps) is both correct and safe.
import { createClient } from "@libsql/client/web";
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
