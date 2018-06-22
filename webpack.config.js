const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'femtofiber.min.js',
    path: path.resolve('build'),
    library: "",
    libraryTarget: "window",
  }
};