const profile = require('../data/profile');
const nav = require('../data/nav');
const { icon } = require('../utils/icons');
const { escapeHtml } = require('../utils/escapeHtml');

/**
 * Renders the persistent left sidebar. `activePage` is the slug
 * of the current page, used to highlight the matching nav item —
 * this is computed server-side so the right link is highlighted
 * even before any JS runs.
 */
function sidebar(activePage) {
  const navItems = nav
    .map((item) => {
      const isActive = item.slug === activePage;
      const activeClasses = isActive
        ? 'bg-gold text-ink font-semibold'
        : 'text-gray-300 hover:bg-ink-surface2 hover:text-white';
      return `
        <li>
          <a href="/${item.slug}"
             class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${activeClasses}"
             ${isActive ? 'aria-current="page"' : ''}>
            <span class="shrink-0">${icon(item.icon, 18)}</span>
            <span class="nav-label whitespace-nowrap">${escapeHtml(item.label)}</span>
          </a>
        </li>`;
    })
    .join('');

  const fullName = `${escapeHtml(profile.name.first)} ${escapeHtml(profile.name.last)}`;

  return `
  <aside id="sidebar"
         class="fixed inset-y-0 left-0 z-40 w-[280px] -translate-x-full md:translate-x-0 bg-ink border-r border-ink-border flex flex-col"
         aria-label="Sidebar navigation">

    <button id="collapse-toggle" type="button"
            class="hidden md:flex absolute -right-3 top-8 w-7 h-7 rounded-full bg-ink-surface2 border border-ink-border items-center justify-center text-gray-400 hover:text-gold"
            aria-label="Collapse sidebar">
      <span id="collapse-icon">${icon('chevron', 14)}</span>
    </button>

    <button id="mobile-close" type="button"
            class="md:hidden self-end m-3 text-gray-400 hover:text-white" aria-label="Close menu">
      ✕
    </button>

    <div class="px-6 pt-2 pb-6 flex flex-col items-center text-center border-b border-ink-border">
      <div class="relative">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-2xl font-display font-semibold text-ink">
          ${escapeHtml(profile.initials)}
        </div>
        <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-teal border-2 border-ink"></span>
      </div>

      <p class="brand-text mt-4 font-display font-semibold text-lg text-white">
        ${escapeHtml(profile.name.first)} <span class="text-gold">${escapeHtml(profile.name.last)}</span>
      </p>
      <p class="brand-text text-xs text-gray-400 font-mono mt-1 cursor-blink">${escapeHtml(profile.role)}</p>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <ul class="space-y-1">${navItems}</ul>
    </nav>

    <div class="brand-text px-4 py-3 border-t border-ink-border flex items-center justify-around">
      <button id="theme-toggle" type="button" class="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:bg-ink-surface2" aria-label="Toggle light and dark theme" aria-pressed="false">
        <span class="icon-moon">${icon('moon', 17)}</span>
        <span class="icon-sun hidden">${icon('sun', 17)}</span>
      </button>
      <button id="copy-link" type="button" class="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:bg-ink-surface2" aria-label="Copy link to this page">
        ${icon('link', 17)}
      </button>
      <a href="/resume/download" class="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:bg-ink-surface2" aria-label="Download resume" title="Download resume">
        ${icon('download', 17)}
      </a>
    </div>
  </aside>

  <div id="mobile-overlay" class="hidden fixed inset-0 bg-black/50 z-30 md:hidden"></div>
  `;
}

module.exports = { sidebar };
