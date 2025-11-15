import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://backporting.ai';
  
  // Load all digests from content collections
  const digests = await getCollection('digests');
  
  // Define static pages
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: 'articles', changefreq: 'weekly', priority: '0.9' },
    { url: 'digests', changefreq: 'weekly', priority: '0.9' },
  ];
  
  // Generate digest URLs
  const digestPages = digests.map((digest) => ({
    url: `digests/${digest.data.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));
  
  // Combine all pages
  const allPages = [...staticPages, ...digestPages];
  
  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};

export const prerender = true;

