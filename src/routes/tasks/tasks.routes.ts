import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

export const list = createRoute({
  tags: ["Tasks"],
  method: "get",
  path: "/tasks",
  responses: {
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
