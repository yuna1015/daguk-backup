import app from "../src/api/index";

// Vercel's build-time type check for this /api file doesn't necessarily
// pick up @types/bun (this file isn't covered by this project's
// tsconfig.app.json/tsconfig.node.json references), so declare the global
// ourselves rather than depend on it — a missing ambient type here
// previously failed the build outright ("Cannot find name 'Bun'"), which
// left the deployed function broken.
declare const Bun: { serve: (options: { fetch: (request: Request) => Response | Promise<Response> }) => unknown };

// Vercel's Bun runtime (bunVersion in vercel.json) expects an /api file to
// call Bun.serve() itself during module startup — unlike the Node.js
// runtime, a bare `export default app` here just runs as a script with
// nothing keeping it alive, so Bun exits immediately and Vercel reports
// FUNCTION_INVOCATION_FAILED ("Bun process exited with exit status: 1")
// on every request. Calling Bun.serve() with the Hono app's fetch handler
// is the documented way to deploy an existing fetch-based server (Hono,
// Express, etc.) as a Vercel Function on the Bun runtime.
Bun.serve({
  fetch: app.fetch,
});
