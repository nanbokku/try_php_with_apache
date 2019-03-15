const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/../../server/public/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externals: {
    react: 'React',
  },
};
