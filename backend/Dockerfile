FROM node:21-alpine3.18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy prisma schema
COPY src/prisma ./src/prisma

# Generate Prisma Client
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Copy source code
COPY . .

# Build TypeScript
RUN npm install typescript @types/node --save-dev
RUN npx tsc

# Remove dev dependencies
RUN npm prune --production

# Expose ports
EXPOSE 3002
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD node -e "require('http').get('http://localhost:3002/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/index.js"]
