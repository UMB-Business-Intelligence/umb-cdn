const path = require('path');

module.exports = {
  entry: './assets/miccheck.js',  // path to our input file
  output: {
    filename: 'output-bundle.js',  // output bundle file name
    path: path.resolve(__dirname, './dist/js'),  // path to our Django static directory
  },
};