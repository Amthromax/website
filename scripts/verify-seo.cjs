const fs = require('fs');
const path = require('path');

function runSeoAudit() {
  console.log('--- STARTING AMTHROMAX TECHNICAL SEO AUDIT ---');
  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passCount++;
    } else {
      console.error(`[FAIL] ${message}`);
      failCount++;
    }
  }

  // 1. Verify index.html
  const indexPath = path.join(__dirname, '../index.html');
  assert(fs.existsSync(indexPath), 'index.html exists');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  assert(indexContent.includes('<title>Amthromax — Enterprise AI Software &amp; Intelligent Technology</title>'), 'index.html has title tag');
  assert(indexContent.includes('rel="canonical" href="https://amthromax.com/"'), 'index.html has canonical link');
  assert(indexContent.includes('rel="manifest" href="/manifest.json"'), 'index.html has manifest link');
  assert(indexContent.includes('rel="apple-touch-icon" href="/images/logo.png"'), 'index.html has apple-touch-icon link');
  assert(indexContent.includes('https://amthromax.com/#organization'), 'index.html includes Organization @id schema');
  assert(indexContent.includes('https://amthromax.com/#website'), 'index.html includes WebSite @id schema');
  assert(indexContent.includes('https://amthromax.com/#webpage'), 'index.html includes WebPage @id schema');

  // 2. Check for placeholder strings
  const forbiddenPlaceholders = ['localhost', 'TODO', 'example.com', 'BING_VALIDATION_CODE_PLACEHOLDER'];
  forbiddenPlaceholders.forEach(ph => {
    assert(!indexContent.includes(ph), `index.html does not contain placeholder "${ph}"`);
  });

  // 3. Verify public/manifest.json
  const manifestPath = path.join(__dirname, '../public/manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json exists');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(manifest.short_name === 'Amthromax', 'manifest.json short_name is Amthromax');
  }

  // 4. Verify public/robots.txt
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  assert(fs.existsSync(robotsPath), 'robots.txt exists');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  assert(robotsContent.includes('Sitemap: https://amthromax.com/sitemap.xml'), 'robots.txt points to sitemap.xml');

  // 5. Verify public/sitemap.xml
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'sitemap.xml exists');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  assert(sitemapContent.includes('https://amthromax.com/about'), 'sitemap includes /about');
  assert(sitemapContent.includes('https://amthromax.com/products/ai-platform'), 'sitemap includes /products/ai-platform');
  assert(sitemapContent.includes('https://amthromax.com/products/ai-agents'), 'sitemap includes /products/ai-agents');
  assert(sitemapContent.includes('https://amthromax.com/docs/getting-started'), 'sitemap includes /docs/getting-started');

  // 6. Verify company config
  const companyConfigPath = path.join(__dirname, '../src/config/company.ts');
  assert(fs.existsSync(companyConfigPath), 'company.ts config exists');

  console.log('--------------------------------------------------');
  console.log(`SEO Audit Complete: ${passCount} PASSED, ${failCount} FAILED.`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runSeoAudit();
