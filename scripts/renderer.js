const fs = require('fs');

/**
 * Replaces the template strings in the templates with the actual values.
 * @param {Object} values - The user defined values to be rendered.
 * @param {Object} content - The content of the target template file.
 */
function mergeValues(values, content) {
  for (let value in values) {
    content = content.replace(`{{${value}}}`, values[value]);
  }

  return content;
}

/**
 * Handles the reading of files and merge in values.
 * @param {String} templateName - The name of the template without the extension.
 * @param {Object} values - The object that contains the values to inject into the template.
 * @param {Object} response - The response Object of the request we're writting into.
 */
function view(templateName, values, response) {
  // Read from the template file : append the path and extension to the template name.
  let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: 'utf8'});
  // Insert values into the content
  fileContents = mergeValues(values, fileContents);
  // Write out content on Response
  response.write(fileContents);
}

module.exports.view = view;