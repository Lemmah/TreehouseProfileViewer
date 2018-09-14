// Problem: We need an easy way to look at a Treehouse user's badge count and JavaScript points on the webrowser.
// Solution: Use Nodejs to perform the profile look ups and serve our templates via HTTP

// 1. Create a http web server.
const http = require('http');

/**
 * Creates a http server that listens on port 8000.
 */
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('This is before the end.\n');
  res.end('Hello, World.\n');
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);


// 2. Handle HTTP route GET / or POST / ie Home
  // if url == '/' & GET
    // show search
  // if url == '/' & POST
    // redirect to /:username
  

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
