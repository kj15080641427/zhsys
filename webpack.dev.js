const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
//const CopyPlugin = require('copy-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Cesium源码所在目录
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

// const os = require("os");
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
module.exports = {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  entry: {
    main: "./app/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
    chunkFilename: "[name].chunk.js",
  },
  amd: {
    toUrlUndefined: true,
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: "3",
                  useBuiltIns: "usage",
                },
              ],
              "@babel/preset-react",
              // "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties",
              [
                "import",
                {
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: "css", // `style: true` 会加载 less 文件
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve("html-loader"),
          },
        ],
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf|png|jpg|svg)$/,
        loader: "file-loader",
        options: {
          name: "static/[name].[hash:5].[ext]",
          publicPath: "./",
        },
      },
    ],
  },
  plugins: [
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true,
      },
      template: "./index.html",
    }),
    new webpack.DefinePlugin({
      _DEV_: JSON.stringify(true),
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new ErrorOverlayPlugin(),
    //加入cesium资源
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(cesiumSource, "Assets"), to: "Assets" }],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(cesiumSource, "Widgets"), to: "Widgets" }],
    }),
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify(""),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'vender', to: 'vender' },
    //   ],
    // }),
    // new ForkTsCheckerWebpackPlugin({
    //     // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
    //     async: false
    // }),
    // 将TypeScript类型检查错误以弹框提示
    // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    // new ForkTsCheckerNotifierWebpackPlugin({
    //     title: 'TypeScript',
    //     excludeWarnings: true,
    //     skipSuccessful: true,
    // })
  ],
  resolve: {
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(
        __dirname,
        "./app/components/icons.js"
      ),
      "@node-addEventListener": "rc-util/lib/Dom/addEventListener",

      "@app": path.resolve(__dirname, "./app"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    host: "0.0.0.0",
    compress: true,
    port: 8888,
    hot: true,
    disableHostCheck: true,
    proxy: {
      "/api/*": {
        target: "http://47.115.10.75:9001",
        // pathRewrite: { "^/api": "" },
        secure: true,
        changeOrigin: true,
      },
    },
  },
};
