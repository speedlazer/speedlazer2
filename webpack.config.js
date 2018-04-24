const path = require("path");
const supportedBrowsers = require("browserslist").readConfig(
  path.join(__dirname, "browserslist")
).defaults;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babel = {
  presets: [
    ["stage-3"],
    [
      "env",
      {
        targets: {
          browsers: supportedBrowsers
        },
        modules: false,
        loose: true,
        debug: true
      }
    ]
  ],
  plugins: ["transform-class-properties"]
};

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/")
    },
    extensions: [".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    host: "127.0.0.1",
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: babel
      }
    ]
  }
};
