import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app.js";

const router = createRouter()
  .openapi(createRoute({
    method: "get",
    path: "/",
    summary: "Get the index",
    description: "Get the index",
    responses: {
      200: {
        description: "Task API index",
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }), c => c.json({ message: "Task API" }));

export default router;
