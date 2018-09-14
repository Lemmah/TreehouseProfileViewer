/**
 * Handles HTTP route GET  or POST  for / ie Home
 * @param {Object} request - The http incoming request or message.
 * @param {Object} response - The response message the server will send.
 */
function home(request, response) {
  // if url == '/' & GET
    // show search
    if (request.method === 'GET') {
      response.write('Header.\n');
      response.write('Search.\n');
      response.end('Footer.\n');
    } else if (request.method === 'POST') {
      // if url == '/' & POST
      // redirect to /:username
      response.end('Redirecting to ...')
    } else {
      response.end('Method not allowed.')
    }
}

/**
 * Handles HTTP route GET /:username 
 * @param {Object} request - The http incoming request or message.
 * @param {Object} response - The response message the server will send.
 */
function user(request, response) {
  // if url == '/:username' & GET
  if (request.method === 'GET') {
    response.write('Header.\n');
    response.write(`${request.url.slice(1)}\n`);
    response.end('Footer.\n');
    // get JSON from Treehouse
      // on 'end'
        // show profile
      // on 'error'
        // show error
  }
}

module.exports.home = home;
module.exports.user = user;