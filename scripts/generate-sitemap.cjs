const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Core routes
  const routes = [
    { loc: 'https://amthromax.com/', changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://amthromax.com/about', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/blog', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://amthromax.com/news', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://amthromax.com/services', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/research', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://amthromax.com/foundation', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/platform', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/products', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/docs', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://amthromax.com/pricing', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/careers', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://amthromax.com/security', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://amthromax.com/privacy', changefreq: 'monthly', priority: '0.5' },
    { loc: 'https://amthromax.com/terms', changefreq: 'monthly', priority: '0.5' },
    { loc: 'https://amthromax.com/cookie-policy', changefreq: 'monthly', priority: '0.5' },
    { loc: 'https://amthromax.com/why/enterprises', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/why/small-businesses', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://amthromax.com/why/developers', changefreq: 'monthly', priority: '0.8' }
  ];

  // Try to parse blogData.ts for dynamic blog post routes
  try {
    const blogDataPath = path.join(__dirname, '../src/components/blog/blogData.ts');
    if (fs.existsSync(blogDataPath)) {
      const content = fs.readFileSync(blogDataPath, 'utf8');
      // Extract the blogPosts block
      const blogPostsStartIndex = content.indexOf('export const blogPosts');
      const blogPostsEndIndex = content.indexOf('export const newsItems');
      if (blogPostsStartIndex !== -1 && blogPostsEndIndex !== -1) {
        const blogPostsBlock = content.substring(blogPostsStartIndex, blogPostsEndIndex);
        const idRegex = /id:\s*["']([^"']+)["']/g;
        let match;
        while ((match = idRegex.exec(blogPostsBlock)) !== null) {
          routes.push({
            loc: `https://amthromax.com/blog/${match[1]}`,
            changefreq: 'weekly',
            priority: '0.7'
          });
        }
      }
    }
  } catch (err) {
    console.error('Failed to dynamically add blog routes to sitemap:', err);
  }

  // Build the XML content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${route.loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  // Write to public/sitemap.xml
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Successfully generated sitemap.xml with ${routes.length} routes.`);
}

generateSitemap();
