const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Cloudflare deployment process...');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Step 1: Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }
  if (fs.existsSync('.open-next')) {
    execSync('rm -rf .open-next', { stdio: 'inherit' });
  }

  // Step 2: Run OpenNext build (it handles the Next.js build internally)
  console.log('☁️ Step 2: Building with OpenNext...');
  execSync('npx opennextjs-cloudflare build', { stdio: 'inherit' });

  // Step 3: Deploy to Cloudflare
  console.log('🚀 Step 3: Deploying to Cloudflare...');
  execSync('npx wrangler deploy', { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
