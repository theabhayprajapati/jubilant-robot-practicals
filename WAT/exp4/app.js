const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;

  switch (req.url) {
    case '/':
      filePath = './index.html'; // Default HTML file
      break;
    case '/data.csv':
      filePath = './data.csv'; // CSV file
      break;
    case '/data.json':
      filePath = './data.json'; // JSON file
      break;
    case '/document.pdf':
      filePath = './document.pdf'; // PDF file
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('File not found');
      return;
  }

  serveFile(filePath, res);
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('Internal Server Error');
      console.log(err);
    } else {
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.csv':
      return 'text/csv';
    case '.json':
      return 'application/json';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'text/html';
  }
}

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
