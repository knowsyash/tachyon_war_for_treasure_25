#!/bin/bash

# AWS EC2 Quick Setup Script for Treasure Hunt
# Run this on a fresh Ubuntu EC2 instance

set -e

echo "🚀 Starting AWS EC2 setup for Treasure Hunt..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
rm get-docker.sh

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo apt install docker-compose -y

# Install Git
echo "📥 Installing Git..."
sudo apt install git -y

# Clone repository
echo "📂 Cloning repository..."
cd ~
git clone https://github.com/knowsyash/tachyon_war_for_treasure_25.git
cd tachyon_war_for_treasure_25

# Prompt for environment variables
echo ""
echo "⚙️  Configuration needed:"
echo "================================"
read -p "Enter your Neon PostgreSQL DATABASE_URL: " DB_URL
read -p "Enter your EC2 Public IP: " EC2_IP

# Create backend .env
echo "📝 Creating backend .env file..."
cat > backend/.env << EOF
DATABASE_URL=$DB_URL
PORT=3002
NODE_ENV=production
EOF

# Create frontend .env.local
echo "📝 Creating frontend .env.local file..."
cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://$EC2_IP:3002
NEXT_PUBLIC_WS_URL=ws://$EC2_IP:8080
NODE_ENV=production
EOF

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 15

# Check status
echo "✅ Checking container status..."
docker-compose ps

# Get container logs
echo ""
echo "📋 Recent logs:"
docker-compose logs --tail=20

echo ""
echo "✨ Deployment complete!"
echo "================================"
echo "Frontend: http://$EC2_IP:3001"
echo "Backend:  http://$EC2_IP:3002"
echo "Health:   http://$EC2_IP:3002/health"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To restart:   docker-compose restart"
echo "To stop:      docker-compose down"
echo "================================"
