# Production Deployment Guide

## Prerequisites
- AWS Account
- Domain name (optional)
- Docker installed locally
- Git repository access

## Deployment Options

### Option 1: AWS EC2 with Docker (Recommended)

#### Step 1: Launch EC2 Instance
1. Go to AWS EC2 Console
2. Launch Instance:
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: t3.medium (minimum for production)
   - **Storage**: 20 GB GP3
   - **Security Group**: Create with these inbound rules:
     - SSH (22) - Your IP
     - HTTP (80) - 0.0.0.0/0
     - HTTPS (443) - 0.0.0.0/0
     - Custom TCP (3001) - 0.0.0.0/0 (Frontend)
     - Custom TCP (3002) - 0.0.0.0/0 (Backend API)
     - Custom TCP (8080) - 0.0.0.0/0 (WebSocket)

#### Step 2: Connect to EC2 and Install Docker
```bash
# SSH into your instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add user to docker group
sudo usermod -aG docker ubuntu
newgrp docker

# Install Git
sudo apt install git -y
```

#### Step 3: Clone and Configure Application
```bash
# Clone repository
git clone https://github.com/knowsyash/tachyon_war_for_treasure_25.git
cd tachyon_war_for_treasure_25

# Create backend .env file
cd backend
nano .env
```

Add your environment variables:
```
DATABASE_URL=your_neon_postgresql_url
PORT=3002
NODE_ENV=production
```

```bash
# Create frontend .env.local file
cd ../frontend
nano .env.local
```

Add frontend environment variables:
```
NEXT_PUBLIC_API_URL=http://your-ec2-ip:3002
NEXT_PUBLIC_WS_URL=ws://your-ec2-ip:8080
```

#### Step 4: Deploy with Docker Compose
```bash
# Return to root directory
cd ..

# Build and start containers
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### Step 5: Set Up Nginx as Reverse Proxy (Optional but Recommended)
```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/treasure-hunt
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3002/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # WebSocket
    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/treasure-hunt /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 6: Set Up SSL with Let's Encrypt (Production Must-Have)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
```

---

### Option 2: AWS Elastic Beanstalk

#### Step 1: Install EB CLI
```bash
pip install awsebcli --upgrade --user
```

#### Step 2: Initialize Elastic Beanstalk
```bash
cd backend
eb init -p docker treasure-hunt-backend

cd ../frontend
eb init -p docker treasure-hunt-frontend
```

#### Step 3: Deploy
```bash
# Deploy backend
cd backend
eb create treasure-hunt-backend-env
eb deploy

# Deploy frontend
cd ../frontend
eb create treasure-hunt-frontend-env
eb deploy
```

---

### Option 3: AWS ECS with Fargate (Fully Managed)

See separate ECS deployment guide.

---

## Monitoring and Maintenance

### View Logs
```bash
# Docker Compose
docker-compose logs -f backend
docker-compose logs -f frontend

# Individual containers
docker logs -f treasure-hunt-backend
docker logs -f treasure-hunt-frontend
```

### Restart Services
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Backup Database
Your Neon PostgreSQL database has automatic backups. To create manual backup:
- Go to Neon dashboard
- Select your project
- Create backup

---

## Cost Estimation (AWS Monthly)

### Minimal Setup
- EC2 t3.medium: ~$30/month
- Elastic IP: $0 (while attached)
- Data Transfer: ~$1-5/month
- **Total: ~$35-40/month**

### Production Setup with Load Balancer
- EC2 t3.medium x 2: ~$60/month
- Application Load Balancer: ~$23/month
- Data Transfer: ~$5-10/month
- Route 53: ~$1/month
- **Total: ~$90-100/month**

### Neon PostgreSQL
- Free tier: 0.5 GB storage, 1 project
- Pro tier: $19/month (3 GB storage)

---

## Security Checklist

- [ ] Environment variables not in Git
- [ ] Security groups properly configured
- [ ] SSH key secured
- [ ] SSL/TLS enabled
- [ ] Database credentials secure
- [ ] Regular security updates
- [ ] Monitoring and logging enabled
- [ ] Backup strategy in place

---

## Troubleshooting

### Container won't start
```bash
docker-compose logs backend
docker-compose logs frontend
```

### Port already in use
```bash
sudo lsof -i :3002
sudo lsof -i :3001
sudo kill -9 <PID>
```

### Database connection issues
- Check DATABASE_URL in .env
- Verify Neon database is accessible
- Check security group rules

---

## Next Steps After Deployment

1. Set up monitoring (CloudWatch, Datadog)
2. Configure automated backups
3. Set up CI/CD pipeline (GitHub Actions)
4. Configure auto-scaling (if needed)
5. Set up logging aggregation
6. Configure alerting for errors

---

For questions or issues, refer to the main README.md or create an issue in the repository.
