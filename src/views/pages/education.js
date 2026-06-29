const education = require('../../data/education');
const { escapeHtml } = require('../../utils/escapeHtml');
const { icon } = require('../../utils/icons');

function educationPage() {
  const items = education.length
    ? education
        .map(
          (e) => `
        <li class="relative pl-8 pb-8 border-l border-ink-border last:border-transparent last:pb-0">
          <span class="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-gold"></span>
          <div class="flex flex-wrap items-baseline gap-2">
            <h3 class="font-display font-semibold text-lg text-white">${escapeHtml(e.institution)}</h3>
            ${e.period ? `<span class="font-mono text-xs text-gray-500">${escapeHtml(e.period)}</span>` : ''}
          </div>
          <p class="text-sm text-gold mt-1">${escapeHtml(e.program)}</p>
          <p class="text-gray-400 mt-2 max-w-xl">${escapeHtml(e.description)}</p>
        </li>`
        )
        .join('')
    : `<li class="text-gray-500 font-mono text-sm">No education entries yet — add one in <code>src/data/education.js</code>.</li>`;

  return `
  <section class="reveal">
    <p class="font-mono text-gold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">${icon('cap', 16)} Education</p>
    <h1 class="font-display font-semibold text-3xl md:text-4xl text-white">Where it started</h1>
    <ul class="mt-10 max-w-2xl">${items}</ul>
  </section>`;
}

module.exports = { educationPage };
