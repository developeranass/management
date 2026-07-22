import { defineConfig, env } from "@prisma/config";

// Prisma 7 no longer auto-loads .env — load it manually (Node 20.6+/24).
// In Docker the vars come from the container environment and there is no .env
// file, so ignore the "file not found" error in that case.
try {
  process.loadEnvFile();
} catch {
  // No .env file present — DATABASE_URL is expected to be set in the environment.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
