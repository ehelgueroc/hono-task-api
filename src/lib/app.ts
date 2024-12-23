import { OpenAPIHono } from "@hono/zod-openapi";

// extended hono that supports openapi
const app = new OpenAPIHono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
