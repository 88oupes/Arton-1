export interface SeoData {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'product';
  schema?: Record<string, unknown>;
}

export function updateMetaTags({
  title,
  description,
  canonicalPath = '/',
  image = 'https://res.cloudinary.com/psbqhe7h/image/upload/v1789644319/Dari_logo.jpg',
  type = 'website',
  schema,
}: SeoData) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph
  const ogTags: Record<string, string> = {
    'og:title': title,
    'og:description': description,
    'og:type': type,
    'og:image': image,
    'og:site_name': 'DARY Maroc',
  };

  if (typeof window !== 'undefined') {
    ogTags['og:url'] = window.location.origin + canonicalPath;
  }

  Object.entries(ogTags).forEach(([property, content]) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // Twitter
  const twitterTags: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // Canonical Link
  if (typeof window !== 'undefined') {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + canonicalPath);
  }

  // Schema.org JSON-LD
  const existingScript = document.getElementById('seo-schema-jsonld');
  if (schema) {
    if (existingScript) {
      existingScript.textContent = JSON.stringify(schema);
    } else {
      const script = document.createElement('script');
      script.id = 'seo-schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  } else if (existingScript) {
    existingScript.remove();
  }
}
