import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenApi } from "./types.js";

import packageJSON from "../../package.json" assert { type: "json" };

// configuration for openapi route
export default function configureOpenAPI(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
      description: "A simple API to manage tasks",
    },
  });
  // configure the UI for the openapi route
  app.get("/reference", apiReference({
    theme: "kepler",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    spec: {
      url: "/doc",
    },
  }));
}
