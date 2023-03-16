const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/createArticle.html"),
          to: path.resolve(__dirname, "dist/createArticle.html"),
        },
        {
          from: path.resolve(__dirname, "src/getArticle.html"),
          to: path.resolve(__dirname, "dist/getArticle.html"),
        },
      ],
    }),
  ],
};
