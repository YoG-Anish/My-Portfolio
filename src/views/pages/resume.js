const fs = require('fs');
const path = require('path');
const { icon } = require('../../utils/icons');

const RESUME_PATH = path.join(__dirname, '..', '..', '..', 'public', 'files', 'resume.pdf');

function resumePage() {
  const hasResume = fs.existsSync(RESUME_PATH);

  const action = hasResume
    ? `<a href="/resume/download" class="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-gold-strong transition-colors">${icon('download', 16)} Download PDF</a>`
    : `<div class="border border-dashed border-ink-border rounded-xl px-5 py-4 text-sm text-gray-400 max-w-md">
         No resume uploaded yet. Drop a PDF at <code class="font-mono text-gold">public/files/resume.pdf</code> and this button will turn into a working download link.
       </div>`;

  return `
  <section class="reveal">
    <p class="font-mono text-gold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">${icon('file', 16)} Resume</p>
    <h1 class="font-display font-semibold text-3xl md:text-4xl text-white">The short version, on paper</h1>
    <p class="text-gray-400 mt-4 max-w-xl">
      A condensed look at education, experience, and skills — in one downloadable file.
    </p>
    <div class="mt-8">${action}</div>
  </section>`;
}

module.exports = { resumePage };
