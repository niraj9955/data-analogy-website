# 🚀 GoDaddy VPS Deploy Guide - Data Analogy Website

## Option 1: Vercel (FREE + GoDaddy Domain) ⭐ RECOMMENDED

**Sabse easy aur free method!** Vercel pe deploy karo, GoDaddy domain point karo.

### Step 1: Vercel pe deploy
```bash
# Vercel CLI install karo
npm install -g vercel

# Project folder mein jao
cd /path/to/data-analogy

# Deploy karo (pehli baar login mango)
vercel

# Production deploy
vercel --prod
```

### Step 2: MongoDB Atlas setup (FREE tier)
1. https://www.mongodb.com/atlas pe jao
2. Free account banao
3. "Build a Database" click karo → M0 FREE select karo
4. Cluster banne do (2-3 min)
5. Database Access → Add User → username/password set karo
6. Network Access → Add IP → "0.0.0.0/0" (allow all) ya "Add Current IP"
7. Database → Connect → Drivers → Connection string copy karo
8. Format: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/data-analogy?retryWrites=true&w=majority`

### Step 3: Vercel mein MongoDB URI add karo
```bash
# Vercel dashboard pe jao → Project → Settings → Environment Variables
# Add karo:
# DATABASE_URL = mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/data-analogy?retryWrites=true&w=majority
```

### Step 4: GoDaddy domain ko Vercel pe point karo
1. GoDaddy → DNS Management open karo
2. Add CNAME record:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
3. Add A record:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
4. Vercel Dashboard → Project → Settings → Domains → Add domain
5. `dataanalogy.com` aur `www.dataanalogy.com` dono add karo

### Step 5: Database seed karo
Vercel pe deploy ke baad `/api/init` endpoint hit karo browser mein:
```
https://your-app.vercel.app/api/init
```
Ye automatically database seed kar dega!

---

## Option 2: GoDaddy VPS (₹500-1000/month)

**Agar aapke paas GoDaddy VPS hai (shared hosting NAHI chalegi!)**

### VPS Requirements
- Minimum: 1GB RAM, 1 CPU, 20GB Storage
- Recommended: 2GB RAM, 2 CPU, 40GB Storage
- OS: Ubuntu 22.04 LTS

### Method A: Docker Deployment

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone project
git clone https://github.com/aryangupta0001/Data-Analogy.git
cd Data-Analogy

# Copy env file and edit
cp .env.production .env.production
nano .env.production
# → DATABASE_URL mein MongoDB Atlas URI paste karo

# Switch to MongoDB schema
cp prisma/schema.mongodb.prisma prisma/schema.prisma

# Build and start
docker compose up -d --build

# Seed database
docker compose exec app npx prisma db push
docker compose exec app npx prisma db seed

# Install SSL
apt-get install certbot
certbot certonly --standalone -d dataanalogy.com -d www.dataanalogy.com
# SSL certs /etc/letsencrypt/live/dataanalogy.com/ mein milenge
```

### Method B: PM2 + Nginx (Without Docker)

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Run deploy script
bash deploy.sh
```

---

## Option 3: GoDaddy Shared Hosting ❌ NOT POSSIBLE

**GoDaddy shared hosting pe Next.js NAHI chalta!** Ye sirf PHP/WordPress support karta hai.
Next.js ke liye Node.js chahiye jo shared hosting mein nahi hota.

**Alternatives:**
- GoDaddy VPS upgrade karo (₹500+/month)
- Ya Vercel use karo (FREE!) + GoDaddy sirf domain ke liye

---

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas account banao aur URI lo
- [ ] `.env.production` mein `DATABASE_URL` set karo
- [ ] MongoDB schema activate karo: `cp prisma/schema.mongodb.prisma prisma/schema.prisma`
- [ ] Build test karo: `npm run build`
- [ ] Database seed karo: `/api/init` endpoint hit karo
- [ ] Domain DNS set karo
- [ ] SSL certificate install karo

---

## ⚠️ Important Notes

1. **MongoDB Atlas FREE tier** mein 512MB storage milta hai - enough for this website
2. **Vercel FREE tier** mein 100GB bandwidth/month - enough for moderate traffic
3. **Admin Panel** ke liye authentication add karna padega production mein (currently open hai)
4. **Images** ke liye CDN ya S3 use karo - Vercel/Self-hosted pe public folder mein rakho
5. **Environment variables** hamesha secure rakho - .env file git mein commit mat karo

---

## 🔧 Post-Deployment

### Admin Panel access karo:
- Website pe jao
- Bottom-right mein Settings gear icon click karo
- Ya `Ctrl+Shift+A` press karo
- Sab content edit kar sakte ho live!

### Custom domain pe SSL:
```bash
# Vercel pe automatic SSL milta hai
# VPS pe Let's Encrypt use karo (free)
sudo certbot --nginx -d dataanalogy.com -d www.dataanalogy.com
```
