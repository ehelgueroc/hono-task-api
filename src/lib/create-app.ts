import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { pinoLoggerMiddleware } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false });
}

export default function createApp(): OpenAPIHono<AppBindings> {
  // extended hono that supports openapi
  const app = createRouter();
  app.use(serveEmojiFavicon("🔥"));
  app.use(pinoLoggerMiddleware());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
