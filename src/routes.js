const { layout } = require('./views/layout');
const { serveStatic } = require('./utils/staticServer');
const { applySecurityHeaders } = require('./middleware/security');

const { aboutPage } = require('./views/pages/about');
const { educationPage } = require('./views/pages/education');
const { skillsPage } = require('./views/pages/skills');
const { portfolioPage } = require('./views/pages/portfolio');
const { achievementsPage } = require('./views/pages/achievements');
const { experiencePage } = require('./views/pages/experience');
const { resumePage } = require('./views/pages/resume');
const { updatesPage } = require('./views/pages/updates');
const { contactPage } = require('./views/pages/contact');
const { notFoundPage } = require('./views/pages/notFound');

const { handleContactSubmit } = require('./controllers/contactController');
const { handleResumeDownload } = require('./controllers/resumeController');

// Each page route is declared once here: a slug, a title/description
// for <head>, and the function that builds the page's inner content.
const PAGES = {
  about: { title: 'About', description: 'Backend-focused WordPress developer building custom themes and WooCommerce stores.', render: aboutPage },
  education: { title: 'Education', description: 'Education background.', render: educationPage },
  skills: { title: 'Skills', description: 'Development and visual skills.', render: skillsPage },
  portfolio: { title: 'Portfolio', description: 'Selected WooCommerce and WordPress projects.', render: portfolioPage },
  achievements: { title: 'Achievements', description: 'Certifications, awards, and milestones.', render: achievementsPage },
  experience: { title: 'Experience', description: 'Work experience.', render: experiencePage },
  resume: { title: 'Resume', description: 'Download my resume.', render: resumePage },
  updates: { title: 'Updates', description: 'Recent updates.', render: updatesPage }
};

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function renderPage(res, slug, statusCode = 200) {
  const page = PAGES[slug];
  sendHtml(res, statusCode, layout({
    title: page.title,
    description: page.description,
    activePage: slug,
    content: page.render()
  }));
}

async function handleRequest(req, res) {
  applySecurityHeaders(res);

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, 'http://localhost');
  } catch (err) {
    sendHtml(res, 400, '<h1>Bad request</h1>');
    return;
  }
  const pathname = parsedUrl.pathname;

  // 1. Static assets (CSS/JS/images/files) take priority.
  if (serveStatic(req, res, pathname)) return;

  // 2. Root redirects to the about page.
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(302, { Location: '/about' });
    res.end();
    return;
  }

  // 3. Contact form submission.
  if (pathname === '/api/contact' && req.method === 'POST') {
    await handleContactSubmit(req, res);
    return;
  }

  // 4. Resume download.
  if (pathname === '/resume/download' && req.method === 'GET') {
    handleResumeDownload(req, res);
    return;
  }

  // 5. Contact page needs its query params for the status banner.
  if (pathname === '/contact' && req.method === 'GET') {
    const status = parsedUrl.searchParams.get('status');
    const message = parsedUrl.searchParams.get('message');
    sendHtml(res, 200, layout({
      title: 'Contact',
      description: 'Get in touch.',
      activePage: 'contact',
      content: contactPage({ status, message })
    }));
    return;
  }

  // 6. Every other declared page, matched by slug.
  const slug = pathname.replace(/^\//, '');
  if (req.method === 'GET' && PAGES[slug]) {
    renderPage(res, slug);
    return;
  }

  // 7. Nothing matched.
  sendHtml(res, 404, layout({
    title: 'Not found',
    description: 'Page not found.',
    activePage: '',
    content: notFoundPage()
  }));
}

module.exports = { handleRequest };
