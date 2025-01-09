import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { pinoLoggerMiddleware } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types.js";

export function createRouter() {
  // extended hono that supports openapi
  // strict: false is to not differentiate endpoints finish with / and without
  // defaultHook is to add the default response for the openapi schema when there is an error
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp(): OpenAPIHono<AppBindings> {
  // create the app
  const app = createRouter();
  // add default response for when the favicon is requested
  app.use(serveEmojiFavicon("🔥"));
  // set pinoLogger as logger in API
  app.use(pinoLoggerMiddleware());

  // middleware for not found route
  app.notFound(notFound);
  // middleware for error handling
  app.onError(onError);

  return app;
}
