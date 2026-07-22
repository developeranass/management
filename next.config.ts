import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a minimal, self-contained server build for Docker (.next/standalone).
  output: "standalone",
  // Prisma 7's client (wasm query compiler + generated files) isn't always picked up
  // by output file tracing — force-include it so the standalone image can run queries.
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/.prisma/client/**/*",
      "./node_modules/@prisma/client/**/*",
    ],
  },
};

export default nextConfig;
