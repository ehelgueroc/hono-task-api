import type { AppRouteHandler } from "@/lib/types.js";

import db from "@/db/index.js";

import type { TasksRoutes } from "./tasks.routes.js";

export const list: AppRouteHandler<TasksRoutes> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};
