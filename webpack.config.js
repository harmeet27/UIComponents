const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { HOST='0.0.0.0', PORT = 6060 } = process.env;

module.exports = () => {
  const modulesFolderPath = path.resolve(__dirname, 'node_modules');
  return{
    entry: './src/index.js',
    output:{
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].[hash:8].js',
      publicPath: '/'
    },
    resolve:{
        modules: [modulesFolderPath, 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias:{
            components: path.resolve(__dirname, 'src/components')
        }
    },
    module: {
        rules: [
          {
            test: /(\.jsx|\.js)$/,
            exclude: /node_modules/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            use: [
              'babel-loader'
            ]
          },
          {
              test: /\.css$/,
              include: [
                path.resolve(__dirname, 'src')
              ],
              use:['style-loader', 'css-loder']
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
        ]
      },
      devServer: {
        host: HOST,
        port: PORT,
        public: `localhost:${PORT}`,
        open: true,
        headers: {'Access-Control-Allow-Origin': '*'}
      },
      plugins: [
        new ProgressBarPlugin({
            clear: false
        }),
        new HtmlWebPackPlugin({
          cache: true,
          template: "./src/static/index.html",
          filename: "./index.html"
        })
      ]
  }
};