const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './src/template.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  output: {
    filename: 'app.bundle.js',

    path: path.resolve(__dirname, 'dist'),

    clean: true,
  },
};
