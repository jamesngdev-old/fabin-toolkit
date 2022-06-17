const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

require("dotenv").config()
const isDevelopment = process.env.NODE_ENV === "development"
const HtmlWebpackSelectAssetsPlugin = require("html-webpack-select-assets-plugin")

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    dashboard: "./src/dashboard/index.ts",
    background: "./src/background/index.js"
  },
  devtool: isDevelopment ? "inline-source-map" : false,
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" }
      ]
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "static/css/[name].[contenthash:6].css"
    }),
    new HtmlWebpackSelectAssetsPlugin({
      selector: (asset, context, type) => {
        return !asset?.attributes?.src?.includes("background.js")
      }
    }),
    new webpack.ProgressPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDevelopment }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDevelopment }
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: isDevelopment ? "[path][name].[ext]" : "static/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: isDevelopment
                ? "[path][name].[ext]"
                : "static/media/[name].[contenthash:6].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@dashboard": path.resolve("src/dashboard"),
      "@background": path.resolve("src/background")
    }
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    clean: true
  }
}
