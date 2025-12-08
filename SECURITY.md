# Security & Backup Guide

## 🔒 Security Measures Implemented

### 1. Security Headers (vercel.json)

Your portfolio now has enterprise-grade security headers:

#### X-Content-Type-Options: nosniff
- Prevents MIME type sniffing attacks
- Browser won't guess file types

#### X-Frame-Options: DENY
- Prevents clickjacking attacks
- Portfolio can't be embedded in iframes
- Protects against UI redressing

#### X-XSS-Protection: 1; mode=block
- Enables browser's XSS filter
- Blocks detected XSS attacks

#### Referrer-Policy: strict-origin-when-cross-origin
- Controls referrer information
- Protects user privacy

#### Permissions-Policy
- Disables camera access
- Disables microphone access
- Disables geolocation
- Prevents unauthorized device access

#### Strict-Transport-Security (HSTS)
- Forces HTTPS connections
- Prevents downgrade attacks
- 2 years max-age
- Includes subdomains

#### Content-Security-Policy (CSP)
- Prevents XSS attacks
- Controls resource loading
- Allows only trusted sources:
  - Self (your domain)
  - Vercel Analytics
  - EmailJS API
  - Google Fonts
  - CDN for icons

### 2. Automated Backups

#### GitHub Actions Backup
- Runs every Sunday at midnight
- Creates backup branch with date
- Creates GitHub release
- Can be triggered manually

#### What's Backed Up
- ✅ All source code
- ✅ All images and assets
- ✅ Configuration files
- ✅ Documentation
- ✅ Git history

### 3. Data Protection

#### Environment Variables
- EmailJS credentials in `.env`
- Never committed to Git
- Stored securely in Vercel

#### .gitignore Protection
```
node_modules/
dist/
.env
.env.local
.DS_Store
```

## 🛡️ Protection Against

### Clickjacking
- ✅ X-Frame-Options: DENY
- Portfolio can't be embedded maliciously

### XSS (Cross-Site Scripting)
- ✅ Content-Security-Policy
- ✅ X-XSS-Protection
- Only trusted scripts allowed

### MIME Sniffing
- ✅ X-Content-Type-Options
- Files served with correct types

### Man-in-the-Middle
- ✅ HSTS (Strict-Transport-Security)
- Forces HTTPS always

### Data Loss
- ✅ Automated weekly backups
- ✅ Git version control
- ✅ Vercel deployment history

### Unauthorized Access
- ✅ Permissions-Policy
- No camera/mic/location access

## 📦 Backup Strategy

### Automatic Backups

#### Weekly Backups (GitHub Actions)
1. Every Sunday at 00:00 UTC
2. Creates dated backup branch
3. Creates GitHub release
4. Preserves full history

#### Manual Backup
```bash
# Trigger manual backup
gh workflow run backup.yml
```

### Local Backups

#### Create Local Backup
```bash
# Clone with full history
git clone --mirror https://github.com/MNSBaanu/MyPortfolio.git backup-$(date +%Y%m%d)

# Or create archive
git archive --format=zip --output=portfolio-backup-$(date +%Y%m%d).zip HEAD
```

#### Backup Important Files
```bash
# Backup assets
cp -r public/assets ~/backups/portfolio-assets-$(date +%Y%m%d)

# Backup data
cp src/data/portfolio.ts ~/backups/portfolio-data-$(date +%Y%m%d).ts

# Backup environment
cp .env ~/backups/.env-$(date +%Y%m%d)
```

### Vercel Backups

#### Deployment History
- Vercel keeps all deployments
- Can rollback anytime
- Access: Vercel Dashboard → Deployments

#### Download Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Download specific deployment
vercel pull
```

## 🔐 Best Practices

### 1. Keep Dependencies Updated
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

### 2. Secure Environment Variables
- Never commit `.env` files
- Use Vercel environment variables
- Rotate EmailJS keys periodically

### 3. Regular Backups
- ✅ Automated weekly (GitHub Actions)
- ✅ Before major changes (manual)
- ✅ Keep multiple versions
- ✅ Test restore process

### 4. Monitor Security
- Check GitHub security alerts
- Review Vercel logs
- Monitor npm audit reports

### 5. Access Control
- Use strong GitHub password
- Enable 2FA on GitHub
- Enable 2FA on Vercel
- Limit collaborator access

## 🚨 Emergency Recovery

### If Portfolio is Deleted

#### From GitHub
```bash
# Clone from backup branch
git clone -b backup-YYYY-MM-DD https://github.com/MNSBaanu/MyPortfolio.git

# Or restore from release
# Go to GitHub → Releases → Download backup
```

#### From Vercel
```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy from Git
vercel --prod
```

#### From Local Backup
```bash
# Restore from local backup
cd ~/backups/portfolio-backup-YYYYMMDD
git push origin main --force
```

### If Hacked or Compromised

1. **Immediate Actions:**
   ```bash
   # Change all passwords
   # Revoke all API keys
   # Check Vercel logs for suspicious activity
   ```

2. **Restore Clean Version:**
   ```bash
   # Restore from known good backup
   git reset --hard backup-YYYY-MM-DD
   git push origin main --force
   ```

3. **Update Security:**
   ```bash
   # Rotate all credentials
   # Update dependencies
   npm audit fix
   # Review security headers
   ```

## 📊 Security Checklist

### Initial Setup
- [x] Security headers configured
- [x] Automated backups enabled
- [x] .gitignore configured
- [x] Environment variables secured
- [x] HTTPS enforced

### Monthly Tasks
- [ ] Check for dependency updates
- [ ] Review npm audit report
- [ ] Verify backups are working
- [ ] Check GitHub security alerts
- [ ] Review Vercel logs

### Quarterly Tasks
- [ ] Rotate API keys
- [ ] Test backup restoration
- [ ] Review access permissions
- [ ] Update security documentation

## 🔍 Security Testing

### Test Security Headers
```bash
# Using curl
curl -I https://mnsbaanu-portfolio.vercel.app

# Using online tools
# https://securityheaders.com
# https://observatory.mozilla.org
```

### Test CSP
```bash
# Check browser console for CSP violations
# Should see no errors
```

### Test Backup Restoration
```bash
# Clone backup
git clone -b backup-YYYY-MM-DD repo-url test-restore

# Verify all files present
cd test-restore
npm install
npm run build
```

## 📞 Support

### If You Need Help
1. Check GitHub Issues
2. Review Vercel documentation
3. Contact Vercel support
4. Review security logs

### Report Security Issues
- Email: sbaanukghsbio21@gmail.com
- GitHub: Create private security advisory

## 🎯 Summary

Your portfolio is now protected with:
- ✅ Enterprise-grade security headers
- ✅ Automated weekly backups
- ✅ Multiple recovery options
- ✅ Protection against common attacks
- ✅ Secure credential management

**You won't lose your portfolio!** 🛡️
