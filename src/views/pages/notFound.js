function notFoundPage() {
  return `
  <section class="text-center py-16">
    <p class="font-mono text-gold text-sm">404</p>
    <h1 class="font-display font-semibold text-3xl md:text-4xl text-white mt-3">Page not found</h1>
    <p class="text-gray-400 mt-3">Whatever you were looking for isn't here.</p>
    <a href="/about" class="inline-flex items-center gap-2 mt-8 bg-gold text-ink font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-gold-strong transition-colors">Back to About</a>
  </section>`;
}

module.exports = { notFoundPage };
