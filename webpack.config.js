const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: './index.js', // assumes your entry point is the index.js in the root of your project folder
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'] // if you aren't using 'babel-preset-env', then omit the 'env'
          }
        }, 
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
      ]
    },  
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      })
    ],
    watchOptions: {
      ignored: ['node_modules']
    }
  };