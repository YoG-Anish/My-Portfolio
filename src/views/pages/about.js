const profile = require('../../data/profile');
const { escapeHtml } = require('../../utils/escapeHtml');

function aboutPage() {
  const bio = profile.bio.map((p) => `<p class="text-gray-400 leading-relaxed">${escapeHtml(p)}</p>`).join('\n');

  const facts = profile.quickFacts
    .map(
      (f) => `
      <div class="quick-fact bg-ink-surface border border-ink-border rounded-xl px-4 py-3">
        <dt class="font-mono text-[11px] uppercase tracking-wide text-gray-500">${escapeHtml(f.label)}</dt>
        <dd class="mt-1 font-semibold text-sm text-gray-100">${escapeHtml(f.value)}</dd>
      </div>`
    )
    .join('');

  return `
  <section class="reveal">
    <p class="font-mono text-gold text-sm uppercase tracking-wide mb-3">About Me</p>
    <h1 class="font-display font-semibold text-4xl md:text-5xl text-white leading-tight">
      Hi, I'm ${escapeHtml(profile.name.first)} ${escapeHtml(profile.name.last)}.
    </h1>
    <div class="mt-6 space-y-4 max-w-2xl">${bio}</div>

    <dl class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">${facts}</dl>

    <div class="mt-10 flex flex-wrap gap-3">
      <a href="/portfolio" class="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-gold-strong transition-colors">View projects</a>
      <a href="/contact" class="inline-flex items-center gap-2 border border-ink-border px-5 py-2.5 rounded-full text-sm hover:border-gold hover:text-gold transition-colors">Get in touch</a>
    </div>
  </section>`;
}

module.exports = { aboutPage };
