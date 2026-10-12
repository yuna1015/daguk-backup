import { Hono } from 'hono';
import { cors } from "hono/cors"
import { inquiries } from "./routes/inquiries";

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }, 200))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))
  .route('/inquiries', inquiries);

export type AppType = typeof app;
export default app;
