const fs = require('fs');
const path = require('path');

const RESUME_PATH = path.join(__dirname, '..', '..', 'public', 'files', 'resume.pdf');

function handleResumeDownload(req, res) {
  if (!fs.existsSync(RESUME_PATH)) {
    res.writeHead(303, { Location: '/resume' });
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="Anish-Maka-Resume.pdf"',
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(RESUME_PATH).pipe(res);
}

module.exports = { handleResumeDownload };
