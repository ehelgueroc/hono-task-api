import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app.js";

// configure root route to return a message when / is requested
const router = createRouter()
  .openapi(createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    summary: "Get the index",
    description: "Get the index",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("Task API"), "Task API Index"),
    },
  }), c => c.json({ message: "Task API" }, HttpStatusCodes.OK));

export default router;
