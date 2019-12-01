const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([
      {from: './src/examples', to: 'examples'},
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    host: 'localhost',
  },
  module: {
    rules: [
      {
        test: /\.(tpl.html|css)$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
          },
        }],
      },
    ],
  },
};
