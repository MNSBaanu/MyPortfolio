#!/bin/bash

# Portfolio Backup Script
# Creates a local backup of your portfolio

DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="$HOME/portfolio-backups"
BACKUP_NAME="portfolio-backup-$DATE"

echo "🔄 Creating portfolio backup..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create backup
echo "📦 Archiving files..."
git archive --format=zip --output="$BACKUP_DIR/$BACKUP_NAME.zip" HEAD

# Backup assets separately
echo "🖼️  Backing up assets..."
cp -r public/assets "$BACKUP_DIR/$BACKUP_NAME-assets"

# Backup data file
echo "📄 Backing up portfolio data..."
cp src/data/portfolio.ts "$BACKUP_DIR/$BACKUP_NAME-data.ts"

# Backup environment (if exists)
if [ -f .env ]; then
  echo "🔐 Backing up environment variables..."
  cp .env "$BACKUP_DIR/$BACKUP_NAME.env"
fi

echo "✅ Backup complete!"
echo "📁 Location: $BACKUP_DIR/$BACKUP_NAME.zip"
echo ""
echo "Backup includes:"
echo "  - Source code archive"
echo "  - Assets folder"
echo "  - Portfolio data"
echo "  - Environment variables (if present)"
