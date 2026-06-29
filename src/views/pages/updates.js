const updates = require('../../data/updates');
const { escapeHtml } = require('../../utils/escapeHtml');

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return escapeHtml(dateStr || '');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function updatesPage() {
  const sorted = [...updates].sort((a, b) => new Date(b.date) - new Date(a.date));

  const body = sorted.length
    ? `<ul class="mt-10 max-w-2xl space-y-6">${sorted
        .map(
          (u) => `
        <li class="bg-ink-surface border border-ink-border rounded-xl p-5">
          <p class="font-mono text-xs text-gray-500">${formatDate(u.date)}</p>
          <h3 class="font-display font-semibold text-lg text-white mt-1">${escapeHtml(u.title)}</h3>
          <p class="text-sm text-gray-400 mt-2">${escapeHtml(u.body)}</p>
        </li>`
        )
        .join('')}</ul>`
    : `
      <div class="mt-10 border border-dashed border-ink-border rounded-2xl p-10 text-center max-w-md">
        <p class="text-gray-400">No updates yet.</p>
        <p class="font-mono text-xs text-gray-600 mt-2">Add entries in src/data/updates.js</p>
      </div>`;

  return `
  <section>
    <p class="reveal font-mono text-gold text-sm uppercase tracking-wide mb-3">Updates</p>
    <h1 class="reveal font-display font-semibold text-3xl md:text-4xl text-white">What I've been up to</h1>
    <div class="reveal">${body}</div>
  </section>`;
}

module.exports = { updatesPage };
