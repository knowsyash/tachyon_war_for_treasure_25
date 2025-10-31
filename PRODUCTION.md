# 🏴‍☠️ Treasure Hunt - Production Setup Guide

## Quick Start for Production Deployment

### Prerequisites
✅ AWS Account  
✅ Neon PostgreSQL Database (already configured)  
✅ Domain name (optional, but recommended)  
✅ Basic knowledge of Linux commands

---

## 🚀 Fastest Deployment (15 minutes)

### 1. Launch EC2 Instance
```bash
# Instance specs:
- Ubuntu 22.04 LTS
- t3.medium (2 vCPU, 4 GB RAM)
- 20 GB storage
- Security groups: SSH (22), HTTP (80), HTTPS (443), 3001, 3002, 8080
```

### 2. Connect and Install Dependencies
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# One-command setup
curl -fsSL https://get.docker.com | sh && \
sudo apt install docker-compose git -y && \
sudo usermod -aG docker ubuntu && \
newgrp docker
```

### 3. Deploy Application
```bash
# Clone repository
git clone https://github.com/knowsyash/tachyon_war_for_treasure_25.git
cd tachyon_war_for_treasure_25

# Configure environment variables
nano backend/.env
# Add: DATABASE_URL=your_neon_url

nano frontend/.env.local
# Add: NEXT_PUBLIC_API_URL=http://YOUR_EC2_IP:3002
#      NEXT_PUBLIC_WS_URL=ws://YOUR_EC2_IP:8080

# Deploy!
docker-compose up -d --build

# Check status
docker-compose ps
```

### 4. Access Your Application
- **Frontend**: http://YOUR_EC2_IP:3001
- **Backend API**: http://YOUR_EC2_IP:3002
- **WebSocket**: ws://YOUR_EC2_IP:8080

---

## 🔧 Production Enhancements

### Add SSL/TLS (Recommended)
```bash
sudo apt install nginx certbot python3-certbot-nginx -y

# Configure Nginx (see DEPLOYMENT.md for full config)
sudo nano /etc/nginx/sites-available/treasure-hunt

# Get free SSL certificate
sudo certbot --nginx -d your-domain.com
```

### Enable Auto-Deploy on Git Push
1. Add EC2_SSH_KEY and EC2_HOST to GitHub Secrets
2. GitHub Actions will auto-deploy on push to main

---

## 📊 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Check Health
```bash
curl http://localhost:3002/health
```

---

## 🔄 Update Application
```bash
cd ~/tachyon_war_for_treasure_25
./deploy.sh
```

---

## 💰 Cost Estimate
- **Development**: ~$35/month (t3.medium)
- **Production**: ~$90/month (with load balancer, auto-scaling)
- **Database**: Free tier or $19/month (Neon Pro)

---

## 🆘 Troubleshooting

### Containers won't start
```bash
docker-compose logs
```

### Port conflicts
```bash
sudo lsof -i :3002
sudo kill -9 <PID>
```

### Database connection failed
- Check DATABASE_URL in backend/.env
- Verify Neon database IP whitelist (allow all: 0.0.0.0/0)

---

## 📚 Full Documentation
- [Complete Deployment Guide](./DEPLOYMENT.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [API Documentation](./API.md)

---

## 🎯 Next Steps
1. ✅ Deploy application
2. ⚡ Set up SSL/TLS
3. 📊 Configure monitoring
4. 🔄 Set up CI/CD
5. 🔐 Harden security
6. 📈 Enable auto-scaling (if needed)

---

**Need help?** Create an issue in the repository or contact the team.
