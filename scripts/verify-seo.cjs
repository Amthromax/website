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

  assert(indexContent.includes('<title>Amthromax — Artificial Intelligence Company</title>'), 'index.html has title tag');
  assert(indexContent.includes('rel="canonical" href="https://amthromax.com/"'), 'index.html has canonical link');
  assert(indexContent.includes('rel="manifest" href="/manifest.json"'), 'index.html has manifest link');
  assert(indexContent.includes('rel="apple-touch-icon" href="/apple-touch-icon.png"'), 'index.html has apple-touch-icon link');
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

  // 6. Entity identity: exactly one canonical Organization / WebSite declaration
  const ldBlocks = indexContent.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  assert(ldBlocks.length === 1, 'index.html declares exactly one JSON-LD block');
  let graph = [];
  try {
    const raw = ldBlocks[0].replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    graph = JSON.parse(raw)['@graph'] || [];
    assert(true, 'index.html JSON-LD parses as valid JSON');
  } catch (e) {
    assert(false, `index.html JSON-LD parses as valid JSON (${e.message})`);
  }
  const countType = (t) => graph.filter((n) => n['@type'] === t).length;
  assert(countType('Organization') === 1, 'exactly one Organization entity in the canonical graph');
  assert(countType('WebSite') === 1, 'exactly one WebSite entity in the canonical graph');
  const org = graph.find((n) => n['@type'] === 'Organization') || {};
  const site = graph.find((n) => n['@type'] === 'WebSite') || {};
  assert(org['@id'] === 'https://amthromax.com/#organization', 'Organization @id is canonical');
  assert(org.name === 'Amthromax', 'Organization name is Amthromax');
  assert(org.logo && org.logo['@id'] === 'https://amthromax.com/#logo', 'Organization logo has canonical @id');
  assert(org.logo && org.logo.url === 'https://amthromax.com/images/logo.png', 'Organization logo URL is canonical');
  assert(org.logo && org.logo.caption === 'Amthromax', 'Organization logo caption is Amthromax');
  assert(
    typeof org.description === 'string' && org.description.startsWith('Amthromax is an artificial intelligence and software company developing'),
    'Organization description carries the full identity sentence'
  );
  assert(site['@id'] === 'https://amthromax.com/#website', 'WebSite @id is canonical');
  assert(site.alternateName === 'Amthromax AI', 'WebSite alternateName is Amthromax AI');
  assert(site.publisher && site.publisher['@id'] === org['@id'], 'WebSite publisher references the Organization @id');

  // 7. The runtime SEO component must not re-emit Organization / WebSite (no duplicates)
  const seoPath = path.join(__dirname, '../src/components/layout/SEO.tsx');
  assert(fs.existsSync(seoPath), 'SEO.tsx exists');
  const seoContent = fs.readFileSync(seoPath, 'utf8');
  assert(!seoContent.includes('"@type": "Organization"'), 'SEO.tsx does not duplicate the Organization entity');
  assert(!seoContent.includes('"@type": "WebSite"'), 'SEO.tsx does not duplicate the WebSite entity');
  assert(!seoContent.includes('${canonicalUrl}/#'), 'SEO.tsx builds page @ids without a double slash');

  // 8. Product entity relationships
  const productPages = {
    'src/components/codehoomer/CodeHoomerPage.tsx': 'https://amthromax.com/codehoomer#software',
    'src/components/helleious/HelleiousPage.tsx': 'https://amthromax.com/helleious#software',
    'src/components/orarqlow/OrarQlowPage.tsx': 'https://amthromax.com/orarqlow#software'
  };
  Object.entries(productPages).forEach(([rel, id]) => {
    const full = path.join(__dirname, '..', rel);
    assert(fs.existsSync(full), `${rel} exists`);
    if (!fs.existsSync(full)) return;
    const c = fs.readFileSync(full, 'utf8');
    assert(c.includes(id), `${rel} declares product @id ${id}`);
    assert(c.includes('"creator"') && c.includes('"publisher"'), `${rel} links creator and publisher to the Organization`);
    assert(indexContent.includes(id), `Organization brand references ${id}`);
  });

  // 9. Favicon / icon assets exist and match their declared sizes
  function pngSize(file) {
    const buf = fs.readFileSync(file);
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  }
  const iconExpectations = [
    ['public/favicon.ico', null],
    ['public/favicon.svg', null],
    ['public/favicon.png', 32],
    ['public/apple-touch-icon.png', 180],
    ['public/icon-192.png', 192],
    ['public/icon-512.png', 512],
    ['public/images/logo.png', 512]
  ];
  iconExpectations.forEach(([rel, size]) => {
    const full = path.join(__dirname, '..', rel);
    assert(fs.existsSync(full), `${rel} exists`);
    if (size && fs.existsSync(full)) {
      const [w, h] = pngSize(full);
      assert(w === size && h === size, `${rel} is ${size}x${size} (found ${w}x${h})`);
    }
  });

  // 10. Manifest icons resolve and declare accurate sizes
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(manifest.name === 'Amthromax', 'manifest.json name is Amthromax');
    assert(manifest.start_url === '/', 'manifest.json start_url is /');
    (manifest.icons || []).forEach((icon) => {
      const full = path.join(__dirname, '../public', icon.src);
      assert(fs.existsSync(full), `manifest icon ${icon.src} exists`);
      if (fs.existsSync(full)) {
        const [w, h] = pngSize(full);
        assert(`${w}x${h}` === icon.sizes, `manifest icon ${icon.src} really is ${icon.sizes} (found ${w}x${h})`);
      }
    });
  }

  // 11. Verify company config
  const companyConfigPath = path.join(__dirname, '../src/config/company.ts');
  assert(fs.existsSync(companyConfigPath), 'company.ts config exists');

  console.log('--------------------------------------------------');
  console.log(`SEO Audit Complete: ${passCount} PASSED, ${failCount} FAILED.`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runSeoAudit();
