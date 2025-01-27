import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectTasksSchema } from "@/db/schema.js";

// create route for tasks
// It should handle GET requests to /tasks
// and respond with a list of tasks
export const list = createRoute({
  tags: ["Tasks"],
  method: "get",
  path: "/tasks",
  responses: {
    // define the response for a successful GET request
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "List of tasks",
    ),
  },
});

export type TasksRoutes = typeof list;
