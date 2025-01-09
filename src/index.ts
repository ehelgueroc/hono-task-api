import { serve } from "@hono/node-server";

// this is where we define the core functionality of our app
import app from "./app.js";
// this is where we define and load the environment variables
// all the env vars are validated by Zod
import env from "./env.js";

// this is the port
const port = env.PORT;
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);

// we server the app
serve({
  fetch: app.fetch,
  port,
});
