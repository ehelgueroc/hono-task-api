import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

// get the env vars from the .env file
expand(config());

// define env schema to validate and coerce env vars
const EnvSchema = z.object({
  // transform to number the PORT env var value
  PORT: z.coerce.number().default(9999),
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "string",
      received: "undefined",
      message: "DATABASE_AUTH_TOKEN is required in production",
      path: ["DATABASE_AUTH_TOKEN"],
    });
  }
});

// generate type from env schema
export type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
// parse env vars and throw error if invalid
// eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
}
catch (e) {
  // return error if parsing fails
  const error = e as z.ZodError;
  console.error(`❌ Invalid environment variables:`);
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}
export default env;
