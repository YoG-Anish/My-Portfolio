(function () {
  'use strict';

  function qs(sel, scope) {
    return (scope || document).querySelector(sel);
  }

  /* ---------- theme toggle (persisted) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const btn = qs('#theme-toggle');
    const saved = window.localStorage ? localStorage.getItem('theme') : null;
    if (saved === 'light') applyTheme('light');

    function applyTheme(mode) {
      root.setAttribute('data-theme', mode);
      root.classList.toggle('dark', mode !== 'light');
      if (btn) {
        btn.setAttribute('aria-pressed', String(mode === 'light'));
        qs('.icon-moon', btn).classList.toggle('hidden', mode === 'light');
        qs('.icon-sun', btn).classList.toggle('hidden', mode !== 'light');
      }
    }

    if (btn) {
      btn.addEventListener('click', function () {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable, ignore */ }
      });
    }
  }

  /* ---------- sidebar collapse (desktop, persisted) ---------- */
  function initCollapse() {
    const sidebar = qs('#sidebar');
    const toggle = qs('#collapse-toggle');
    const main = qs('#main-content');
    if (!sidebar || !toggle) return;

    function setCollapsed(collapsed) {
      sidebar.classList.toggle('collapsed', collapsed);
      if (main) main.classList.toggle('md:ml-[88px]', collapsed);
      if (main) main.classList.toggle('md:ml-[280px]', !collapsed);
      toggle.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    }

    let collapsed = false;
    try { collapsed = localStorage.getItem('sidebarCollapsed') === '1'; } catch (e) { /* ignore */ }
    setCollapsed(collapsed);

    toggle.addEventListener('click', function () {
      collapsed = !sidebar.classList.contains('collapsed');
      setCollapsed(collapsed);
      try { localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0'); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- mobile drawer ---------- */
  function initMobileNav() {
    const sidebar = qs('#sidebar');
    const overlay = qs('#mobile-overlay');
    const openBtn = qs('#mobile-open-btn');
    const closeBtn = qs('#mobile-close');
    if (!sidebar || !overlay || !openBtn) return;

    function open() {
      sidebar.classList.add('mobile-open');
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.remove('hidden');
      openBtn.setAttribute('aria-expanded', 'true');
    }
    function close() {
      sidebar.classList.remove('mobile-open');
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
      openBtn.setAttribute('aria-expanded', 'false');
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- copy page link ---------- */
  function initCopyLink() {
    const btn = qs('#copy-link');
    if (!btn) return;

    btn.addEventListener('click', async function () {
      const url = window.location.href;
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          copied = true;
        }
      } catch (e) {
        copied = false;
      }
      if (!copied) {
        try { window.prompt('Copy this link:', url); } catch (e) { /* ignore */ }
        return;
      }
      const original = btn.innerHTML;
      btn.setAttribute('title', 'Copied!');
      setTimeout(function () { btn.removeAttribute('title'); }, 1500);
    });
  }

  /* ---------- contact form (progressive enhancement) ---------- */
  function initContactForm() {
    const form = qs('#contact-form');
    if (!form) return;
    const feedback = qs('#contact-feedback');
    const submitBtn = qs('#contact-submit');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      if (feedback) {
        feedback.textContent = 'Sending…';
        feedback.className = 'text-sm mt-2 text-gray-400';
      }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'fetch'
          },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const result = await res.json();

        if (feedback) {
          feedback.textContent = result.message || (result.ok ? 'Sent.' : 'Something went wrong.');
          feedback.className = 'text-sm mt-2 ' + (result.ok ? 'text-teal' : 'text-red-400');
        }
        if (result.ok) form.reset();
      } catch (err) {
        if (feedback) {
          feedback.textContent = 'Network error — please try again.';
          feedback.className = 'text-sm mt-2 text-red-400';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
  }

  function setFooterYear() {
    const el = qs('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initCollapse();
    initMobileNav();
    initCopyLink();
    initContactForm();
    initReveal();
    setFooterYear();
  });
})();
