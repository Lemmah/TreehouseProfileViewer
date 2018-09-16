const Profile = require('./profile.js');
const renderer = require('./renderer.js');

/**
 * Handles HTTP route GET  or POST  for / ie Home
 * @param {Object} request - The http incoming request or message.
 * @param {Object} response - The response message the server will send.
 */
function home(request, response) {
  // if url == '/' & GET
    // show search
    if (request.method === 'GET') {
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
    } else if (request.method === 'POST') {
      // if url == '/' & POST
      // redirect to /:username
      user(request, response);
    } else {
      renderer.view('header', {}, response);
      renderer.view('error', { errorMessage: 'Method not allowed' });
      renderer.view('footer', {}, response);
    }
  response.end();
}

/**
 * Handles HTTP route GET /:username 
 * @param {Object} request - The http incoming request or message.
 * @param {Object} response - The response message the server will send.
 */
function user(request, response) {
  // if url == '/:username' & GET
  if (request.method === 'GET') {
    renderer.view('header', {}, response);
    // get JSON from Treehouse using username
    const userProfile = new Profile(`${request.url.slice(1)}`);
    // on 'end' show profile
    userProfile.on('end', userData => {
      const values = {
        gravatarUrl: userData.gravatar_url,
        name: userData.name,
        userName: userData.profile_name,
        badgeCount: userData.badges.length,
        javaScriptPoints: userData.points.JavaScript
      }
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });
    // on 'error' show error
    userProfile.on('error', error => {
      renderer.view('error', { errorMessage: error.message }, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;