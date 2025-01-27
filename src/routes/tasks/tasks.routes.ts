import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

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
      z.array(z.object({
        name: z.string(),
        done: z.boolean(),
      },
      )),
      "List of tasks",
    ),
  },
});

export type TasksRoutes = typeof list;
