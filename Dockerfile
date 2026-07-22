# syntax=docker/dockerfile:1

# ---------- Base ----------
FROM node:24-alpine AS base
# libc6-compat is needed by some native modules (e.g. bcrypt) on Alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps
# Build toolchain for native modules (bcrypt is compiled via node-gyp).
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Builder ----------
# Full image with all deps + source. Used both to build the app and, in
# docker-compose, as the one-shot "migrate" service (it has the Prisma CLI).
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate the Prisma client before building.
RUN npx prisma generate
RUN npm run build

# ---------- Runner (production) ----------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy the standalone server output. It already bundles a minimal node_modules.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
