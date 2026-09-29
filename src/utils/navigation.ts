/**
 * SARTOR ATELIER - CLIENT-SIDE NAVIGATION & ROUTING UTILITIES
 * Provides History API integration, seamless path transitions,
 * and ensures crawlable standard <a> hrefs for SEO.
 */

export function navigateTo(url: string, e?: React.MouseEvent) {
  if (e) {
    // Respect user's intent if opening in new tab or using modifier keys
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
  }

  // Push state to browser history
  window.history.pushState(null, '', url);
  
  // Dispatch custom and popstate events so components re-evaluate route
  window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path: url } }));
  window.dispatchEvent(new Event('popstate'));
  
  // Smooth scroll to top on page transition
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function handleInternalLinkClick(url: string, e: React.MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
    return;
  }
  e.preventDefault();
  navigateTo(url);
}
