/**
 * NAV CONFIG
 * The single source of truth for sidebar items. Both the router
 * and the sidebar view read from this, so adding a page here is
 * enough to get it linked correctly everywhere.
 */
module.exports = [
  { slug: 'about', label: 'About Me', icon: 'user' },
  { slug: 'education', label: 'Education', icon: 'cap' },
  { slug: 'skills', label: 'Skills', icon: 'tools' },
  { slug: 'portfolio', label: 'Portfolio', icon: 'folder' },
  { slug: 'achievements', label: 'Achievements', icon: 'badge' },
  { slug: 'experience', label: 'Experience', icon: 'briefcase' },
  { slug: 'resume', label: 'Resume', icon: 'file' },
  { slug: 'updates', label: 'Updates', icon: 'rss' },
  { slug: 'contact', label: 'Contact', icon: 'mail' }
];
