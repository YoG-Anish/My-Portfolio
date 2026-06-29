const skillGroups = require('../../data/skills');
const { escapeHtml } = require('../../utils/escapeHtml');

function skillsPage() {
  const groups = skillGroups
    .map((group) => {
      const pillClass = group.accent === 'teal' ? 'bg-teal-soft' : 'bg-gold-soft';
      const pills = group.skills
        .map((s) => `<li class="${pillClass} border border-ink-border rounded-full px-4 py-1.5 text-sm font-medium text-gray-100">${escapeHtml(s)}</li>`)
        .join('');
      return `
      <div class="reveal">
        <h3 class="font-mono text-xs uppercase tracking-wide text-gray-500 mb-3">${escapeHtml(group.title)}</h3>
        <ul class="flex flex-wrap gap-2.5">${pills}</ul>
      </div>`;
    })
    .join('');

  return `
  <section>
    <p class="reveal font-mono text-gold text-sm uppercase tracking-wide mb-3">Skills</p>
    <h1 class="reveal font-display font-semibold text-3xl md:text-4xl text-white mb-10">What I work with</h1>
    <div class="grid sm:grid-cols-2 gap-10 max-w-3xl">${groups}</div>
  </section>`;
}

module.exports = { skillsPage };
