import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema.js";

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

export const patch = createRoute({
  tags,
  method: "patch",
  request: {
    body: jsonContentRequired(patchTasksSchema, "The task to update"),
    params: IdParamsSchema,
  },
  path: "/tasks/{id}",
  responses: {
    // define the response for a successful POST request
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "Updated task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        message: z.string(),
      }).openapi({
        example: {
          message: "Not found",
        },
      }),
      "Not found",
    ),
  },
});

export const getOne = createRoute({
  tags,
  method: "get",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    // define the response for a successful GET request
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "Get a tasks by id",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        message: z.string(),
      }).openapi({
        example: {
          message: "Not found",
        },
      }),
      "Not found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
