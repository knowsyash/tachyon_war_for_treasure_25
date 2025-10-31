#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm install

echo "🗄️ Generating Prisma Client..."
npx prisma generate --schema=./src/prisma/schema.prisma

echo "🔨 Building TypeScript..."
npx tsc

echo "✅ Backend build complete!"
