#!/bin/bash
# ──────────────────────────────────────────────────────────────────────
# Deploy Script for GoDaddy VPS
# Run this on your VPS after SSH-ing in
# ──────────────────────────────────────────────────────────────────────

set -e

echo "🚀 Data Analogy - Production Deployment"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ─── CONFIG ───────────────────────────────────────────────────────────
APP_DIR="/var/www/data-analogy"
REPO_URL="https://github.com/aryangupta0001/Data-Analogy.git"
BRANCH="main"
# ──────────────────────────────────────────────────────────────────────

# Step 1: Check system requirements
echo -e "${YELLOW}Step 1: Checking system requirements...${NC}"

command -v node >/dev/null 2>&1 || { echo -e "${RED}Node.js not found. Installing...${NC}"; curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}npm not found.${NC}"; exit 1; }

echo -e "${GREEN}✓ Node.js $(node -v) and npm $(npm -v) found${NC}"

# Step 2: Install PM2 globally
echo -e "${YELLOW}Step 2: Installing PM2...${NC}"
command -v pm2 >/dev/null 2>&1 || sudo npm install -g pm2
echo -e "${GREEN}✓ PM2 installed${NC}"

# Step 3: Install Nginx
echo -e "${YELLOW}Step 3: Installing Nginx...${NC}"
command -v nginx >/dev/null 2>&1 || sudo apt-get install -y nginx
echo -e "${GREEN}✓ Nginx installed${NC}"

# Step 4: Clone or update repository
echo -e "${YELLOW}Step 4: Setting up application...${NC}"
if [ -d "$APP_DIR" ]; then
    echo "Updating existing repository..."
    cd "$APP_DIR"
    git pull origin "$BRANCH"
else
    echo "Cloning repository..."
    sudo mkdir -p "$APP_DIR"
    sudo chown -R $USER:$USER "$APP_DIR"
    git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# Step 5: Switch to MongoDB schema for production
echo -e "${YELLOW}Step 5: Switching to MongoDB schema...${NC}"
if [ -f "prisma/schema.mongodb.prisma" ]; then
    cp prisma/schema.mongodb.prisma prisma/schema.prisma
    echo -e "${GREEN}✓ MongoDB schema activated${NC}"
else
    echo -e "${RED}⚠ MongoDB schema not found, using current schema${NC}"
fi

# Step 6: Install dependencies
echo -e "${YELLOW}Step 6: Installing dependencies...${NC}"
npm ci

# Step 7: Generate Prisma client
echo -e "${YELLOW}Step 7: Generating Prisma client...${NC}"
npx prisma generate

# Step 8: Build Next.js
echo -e "${YELLOW}Step 8: Building Next.js application...${NC}"
npm run build

# Step 9: Push database schema and seed
echo -e "${YELLOW}Step 9: Setting up database...${NC}"
if [ -n "$DATABASE_URL" ]; then
    npx prisma db push
    npx prisma db seed
    echo -e "${GREEN}✓ Database setup complete${NC}"
else
    echo -e "${RED}⚠ DATABASE_URL not set. Please set it in .env.production${NC}"
    echo "  Create .env.production with your MongoDB Atlas connection string"
    exit 1
fi

# Step 10: Start with PM2
echo -e "${YELLOW}Step 10: Starting application with PM2...${NC}"
pm2 delete data-analogy 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

# Step 11: Configure Nginx
echo -e "${YELLOW}Step 11: Configuring Nginx...${NC}"
sudo cp nginx.conf /etc/nginx/sites-available/data-analogy
sudo ln -sf /etc/nginx/sites-available/data-analogy /etc/nginx/sites-enabled/data-analogy
sudo nginx -t && sudo systemctl reload nginx

# Step 12: Setup SSL with Let's Encrypt
echo -e "${YELLOW}Step 12: SSL Setup${NC}"
echo -e "${YELLOW}Run this command to get free SSL certificate:${NC}"
echo "  sudo apt-get install certbot python3-certbot-nginx"
echo "  sudo certbot --nginx -d dataanalogy.com -d www.dataanalogy.com"

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "Your site should be live at: http://YOUR_VPS_IP"
echo ""
echo "Next steps:"
echo "  1. Point your GoDaddy domain DNS to this VPS IP"
echo "  2. Install SSL certificate (see command above)"
echo "  3. Visit your site!"
echo ""
echo "Useful commands:"
echo "  pm2 logs          → View application logs"
echo "  pm2 restart all   → Restart application"
echo "  pm2 monit         → Monitor application"
