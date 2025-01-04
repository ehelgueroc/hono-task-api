import type { AppOpenApi } from "./types.js";

import packageJSON from "../../package.json" assert { type: "json" };

export default function configureOpenAPI(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
      description: "A simple API to manage tasks",
    },
  });
}
