const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Cloudflare preview process...');

try {
  // Step 1: Generate blog data
  console.log('📝 Step 1: Generating blog data...');
  execSync('node scripts/generate-blog-data.js', { stdio: 'inherit' });
  
  // Step 2: Run OpenNext build (it will handle the Next.js build internally)
  console.log('☁️ Step 2: Building with OpenNext...');
  execSync('npx opennextjs-cloudflare', { stdio: 'inherit' });
  
  // Step 3: Start Wrangler dev server
  console.log('🚀 Step 3: Starting Wrangler dev server...');
  execSync('npx wrangler dev', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Preview failed:', error.message);
  process.exit(1);
}
