import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, selectTasksSchema } from "@/db/schema.js";

const tags = ["Tasks"];
// create route for tasks
// It should handle GET requests to /tasks
// and respond with a list of tasks
export const list = createRoute({
  tags,
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

export const create = createRoute({
  tags,
  method: "post",
  request: {
    body: jsonContentRequired(insertTasksSchema, "The task to create"),
  },
  path: "/tasks",
  responses: {
    // define the response for a successful POST request
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "Created task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "The validation error(s)",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
