import type { MouseEvent } from 'react';
import { CategoryId } from '../types';

export type AppRoute =
  | { type: 'home' }
  | { type: 'category'; categorySlug: CategoryId }
  | { type: 'product'; productSlug: string }
  | { type: 'stores' }
  | { type: 'sitemap' };

export function parseCurrentRoute(): AppRoute {
  if (typeof window === 'undefined') {
    return { type: 'home' };
  }

  // Support both clean pathname and hash-based URLs (for iframe fallback)
  const path = window.location.pathname || '';
  const hash = window.location.hash || '';

  let normalized = path;
  if (hash.startsWith('#/')) {
    normalized = hash.slice(1);
  }

  // Remove leading/trailing slashes
  const cleanPath = normalized.replace(/^\/+|\/+$/g, '');

  if (!cleanPath || cleanPath === '') {
    return { type: 'home' };
  }

  if (cleanPath === 'plan-du-site' || cleanPath === 'sitemap') {
    return { type: 'sitemap' };
  }

  if (cleanPath === 'nos-magasins' || cleanPath === 'magasins' || cleanPath === 'stores') {
    return { type: 'stores' };
  }

  // Check /categories/:slug
  const catMatch = cleanPath.match(/^categories\/([a-zA-Z0-9_-]+)$/);
  if (catMatch) {
    const slug = catMatch[1].toLowerCase() as CategoryId;
    return { type: 'category', categorySlug: slug };
  }

  // Check /produits/:slug
  const prodMatch = cleanPath.match(/^produits\/([a-zA-Z0-9_-]+)$/);
  if (prodMatch) {
    return { type: 'product', productSlug: prodMatch[1] };
  }

  return { type: 'home' };
}

export function navigateTo(url: string, e?: MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  if (typeof window === 'undefined') return;

  try {
    window.history.pushState({}, '', url);
  } catch {
    // If pushState is restricted (e.g. some sandbox iframes), fallback to hash
    window.location.hash = '#' + url;
  }

  // Dispatch custom popstate event so listeners update
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function getProductUrl(slug: string): string {
  return `/produits/${slug}`;
}

export function getCategoryUrl(category: CategoryId | string): string {
  return `/categories/${category}`;
}

export function getSitemapUrl(): string {
  return '/plan-du-site';
}

export function getStoresUrl(): string {
  return '/nos-magasins';
}

export function getHomeUrl(): string {
  return '/';
}
