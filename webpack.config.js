const path = require("path");
const supportedBrowsers = require("browserslist").readConfig(
  path.join(__dirname, "browserslist")
).defaults;

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
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/build/",
    host: "127.0.0.1",
    port: 8080,
    open: true
  },
  resolve: {
    extensions: [".js"]
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
