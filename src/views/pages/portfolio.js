const projects = require('../../data/portfolio');
const { escapeHtml } = require('../../utils/escapeHtml');
const { icon } = require('../../utils/icons');

function renderCard(project) {
  const hasLink = typeof project.link === 'string' && project.link.trim().length > 0;
  // Only ever trust http(s) links as real hrefs — anything else
  // (javascript:, data:, etc.) falls back to the disabled state.
  const isSafeLink = hasLink && /^https?:\/\//i.test(project.link.trim());

  const tools = Array.isArray(project.tools)
    ? project.tools
        .map((t) => `<li class="font-mono text-[11px] border border-ink-border rounded px-2 py-1 text-gray-400">${escapeHtml(t)}</li>`)
        .join('')
    : '';

  const linkHtml = isSafeLink
    ? `<a href="${escapeHtml(project.link.trim())}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-100 hover:text-gold mt-5">View project ${icon('external', 14)}</a>`
    : `<span class="inline-flex items-center gap-1.5 text-sm text-gray-500 mt-5">Coming soon</span>`;

  return `
  <article class="bg-ink-surface border border-ink-border rounded-2xl p-6 flex flex-col hover:border-gold/60 transition-colors">
    <div class="flex items-center justify-between gap-3 mb-3">
      <span class="font-mono text-[11px] uppercase tracking-wide text-gold bg-gold-soft px-2.5 py-1 rounded">${escapeHtml(project.category || 'Project')}</span>
      ${project.year ? `<span class="font-mono text-xs text-gray-500">${escapeHtml(project.year)}</span>` : ''}
    </div>
    <h3 class="font-display font-semibold text-lg text-white">${escapeHtml(project.title)}</h3>
    <p class="text-sm text-gray-400 mt-2 flex-grow">${escapeHtml(project.description || '')}</p>
    ${tools ? `<ul class="flex flex-wrap gap-1.5 mt-4">${tools}</ul>` : ''}
    ${linkHtml}
  </article>`;
}

function portfolioPage() {
  const seen = new Set();
  const cards = projects
    .filter((p) => {
      if (!p || typeof p.title !== 'string' || !p.title.trim()) return false;
      const id = p.id !== undefined ? p.id : p.title;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .map(renderCard)
    .join('');

  const body = cards
    ? `<div class="grid sm:grid-cols-2 gap-5 mt-10">${cards}</div>`
    : `<p class="mt-10 font-mono text-sm text-gray-500">No projects yet — add one in <code>src/data/portfolio.js</code>.</p>`;

  return `
  <section>
    <p class="reveal font-mono text-gold text-sm uppercase tracking-wide mb-3">Selected Work</p>
    <h1 class="reveal font-display font-semibold text-3xl md:text-4xl text-white">WooCommerce stores & custom builds</h1>
    <div class="reveal">${body}</div>
  </section>`;
}

module.exports = { portfolioPage };
