# MNSBaanu's Portfolio 🚀

A modern, responsive portfolio website showcasing my journey as a Full Stack Developer. Built with React, TypeScript, and Tailwind CSS, featuring smooth animations and an elegant design.

## 🌐 Live Demo

Visit my portfolio: **[mnsbaanu-portfolio.vercel.app](https://mnsbaanu-portfolio.vercel.app)**

## 👋 About Me

I'm **MNSBaanu**, a Software Engineering student at ICBT Kandy (affiliated with Cardiff Metropolitan University, UK). I'm passionate about creating meaningful digital experiences and continuously pushing myself to learn and grow in the tech world.

- 📍 Based in Kandy, Sri Lanka
- 🎓 HD in Computing & Software Engineering (May 2024 - Oct 2025)
- 💼 Available for opportunities (Kandy / Remote preferred)
- 🌱 Currently working on full-stack projects using MERN stack

## ✨ Features

- **Progressive Web App (PWA)**: Works offline and can be installed on any device
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, and structured data
- **Interactive Sections**: 
  - Hero section with floating code snippets
  - About me with highlights and services
  - Journey timeline (Education, Experience, Certifications)
  - Skills categorized by technology type
  - Project showcase with image carousels and pagination
  - Contact form with EmailJS integration and 24-hour response promise
- **CV Viewer**: Built-in CV viewer with PDF download functionality
- **Dark Theme**: Modern dark theme with teal accents
- **Social Sharing**: Optimized for LinkedIn, Twitter, and Facebook sharing
- **Offline Support**: Service worker caches assets for offline viewing

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

**Tools & Libraries:**
- Vite (Build tool)
- Vite PWA Plugin (Progressive Web App)
- EmailJS (Contact form)
- html2pdf.js (CV generation)
- React Three Fiber (3D elements)
- React Helmet Async (SEO management)
- Workbox (Service worker & caching)

**Deployment & Features:**
- Vercel (Hosting with Analytics)
- GitHub (Version control)
- PWA with offline support
- Sitemap & Robots.txt for search engines
- Structured data (JSON-LD) for rich snippets

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MNSBaanu/MyPortfolio.git
   cd MyPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional - for contact form)
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   See `EMAILJS_SETUP.md` for detailed setup instructions.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
MyPortfolio/
├── public/
│   ├── assets/          # Images, icons, certificates
│   ├── robots.txt       # Search engine crawler instructions
│   └── sitemap.xml      # Site structure for SEO
├── src/
│   ├── components/      # React components
│   │   ├── SEO.tsx     # SEO structured data
│   │   └── ...         # Other components
│   ├── context/        # React context (Theme)
│   ├── data/           # Portfolio data (portfolio.ts)
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
├── index.html          # HTML with meta tags
├── manifest.json       # PWA manifest (in public/)
├── package.json
├── EMAILJS_SETUP.md    # EmailJS configuration guide
├── SEO_SETUP.md        # SEO implementation guide
├── SEO_CHECKLIST.md    # SEO tasks and testing
├── PWA_SETUP.md        # PWA setup and testing guide
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts      # Vite config with PWA plugin
```

## 🎨 Customization

All portfolio content can be easily customized by editing `src/data/portfolio.ts`:

- Personal information
- About section
- Skills and technologies
- Education and experience
- Projects
- Certifications

For SEO customization, update:
- Meta tags in `index.html`
- Structured data in `src/components/SEO.tsx`
- Sitemap URLs in `public/sitemap.xml`

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment.

## 🔒 Security & Backup

This portfolio includes enterprise-grade security:

### Security Features
- **Security Headers**: XSS protection, clickjacking prevention, HSTS
- **Content Security Policy**: Prevents unauthorized script execution
- **Automated Backups**: Weekly GitHub Actions backups
- **Environment Protection**: Sensitive data never committed

### Run Security Check
```bash
npm run security-check
```

### Create Manual Backup
```bash
# Windows
scripts\backup.bat

# Mac/Linux
bash scripts/backup.sh
```

### Audit Dependencies
```bash
npm run audit
```

For detailed security information, see `SECURITY.md`.

## 🔍 SEO & Performance

This portfolio is optimized for search engines and social media:

- **Meta Tags**: Comprehensive SEO meta tags in `index.html`
- **Open Graph**: Optimized for Facebook and LinkedIn sharing
- **Twitter Cards**: Enhanced Twitter sharing experience
- **Structured Data**: JSON-LD markup for rich search results
- **Sitemap**: XML sitemap for search engine crawlers
- **Robots.txt**: Crawler instructions

For detailed SEO setup and testing, see `SEO_SETUP.md` and `SEO_CHECKLIST.md`.

## 📱 Progressive Web App (PWA)

This portfolio works offline and can be installed on any device:

- **Offline Support**: Works without internet after first visit
- **Installable**: Can be installed like a native app on desktop and mobile
- **Fast Loading**: Assets cached for instant loading
- **Auto Updates**: Service worker updates automatically
- **Install Prompt**: Smart prompt appears for supported browsers

For detailed PWA setup and testing, see `PWA_SETUP.md`.

### Test Offline Mode
1. Visit the portfolio online
2. Open DevTools → Network → Check "Offline"
3. Refresh - it still works!

### Install on Desktop
- Look for install icon in browser address bar (Chrome/Edge)
- Click to install as standalone app

### Install on Mobile
- Chrome Android: Tap "Add to Home Screen"
- Safari iOS: Tap Share → "Add to Home Screen"

## 📫 Contact

- **Email**: sbaanukghsbio21@gmail.com
- **LinkedIn**: [linkedin.com/in/mns-baanu](https://lk.linkedin.com/in/mns-baanu)
- **GitHub**: [github.com/MNSBaanu](https://github.com/MNSBaanu)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by MNSBaanu**

*"Mastering the full spectrum: From what users see to what makes it breathe."*

