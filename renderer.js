// 4. Function that handles the reading of files and merge in values
  // read from file and get a string
  // merge values into string
const fs = require('fs');

function view(templateName, values, response) {
  // Read from the template file
  const fileContents = fs.readFileSync(`./views/${templateName}.html`);
  // Insert values into the content
  // Write out content on Response
  response.write(fileContents);
}

module.exports.view = view;