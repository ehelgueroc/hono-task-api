import type { AppRouteHandler } from "@/lib/types.js";

import type { TasksRoutes } from "./tasks.routes.js";

export const list: AppRouteHandler<TasksRoutes> = (c) => {
  return c.json([
    { name: "Task 1", done: false },
    { name: "Task 2", done: true },
    { name: "Task 3", done: false },
  ]);
};
