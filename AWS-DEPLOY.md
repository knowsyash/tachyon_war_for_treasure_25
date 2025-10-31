# 🚀 AWS Deployment - Quick Start

## Prerequisites
- AWS EC2 Instance (Ubuntu 22.04, t3.medium)
- Security Group: Ports 22, 80, 443, 3001, 3002, 8080 open
- Your Neon PostgreSQL DATABASE_URL

## Deploy in 2 Commands

### 1. SSH into your EC2 instance
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
```

### 2. Run the setup script
```bash
curl -fsSL https://raw.githubusercontent.com/knowsyash/tachyon_war_for_treasure_25/main/setup-ec2.sh | bash
```

That's it! The script will:
- ✅ Install Docker & Docker Compose
- ✅ Clone the repository
- ✅ Ask for your DATABASE_URL
- ✅ Configure environment variables
- ✅ Build and start containers
- ✅ Show you the access URLs

## Access Your Application

- **Frontend**: `http://YOUR_EC2_IP:3001`
- **Backend**: `http://YOUR_EC2_IP:3002`
- **Health**: `http://YOUR_EC2_IP:3002/health`

## Common Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Update application
git pull origin main
docker-compose up -d --build
```

## Need Help?

Check `DEPLOYMENT.md` for detailed documentation.
