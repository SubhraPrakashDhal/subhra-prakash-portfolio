import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Subhra Prakash Dhal — Senior Full Stack & UI/UX Developer',
  description = 'Portfolio of Subhra Prakash Dhal - Senior Full Stack, MERN & UI/UX Developer specializing in high-performance Web Apps, React 19, Node.js, and modern 3D UI designs.',
  path,
  canonical,
}) => {
  useEffect(() => {
    // 1. Dynamic Page Title
    document.title = title;

    // 2. Dynamic Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // 3. Runtime Environment-Agnostic Origin Resolution
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'http://localhost:5174';

    const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const fullCanonicalUrl = canonical || `${origin}${currentPath}`;

    // 4. Update Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonicalUrl);

    // 5. Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', fullCanonicalUrl);

    // 6. Update Twitter Card URL
    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (!twitterUrl) {
      twitterUrl = document.createElement('meta');
      twitterUrl.setAttribute('name', 'twitter:url');
      document.head.appendChild(twitterUrl);
    }
    twitterUrl.setAttribute('content', fullCanonicalUrl);

    // 7. Dynamic JSON-LD Schema Updating Origin
    let jsonLdScript = document.querySelector('#dynamic-json-ld');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('id', 'dynamic-json-ld');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          'name': 'Subhra Prakash Dhal',
          'url': origin,
          'jobTitle': 'Senior Full Stack & UI Engineer',
          'sameAs': [
            'https://github.com/SubhraPrakashDhal',
            'https://linkedin.com/in/subhraprakashdhal'
          ],
          'knowsAbout': ['React 19', 'Node.js', 'TypeScript', 'MongoDB', 'UI/UX Design', '3D Web Animations']
        },
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          'url': origin,
          'name': 'Subhra Prakash Dhal Portfolio',
          'publisher': {
            '@id': `${origin}/#person`
          }
        }
      ]
    };

    jsonLdScript.textContent = JSON.stringify(jsonLdData);
  }, [title, description, path, canonical]);

  return null;
};
