# Development image
FROM oven/bun:1 as development

WORKDIR /app

# Copy package files
COPY package.json .
COPY bun.lockb .

# Install dependencies
RUN bun install

# Copy the Prisma schema into the image
COPY prisma ./prisma

# Generate Prisma Client
RUN bunx prisma generate

# Start development server
CMD ["bun", "run", "dev"]

# Production build stage
FROM oven/bun:1 as builder

WORKDIR /app

# Copy package files first
COPY package.json bun.lockb ./

# Fresh install of all dependencies for Linux
RUN bun install --frozen-lockfile

# Copy prisma and generate client
COPY prisma ./prisma
RUN bunx prisma generate

# Copy source files
COPY . .

# Build the application
RUN bun run build

# Production image
FROM oven/bun:1-slim as production

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Fresh install of production dependencies for Linux
RUN bun install --production --frozen-lockfile

# Copy build output and generate fresh Prisma client
COPY prisma ./prisma
RUN bunx prisma generate

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Set necessary environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# Start the production server with explicit host and port
CMD ["bunx", "--bun", "next", "start", "-H", "0.0.0.0", "-p", "3000"]