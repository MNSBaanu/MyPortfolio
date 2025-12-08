import { Helmet } from 'react-helmet-async'
import { personalInfo } from '../data/portfolio'

export default function SEO() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "MNSBaanu",
    "alternateName": "Sahla Baanu",
    "url": "https://mnsbaanu-portfolio.vercel.app",
    "image": "https://mnsbaanu-portfolio.vercel.app/assets/profile.png",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies",
    "email": personalInfo.email,
    "telephone": personalInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kandy",
      "addressCountry": "Sri Lanka"
    },
    "sameAs": [
      personalInfo.social.github,
      personalInfo.social.linkedin
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "ICBT Kandy",
      "sameAs": "https://www.icbt.lk"
    },
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Full Stack Development",
      "Web Development",
      "MERN Stack"
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
