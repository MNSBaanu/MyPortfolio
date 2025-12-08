# SEO Setup Documentation

## What Was Added

### 1. Meta Tags (index.html)
- **Primary Meta Tags**: Title, description, keywords, author
- **Open Graph Tags**: For Facebook, LinkedIn sharing
- **Twitter Card Tags**: For Twitter sharing
- **Additional Tags**: Theme color, mobile app settings

### 2. Structured Data (JSON-LD)
- Added `src/components/SEO.tsx` with Schema.org Person markup
- Helps Google understand your profile better
- Improves rich snippets in search results

### 3. SEO Files
- **robots.txt**: Tells search engines what to crawl
- **sitemap.xml**: Lists all pages for search engines

## How to Test

### 1. Test Meta Tags
- **Facebook/LinkedIn**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- Paste your URL and see the preview

### 2. Test Structured Data
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- Paste your URL to validate JSON-LD

### 3. Test SEO Overall
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **SEO Site Checkup**: https://seositecheckup.com/

## What to Update

### Before Deploying
1. Update the canonical URL in `index.html` if your domain changes
2. Update the sitemap.xml URLs if domain changes
3. Update the robots.txt sitemap URL if domain changes

### When Content Changes
1. Update `lastmod` dates in sitemap.xml
2. Update meta description if you change your focus
3. Update keywords if you learn new technologies

### For Social Sharing
Create a custom Open Graph image (1200x630px):
- Include your name and title
- Add your tech stack icons
- Use your brand colors (teal/black)
- Save as `/public/assets/og-image.png`
- Update the og:image meta tag

## Submit to Search Engines

### Google
1. Go to https://search.google.com/search-console
2. Add your property (website)
3. Verify ownership
4. Submit your sitemap: `https://your-domain.com/sitemap.xml`

### Bing
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap

## Expected Results

- **Week 1-2**: Site indexed by Google
- **Week 2-4**: Start appearing in search results
- **Month 2-3**: Ranking improves for your name
- **Month 3+**: Ranking for "full stack developer [your location]"

## Tips for Better SEO

1. **Keep updating**: Add new projects regularly
2. **Get backlinks**: Share on LinkedIn, dev.to, GitHub
3. **Write content**: Add blog posts about your projects
4. **Use keywords naturally**: In project descriptions
5. **Monitor**: Check Google Search Console monthly

## Current Keywords Targeting

- MNSBaanu
- Full Stack Developer Kandy
- MERN Stack Developer Sri Lanka
- React Developer
- Node.js Developer
- Software Engineer Portfolio

## Next Steps

1. Create custom OG image (1200x630px)
2. Submit to Google Search Console
3. Share portfolio on LinkedIn with proper description
4. Add blog posts for more content
5. Get backlinks from GitHub, dev.to, etc.
