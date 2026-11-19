export const dynamic = 'force-static';
export default function sitemap() {
  const base = 'https://sentrion.imeer.ai';
  const now = new Date();
  return [
    { url: base + '/', lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: base + '/docs/', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/rules/', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/faq/', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
