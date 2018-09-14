// Problem: We need an easy way to look at a Treehouse user's badge count and JavaScript points on the webrowser.
// Solution: Use Nodejs to perform the profile look ups and serve our templates via HTTP

const http = require('http');

/**
 * Creates a http server that listens on port 8000.
 */
const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  const profileUrl = /\/\w+/.test(request.url);
  if (request.url === '/') {
    homeRoute(request, response);
  } else if (profileUrl) {
    response.end(`Redirecting to ${request.url.slice(1)}`);
  }
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);


/**
 * Handles HTTP route GET  or POST  for / ie Home
 * @param {Object} request - The http incoming request or message.
 * @param {Object} response - The response message the server will send.
 */
function homeRoute(request, response) {
  // if url == '/' & GET
    // show search
    if (request.method === 'GET') {
      response.write('Header.\n');
      response.write('Body.\n');
      response.end('Footer.\n');
    } else if (request.method === 'POST') {
      // if url == '/' & POST
      // redirect to /:username
      response.end('Redirecting to ...')
    }
}

// 3. Handle HTTP route GET /:username eg /lemmah
  // if url == '/:username' & GET
    // get JSON from Treehouse
      // on 'end'
        // show profile
      // on 'error'
        // show error

// 4. Function that handles the reading of files and merge in values
  // read from file and get a string
  // merge values into string
