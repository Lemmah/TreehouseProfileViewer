// Problem: We need an easy way to look at a Treehouse user's badge count and JavaScript points on the webrowser.
// Solution: Use Nodejs to perform the profile look ups and serve our templates via HTTP

// 1. Create a web server.


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
