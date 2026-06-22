const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Cloudflare Pages deployment process...');

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

  // Step 3: Deploy to Cloudflare Pages
  console.log('🚀 Step 3: Deploying to Cloudflare Pages...');
  execSync('npx wrangler pages deploy .open-next --project-name=portfolio --branch=main', { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
