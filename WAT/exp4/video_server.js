const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const videoPath = 'sample.mp4'; // Replace with your video file path

  res.writeHead(200, {
    'Content-Type': 'video/mp4',
  });

  const videoStream = fs.createReadStream(videoPath);

  videoStream.pipe(res);
});

const port = 8280;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});