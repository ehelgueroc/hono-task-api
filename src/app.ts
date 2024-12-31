import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";

import { pinoLoggerMiddleware } from "./middlewares/pino-logger.js";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

// extended hono that supports openapi
const app = new OpenAPIHono<AppBindings>();
app.use(pinoLoggerMiddleware());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export default app;
