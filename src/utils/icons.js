/**
 * Inline SVG icons, kept as plain strings so the project has zero
 * dependency on an icon font/CDN. All icons share the same
 * stroke-based style for visual consistency.
 */
const ICONS = {
  user: '<path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"/><path d="M4.5 20.2c1.4-3.4 4.3-5.2 7.5-5.2s6.1 1.8 7.5 5.2"/>',
  cap: '<path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z"/><path d="M6 11.7v4c0 1.4 2.7 3 6 3s6-1.6 6-3v-4"/>',
  tools: '<path d="m14.5 6.5 3 3L7 20l-3.5.5L4 17l10.5-10.5Z"/><path d="M14.5 6.5 17 4l3 3-2.5 2.5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
  badge: '<circle cx="12" cy="8.5" r="4.5"/><path d="M8.2 12.7 7 21l5-2.5 5 2.5-1.2-8.3"/>',
  briefcase: '<rect x="2.5" y="7" width="19" height="13" rx="2"/><path d="M16 20V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v14"/>',
  file: '<path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4"/>',
  rss: '<path d="M4 4c8.8 0 16 7.2 16 16M4 11c4.4 0 8 3.6 8 8"/><circle cx="6" cy="18" r="1.6" fill="currentColor" stroke="none"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 6.5 9 6.5 9-6.5"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/>',
  link: '<path d="M9 15 15 9"/><path d="M10.5 6.5 12 5a4 4 0 1 1 5.7 5.7l-1.5 1.5"/><path d="M13.5 17.5 12 19a4 4 0 1 1-5.7-5.7l1.5-1.5"/>',
  download: '<path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  chevron: '<path d="m15 6-6 6 6 6"/>',
  external: '<path d="M7 17 17 7M9 7h8v8"/>'
};

function icon(name, size = 18) {
  const inner = ICONS[name] || '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

module.exports = { icon };
