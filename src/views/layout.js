const { sidebar } = require('./sidebar');
const { escapeHtml } = require('../utils/escapeHtml');

function layout({ title, description, activePage, content }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} — Anish Maka</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#15171b" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />

  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2315171b'/%3E%3Ctext x='16' y='21' font-family='monospace' font-size='13' font-weight='700' fill='%23d8a14c' text-anchor='middle'%3EAM%3C/text%3E%3C/svg%3E" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/js/tailwind-config.js"></script>
  <link rel="stylesheet" href="/css/custom.css" />
</head>
<body class="bg-ink text-gray-200 font-body antialiased" data-page="${escapeHtml(activePage)}">

  ${sidebar(activePage)}

  <!-- mobile topbar -->
  <header class="md:hidden sticky top-0 z-20 flex items-center justify-between bg-ink/90 backdrop-blur border-b border-ink-border px-4 py-3">
    <button id="mobile-open-btn" type="button" class="text-gray-300" aria-label="Open menu" aria-expanded="false">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <span class="font-mono text-xs text-gold uppercase tracking-wide">${escapeHtml(title)}</span>
    <span class="w-[22px]"></span>
  </header>

  <main id="main-content" class="md:ml-[280px] transition-[margin] duration-300 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      ${content}
    </div>
    <footer class="max-w-5xl mx-auto px-6 md:px-12 py-8 border-t border-ink-border text-xs text-gray-500 flex flex-wrap gap-2 justify-between">
      <span>© <span id="year"></span> Anish Maka. Built with care.</span>
      <a href="#main-content" class="hover:text-gold">Back to top ↑</a>
    </footer>
  </main>

  <script src="/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = { layout };
