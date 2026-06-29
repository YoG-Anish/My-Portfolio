/**
 * Escapes text for safe insertion into HTML.
 * Since this project has no templating engine doing this
 * automatically, every piece of dynamic text MUST pass through
 * here before it's interpolated into a view. This is the single
 * most important function in the codebase from a security
 * standpoint — it's what stops a stray "<" in a name or message
 * from being interpreted as markup.
 */
function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = { escapeHtml };
