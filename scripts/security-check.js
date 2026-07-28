#!/usr/bin/env node

/**
 * Security Check Script
 * Runs security checks on the portfolio
 */

import fs from 'fs';
import path from 'path';

console.log('🔒 Running Security Checks...\n');

let passed = 0;
let failed = 0;

// Check 1: .env file not in git
console.log('1. Checking .env file protection...');
const gitignore = fs.readFileSync('.gitignore', 'utf8');
if (gitignore.includes('.env')) {
  console.log('   ✅ .env is in .gitignore');
  passed++;
} else {
  console.log('   ❌ .env is NOT in .gitignore - ADD IT!');
  failed++;
}

// Check 2: Security headers in vercel.json
console.log('\n2. Checking security headers...');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (vercelConfig.headers && vercelConfig.headers.length > 0) {
  console.log('   ✅ Security headers configured');
  passed++;
} else {
  console.log('   ❌ Security headers missing');
  failed++;
}

// Check 3: No sensitive data in code
console.log('\n3. Checking for exposed secrets...');
const portfolioData = fs.readFileSync('src/data/portfolio.ts', 'utf8');
const sensitivePatterns = [
  /password\s*=\s*['"][^'"]+['"]/i,
  /api[_-]?key\s*=\s*['"][^'"]+['"]/i,
  /secret\s*=\s*['"][^'"]+['"]/i,
];

let secretsFound = false;
sensitivePatterns.forEach(pattern => {
  if (pattern.test(portfolioData)) {
    secretsFound = true;
  }
});

if (!secretsFound) {
  console.log('   ✅ No exposed secrets found');
  passed++;
} else {
  console.log('   ⚠️  Potential secrets found - review code');
  failed++;
}

// Check 4: Dependencies
console.log('\n4. Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const totalDeps = Object.keys(packageJson.dependencies || {}).length + 
                  Object.keys(packageJson.devDependencies || {}).length;
console.log(`   ℹ️  Total dependencies: ${totalDeps}`);
console.log('   ⚠️  Run "npm audit" to check for vulnerabilities');

// Helper to search all headers in vercel.json
const allHeaders = (vercelConfig.headers || []).flatMap(route => route.headers || []);

// Check 5: HTTPS enforcement
console.log('\n5. Checking HTTPS enforcement...');
const hasHSTS = allHeaders.some(h => h.key === 'Strict-Transport-Security');
if (hasHSTS) {
  console.log('   ✅ HSTS header configured (HTTPS enforced)');
  passed++;
} else {
  console.log('   ❌ HSTS header missing');
  failed++;
}

// Check 6: CSP configured
console.log('\n6. Checking Content Security Policy...');
const hasCSP = allHeaders.some(h => h.key === 'Content-Security-Policy');
if (hasCSP) {
  console.log('   ✅ CSP configured');
  passed++;
} else {
  console.log('   ❌ CSP missing');
  failed++;
}

// Check 7: Backup workflow exists
console.log('\n7. Checking backup automation...');
const backupWorkflow = '.github/workflows/backup.yml';
if (fs.existsSync(backupWorkflow)) {
  console.log('   ✅ Backup workflow configured');
  passed++;
} else {
  console.log('   ❌ Backup workflow missing');
  failed++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Security Check Summary');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 All security checks passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some security checks failed. Please review and fix.');
  process.exit(1);
}
