import { pinoLogger } from "hono-pino";
import { pino } from "pino";
import pretty from "pino-pretty";

export function pinoLoggerMiddleware() {
  return pinoLogger({
    // pass pino instance to hono-pino to customize logger
    pino: pino({
      level: process.env.LOG_LEVEL || "info",
    }, process.env.NODE_ENV === "production" ? undefined : pretty()),
    http: {
      // make unique request id with uuid
      // useful for tracing requests across services
      reqId: () => crypto.randomUUID(),
    },
  });
}
