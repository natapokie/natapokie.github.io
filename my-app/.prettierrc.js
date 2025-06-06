/** @type {import("prettier").Config} */
module.exports = {
  semi: true,                  // Add semicolons at the end of statements
  singleQuote: true,          // Use single quotes instead of double
  printWidth: 80,             // Wrap lines at 80 characters
  tabWidth: 2,                // Indent with 2 spaces
  trailingComma: 'es5',       // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  bracketSpacing: true,       // Add space between brackets in object literals
  arrowParens: 'avoid',       // Omit parens when possible (e.g., x => x)
};
