const path = require("path");
// const uglify = require("uglifyjs-webpack-plugin");
var webpack = require("webpack");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var ProgressBarPlugin = require("progress-bar-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode);

// Cesium源码所在目录
const cesiumSource = "node_modules/cesium/Source";
const dirCesiumSource = '../node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
  mode: "production",
  entry: {
    main: "./app/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].bundle[chunkhash:7].js",
    publicPath: "",
    chunkFilename: "js/[name].chunk[chunkhash:7].js",
  },
  module: {
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
              //  "@babel/preset-typescript"
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf|png)$/,
        loader: "file-loader",
        options: {
          name: "../static/[name].[hash:5].[ext]",
          publicPath: "../",
        },
      },
    ],
  },
  plugins: [
    // new uglify()
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify('production'),
      _DEV_: JSON.stringify(false),
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    //加入cesium资源
    new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]}),
    new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]}),
    new CopyWebpackPlugin({patterns:[{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]}),
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify('')
    }),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true,
      },
      hash: true,
      template: "./index.html",
      // favicon: "./favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle[chunkhash:7].css",
      chunkFilename: "css/[name].chunk[chunkhash:7].css",
    }),
    new CleanWebpackPlugin(), // 打包前清空打包文件
    new ProgressBarPlugin({
      // format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'vender', to: 'vender' },
    //   ],
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // new UglifyJsPlugin({
      //     cache: true,
      //     parallel: true,
      //     sourceMap: true, // set to true if you want JS source maps,
      //     uglifyOptions: {
      //         warnings: false,
      //         parse: {},
      //         compress: {},
      //         mangle: true, // Note `mangle.properties` is `false` by default.
      //         output: null,
      //         toplevel: false,
      //         nameCache: null,
      //         ie8: false,
      //         keep_fnames: false,
      //       }
      //   }
      // ),
      new TerserPlugin({
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    // runtimeChunk:true,
    splitChunks: {
      cacheGroups: {
        // 其次: 打包业务中公共代码
        commons: {
          // 抽离自己写的公共代码
          chunks: "all",
          name: "myCommon", // 打包后的文件名，任意命名
          minChunks: 2, // 最小引用2次
          minSize: 0, // 只要超出0字节就生成一个新包
          priority: 5,
        },
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "all",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
      },
    },
  },
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
    host: "172.19.112.74",
    compress: true,
    port: 9109,
  },
  stats: "errors-only",
};
