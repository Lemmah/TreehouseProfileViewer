const Profile = require('./profile.js');

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
      response.end(`Redirecting to ${request.url.slice(1)} ...`);
      user(request, response);
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
    // get JSON from Treehouse
    const userProfile = new Profile(`${request.url.slice(1)}`);
      // on 'end'
        // show profile
    userProfile.on('end', userData => {
      const values = {
        gravatarUrl: userData.gravatar_url,
        name: userData.name,
        userName: userData.profile_name,
        badgeCount: userData.badges.length,
        javaScriptPoints: userData.points.JavaScript
      }
      response.end(`${values.name} has ${values.badgeCount} badges and ${values.javaScriptPoints} in JavaScript.`);
    });
      // on 'error'
        // show error
    userProfile.on('error', error => response.end(error.message));
  }
}

module.exports.home = home;
module.exports.user = user;