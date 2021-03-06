const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const querystring = require('querystring');

/**
 * Handles HTTP route GET  or POST  for / ie Home
 * @param {Object} request - The http incoming request or message.
 * @param {Object} response - The response message the server will send.
 */
function home(request, response) {
    if (request.method === 'GET') {
      // if url == '/' & GET
        // show search
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else if (request.method === 'POST') {
      // if url == '/' & POST
        // redirect to /:username
      request.on('data', function(postBody){
        let query = querystring.parse(postBody.toString());
        response.writeHead(303, { 'Location': '/' + query.username });
        response.end();
      });
    } else {
      renderer.view('header', {}, response);
      renderer.view('error', { errorMessage: 'Method not allowed' }, response);
      renderer.view('footer', {}, response);
      response.end();
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