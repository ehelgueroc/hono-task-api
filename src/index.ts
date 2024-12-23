import { serve } from "@hono/node-server";

import app from "./lib/app.js";

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
