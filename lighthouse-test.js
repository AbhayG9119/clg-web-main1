const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const urls = [
  'http://localhost:3000',
  'http://localhost:3000/about',
  'http://localhost:3000/courses',
  'http://localhost:3000/contact',
  'http://localhost:3000/login',
  'http://localhost:3000/eligibility',
  'http://localhost:3000/faculty',
  'http://localhost:3000/free-courses',
  'http://localhost:3000/computer-basics',
  'http://localhost:3000/english-speaking',
  'http://localhost:3000/digital-marketing',
  'http://localhost:3000/career-guidance',
  'http://localhost:3000/personality-development',
  'http://localhost:3000/ncc',
  'http://localhost:3000/scholarship',
  'http://localhost:3000/admissionprocess',
  'http://localhost:3000/admissionquery',
  'http://localhost:3000/admin/login',
  'http://localhost:3000/staff',
  'http://localhost:3000/student'
];

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  const reportJson = runnerResult.lhr;

  // Write report to file
  const fs = require('fs');
  const path = require('path');
  const urlPath = new URL(url).pathname.replace(/\//g, '-').slice(1) || 'home';
  const htmlPath = path.join(__dirname, `lighthouse-report-${urlPath}.html`);
  const jsonPath = path.join(__dirname, `lighthouse-report-${urlPath}.json`);

  fs.writeFileSync(htmlPath, reportHtml);
  fs.writeFileSync(jsonPath, JSON.stringify(reportJson, null, 2));

  console.log(`Report for ${url} saved to ${htmlPath} and ${jsonPath}`);

  await chrome.kill();
}

async function runAllTests() {
  for (const url of urls) {
    try {
      console.log(`Running Lighthouse for ${url}`);
      await runLighthouse(url);
    } catch (error) {
      console.error(`Error running Lighthouse for ${url}:`, error);
    }
  }
}

runAllTests().catch(console.error);
