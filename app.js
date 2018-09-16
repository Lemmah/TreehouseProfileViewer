// Problem: We need an easy way to look at a Treehouse user's badge count and JavaScript points on the webrowser.
// Solution: Use Nodejs to perform the profile look ups and serve our templates via HTTP

const http = require('http');
const routes = require('./scripts/router.js');

/**
 * Creates a http server that listens on port 8000.
 */
const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  const profileUrl = /\/\w+/.test(request.url);
  if (request.url === '/') {
    routes.home(request, response);
  } else if (profileUrl) {
    routes.user(request, response);
  }
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
