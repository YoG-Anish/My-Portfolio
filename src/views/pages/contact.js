const profile = require('../../data/profile');
const { escapeHtml } = require('../../utils/escapeHtml');
const { icon } = require('../../utils/icons');

function statusBanner(status, message) {
  if (!status) return '';
  const isSuccess = status === 'success';
  const classes = isSuccess
    ? 'border-teal/50 bg-teal-soft text-teal'
    : 'border-red-500/40 bg-red-500/10 text-red-400';
  const fallback = isSuccess ? 'Thanks — your message is in. I\'ll get back to you soon.' : 'Something went wrong. Please try again.';
  return `<div class="reveal mb-6 border ${classes} rounded-xl px-4 py-3 text-sm">${escapeHtml(message) || fallback}</div>`;
}

function contactPage({ status, message } = {}) {
  const socials = profile.socials
    .map(
      (s) => `<li><a href="${s.href ? escapeHtml(s.href) : '#'}" rel="noopener noreferrer" target="_blank" class="text-sm text-gray-400 hover:text-gold border-b border-transparent hover:border-gold">${escapeHtml(s.label)}</a></li>`
    )
    .join('');

  return `
  <section>
    <p class="reveal font-mono text-gold text-sm uppercase tracking-wide mb-3">Contact</p>
    <h1 class="reveal font-display font-semibold text-3xl md:text-4xl text-white">Let's talk</h1>
    <p class="reveal text-gray-400 mt-4 max-w-xl">
      Have a WordPress or WooCommerce project in mind, or just want to talk photography? My inbox is open.
    </p>

    <div class="reveal mt-8 flex items-center gap-3">
      <a href="mailto:${escapeHtml(profile.email)}" class="font-display text-xl text-white border-b-2 border-gold hover:text-gold">${escapeHtml(profile.email)}</a>
    </div>

    <ul class="reveal flex gap-5 mt-4">${socials}</ul>

    <div class="reveal mt-10 max-w-lg">
      ${statusBanner(status, message)}
      <form id="contact-form" action="/api/contact" method="POST" novalidate class="space-y-4">

        <!-- Honeypot: invisible to real visitors, often filled in by bots.
             Positioned off-screen rather than display:none, since some
             bots specifically skip display:none fields. -->
        <div class="absolute -left-[9999px]" aria-hidden="true">
          <label for="website">Website</label>
          <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
        </div>

        <div>
          <label for="name" class="block text-xs font-mono uppercase tracking-wide text-gray-500 mb-1.5">Name</label>
          <input id="name" name="name" type="text" required maxlength="100"
                 class="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-gold" />
        </div>

        <div>
          <label for="email" class="block text-xs font-mono uppercase tracking-wide text-gray-500 mb-1.5">Email</label>
          <input id="email" name="email" type="email" required maxlength="150"
                 class="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-gold" />
        </div>

        <div>
          <label for="message" class="block text-xs font-mono uppercase tracking-wide text-gray-500 mb-1.5">Message</label>
          <textarea id="message" name="message" required maxlength="2000" rows="5"
                    class="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-gold"></textarea>
        </div>

        <button type="submit" id="contact-submit"
                class="inline-flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-gold-strong transition-colors">
          Send message ${icon('mail', 15)}
        </button>
        <p id="contact-feedback" class="text-sm mt-2" role="status" aria-live="polite"></p>
      </form>
    </div>
  </section>`;
}

module.exports = { contactPage };
