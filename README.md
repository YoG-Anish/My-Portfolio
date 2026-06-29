# Anish Maka — Portfolio (sidebar edition)

A multi-page personal site with a persistent sidebar, built on plain
Node.js — **no npm install required**, no framework, no database.
Content lives in small editable data files; pages are real server
routes, not a single-page app.

## Run it

```bash
node server.js
```

Then open **http://localhost:3000**. That's it — there is nothing to
build or install. Change the port with `PORT=8080 node server.js`.

## Project structure

```
server.js                  Entry point — starts the HTTP server
src/
  routes.js                 Maps URLs to pages/controllers
  views/
    layout.js                Shared <head>, sidebar, footer wrapper
    sidebar.js                The sidebar component
    pages/                    One file per page (about.js, skills.js, ...)
  controllers/
    contactController.js      Handles POST /api/contact
    resumeController.js       Handles GET /resume/download
  data/                       <-- EDIT THESE to update site content
    profile.js                 Name, role, bio, quick facts, email
    education.js
    skills.js
    portfolio.js                Same shape as your previous projects list
    experience.js
    achievements.js             Empty by default — add real ones
    updates.js                  Empty by default — a lightweight changelog
    nav.js                      Sidebar menu items (add a page here too)
  middleware/security.js      Security headers
  utils/                      Small focused helpers (see below)
public/
  css/custom.css             Hand-written CSS additions to Tailwind
  js/main.js                  Theme toggle, sidebar collapse, contact form, etc.
  js/tailwind-config.js       Brand colors/fonts for the Tailwind CDN build
  files/resume.pdf            Put your resume here (see below)
data-store/messages.json      Contact form submissions land here
```

## Editing content

Almost everything is a plain array or object in `src/data/`. For
example, to add a project, open `src/data/portfolio.js` and copy one
of the existing objects:

```js
{
  id: 7,
  title: "Your Project",
  category: "WooCommerce",
  description: "One or two plain sentences.",
  tools: ["WordPress", "WooCommerce"],
  year: "2025",
  link: "https://example.com"   // leave "" for "Coming soon"
}
```

Same pattern for `education.js`, `experience.js`, `achievements.js`,
and `updates.js`. To add a whole new sidebar page, add an entry to
`src/data/nav.js`, create a view in `src/views/pages/`, and register
it in the `PAGES` object at the top of `src/routes.js`.

## The resume button

`GET /resume/download` looks for `public/files/resume.pdf`. If it's
not there, the button on the Resume page shows a friendly note
instead of a broken link — drop a real PDF in and it starts working
immediately, no code changes needed.

## The contact form

The form works two ways:

- **With JavaScript** (`public/js/main.js`): submits via `fetch`,
  shows inline success/error text, no page reload.
- **Without JavaScript**: the `<form>` posts normally and the server
  redirects back to `/contact` with a status banner.

Submissions are validated server-side (never trust the client),
checked against a honeypot field, rate-limited per IP, and appended
to `data-store/messages.json`. **No email is actually sent** — there
are no SMTP credentials configured, and I won't invent ones. To wire
up real email delivery, the cleanest options are:

1. A transactional email API (Resend, Postmark, SendGrid) — call its
   HTTP API from `src/controllers/contactController.js` after a
   successful save.
2. `nodemailer` with your own SMTP credentials, kept in environment
   variables — never commit credentials to the repo.

## Security notes

- All dynamic text is escaped with `src/utils/escapeHtml.js` before
  it's inserted into HTML — no `innerHTML`/raw concatenation of
  untrusted text anywhere.
- Project/portfolio links are only rendered as real `href`s if they
  start with `http://` or `https://` — blocks `javascript:`-style
  link injection even if `data/portfolio.js` is edited carelessly.
- `src/middleware/security.js` sets a Content-Security-Policy,
  `X-Frame-Options`, `X-Content-Type-Options`, and a restrictive
  `Permissions-Policy` on every response.
- Static file serving (`src/utils/staticServer.js`) resolves paths
  and refuses to serve anything outside of `/public` — blocks
  path-traversal attempts like `/../../etc/passwd`.
- The contact endpoint has a body-size cap, a honeypot field, IP
  rate-limiting, and full server-side re-validation regardless of
  what the client sent.

## Deploying

This is a plain Node process — run it behind a reverse proxy
(Nginx, Caddy) that handles HTTPS, and keep the app itself on a
local port. A process manager like `pm2` or a systemd unit will keep
it running and restart it if it crashes:

```bash
pm2 start server.js --name portfolio
```

If you deploy behind a proxy, also update `getClientIp()` in
`src/controllers/contactController.js` to read `X-Forwarded-For`
*only* once you've configured the proxy to set it reliably —
trusting that header by default would let visitors spoof their own
rate limit.
# My-Portfolio
