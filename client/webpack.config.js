const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/js')
  }
};
