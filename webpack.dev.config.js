const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {'tree-view': './src/tree-view.js', 'tree-view-all': './src/index.js'},
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([
      {from: './src/examples', to: 'examples'},
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: '/examples/index.html',
    port: 8080,
    host: 'localhost',
  },
  module: {
    rules: [
      // {
      //   test: /\.(tpl.html|css)$/,
      //   use: [{
      //     loader: 'html-loader',
      //     options: {
      //       minimize: true,
      //       removeAttributeQuotes: false,
      //       caseSensitive: true,
      //     },
      //   }],
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      // },
    ],
  },
};
