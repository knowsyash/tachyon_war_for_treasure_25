#!/bin/bash

# Production Deployment Script
# Run this on your EC2 instance to deploy/update the application

set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code from repository..."
git pull origin main

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional, uncomment if needed)
# docker system prune -af

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check status
echo "✅ Checking container status..."
docker-compose ps

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=50

echo "✨ Deployment complete!"
echo "Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3001"
echo "Backend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3002"
