import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// this is the config file for drizzle-kit
// https://github.com/drizzle-team/drizzle-kit
export default defineConfig({
  out: "./src/db/migrations", // migrations output directory
  schema: "./src/db/schema.ts", // schema source directory
  dialect: "sqlite",
  dbCredentials: {
    // eslint-disable-next-line node/no-process-env
    url: process.env.DATABASE_URL!,
  },
});
