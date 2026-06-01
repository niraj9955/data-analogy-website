#!/bin/bash
# ──────────────────────────────────────────────────────────────────────
# Image Download Script
# Ye script original GitHub repo se saari images download karega
# Run this AFTER cloning/extracting the project
# Usage: bash download-images.sh
# ──────────────────────────────────────────────────────────────────────

RAW="https://raw.githubusercontent.com/aryangupta0001/Data-Analogy/main"

echo "📸 Downloading images from GitHub repo..."
echo "========================================="

# Create directories
mkdir -p public/blogs
mkdir -p public/industries
mkdir -p public/pillars

# Blog images
echo "📥 Downloading blog images..."
blogs=(
  "analytics-business-workflows.png"
  "automation-data-migration.png"
  "clean-data-analytics.png"
  "data-accuracy-over-speed.png"
  "data-analytics-decisions.png"
  "data-centric-system-design.png"
  "data-governance-enterprises.png"
  "data-integration-challenges.png"
  "data-validation-sap-migration.png"
  "enterprise-documentation.png"
  "enterprise-scalability-challenges.png"
  "erp-customization-maintainability.png"
  "future-ready-enterprise-systems.png"
  "saas-observability.png"
  "sap-data-migration.png"
  "scalable-saas.png"
  "secure-enterprise-applications.png"
  "software-architecture-stability.png"
  "system-modernization-mistakes.png"
  "technical-debt-management.png"
)

for img in "${blogs[@]}"; do
  echo "  → $img"
  curl -sL "$RAW/public/blogs/$img" -o "public/blogs/$img" &
done
wait
echo "✅ Blog images done"

# Industry images
echo "📥 Downloading industry images..."
industries=(
  "Community Platforms.png"
  "Courier & Logistics.png"
  "E-commerce.png"
  "ERP Modules.png"
  "Education Portals.png"
  "Job Portals.png"
  "Local Listing.png"
  "Manufacturing.png"
  "Medical.png"
  "Multi-Service Platforms.png"
  "Online Dating.png"
  "Online Delivery.png"
  "Online KPO Platforms.png"
  "Professional Websites.png"
  "SaaS System.png"
  "School Learning Apps.png"
)

for img in "${industries[@]}"; do
  encoded=$(echo "$img" | sed 's/ /%20/g')
  echo "  → $img"
  curl -sL "$RAW/public/industries/$encoded" -o "public/industries/$img" &
done
wait
echo "✅ Industry images done"

# Pillar images
echo "📥 Downloading pillar images..."
pillars=(
  "precision-new.png"
  "velocity-new.png"
  "security-new.png"
  "scalability-new.png"
)

for img in "${pillars[@]}"; do
  echo "  → $img"
  curl -sL "$RAW/public/pillars/$img" -o "public/pillars/$img" &
done
wait
echo "✅ Pillar images done"

echo ""
echo "🎉 All images downloaded!"
echo "Total size:"
du -sh public/
