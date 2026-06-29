const experience = require('../../data/experience');
const { escapeHtml } = require('../../utils/escapeHtml');

function experiencePage() {
  const items = experience.length
    ? experience
        .map((e) => {
          const highlights = Array.isArray(e.highlights)
            ? `<ul class="mt-3 space-y-1.5">${e.highlights
                .map((h) => `<li class="text-sm text-gray-400 flex gap-2"><span class="text-gold">—</span>${escapeHtml(h)}</li>`)
                .join('')}</ul>`
            : '';
          return `
        <li class="relative pl-8 pb-10 border-l border-ink-border last:border-transparent last:pb-0">
          <span class="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-teal"></span>
          <div class="flex flex-wrap items-baseline gap-2">
            <h3 class="font-display font-semibold text-lg text-white">${escapeHtml(e.role)}</h3>
            <span class="font-mono text-xs text-gray-500">${escapeHtml(e.duration)}</span>
          </div>
          <p class="text-sm text-gold mt-1">${escapeHtml(e.company)}</p>
          <p class="text-gray-400 mt-2 max-w-xl">${escapeHtml(e.description)}</p>
          ${highlights}
        </li>`;
        })
        .join('')
    : `<li class="text-gray-500 font-mono text-sm">No experience entries yet — add one in <code>src/data/experience.js</code>.</li>`;

  return `
  <section class="reveal">
    <p class="font-mono text-gold text-sm uppercase tracking-wide mb-3">Experience</p>
    <h1 class="font-display font-semibold text-3xl md:text-4xl text-white">Where I've worked</h1>
    <ul class="mt-10 max-w-2xl">${items}</ul>
  </section>`;
}

module.exports = { experiencePage };
