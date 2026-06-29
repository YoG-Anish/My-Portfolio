const achievements = require('../../data/achievements');
const { escapeHtml } = require('../../utils/escapeHtml');
const { icon } = require('../../utils/icons');

function achievementsPage() {
  const body = achievements.length
    ? `<div class="grid sm:grid-cols-2 gap-5 mt-10">${achievements
        .map(
          (a) => `
        <article class="bg-ink-surface border border-ink-border rounded-2xl p-6">
          <div class="flex items-center gap-2 text-gold mb-2">${icon('badge', 18)}<span class="font-mono text-xs text-gray-500">${escapeHtml(a.year || '')}</span></div>
          <h3 class="font-display font-semibold text-lg text-white">${escapeHtml(a.title)}</h3>
          ${a.issuer ? `<p class="text-sm text-gray-400 mt-1">${escapeHtml(a.issuer)}</p>` : ''}
          ${a.description ? `<p class="text-sm text-gray-400 mt-2">${escapeHtml(a.description)}</p>` : ''}
        </article>`
        )
        .join('')}</div>`
    : `
      <div class="mt-10 border border-dashed border-ink-border rounded-2xl p-10 text-center max-w-md">
        <p class="text-gray-400">No achievements added yet.</p>
        <p class="font-mono text-xs text-gray-600 mt-2">Add entries in src/data/achievements.js</p>
      </div>`;

  return `
  <section>
    <p class="reveal font-mono text-gold text-sm uppercase tracking-wide mb-3">Achievements</p>
    <h1 class="reveal font-display font-semibold text-3xl md:text-4xl text-white">Milestones</h1>
    <div class="reveal">${body}</div>
  </section>`;
}

module.exports = { achievementsPage };
