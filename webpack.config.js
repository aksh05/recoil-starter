const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const IS_DEV = true;
module.exports = {
  mode: IS_DEV? "development": "production",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: IS_DEV ? "/":"",
    filename: IS_DEV ?"ez-forms/js/[name].js": "ez-forms/js/[name].[chunkhash].js",
    chunkFilename: IS_DEV ? "ez-forms/js/[name].chunk.js": "ez-forms/js/[name].chunk.[chunkhash].js"
  },
  target: "web",
  resolve: { extensions: [".ts", ".js", ".tsx"] },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  optimization: {
    minimize: !IS_DEV,
  },
  devtool: IS_DEV ? "inline-source-map" : false,
  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /(\\|\/)src(\\|\/).+\.js$/,
        parser: { system: true },
      },
      {
        test: /\.(png|jpeg|gif|svg)$/, 
        use: [{
          loader: "url-loader",
          options: {
            name: IS_DEV ?"ez-forms/img/[name].[ext]": "ez-forms/img/[name]-[hash:8].[ext]"
          }
        }]
      },
      {
        test: /\.(woff|ttf|eot|woff2)$/, 
        use: [{
          loader: "file-loader",
          options: {
            name: "ez-forms/fonts/[name].[ext]"
          }
        }]
      },
      {
        test: /\.css$/,
        use:[{
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          query: {
            module: true
          }
        },
        {
          loader: "postcss-loader"
        }
      ]
      }
    ],
  },

  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      showErrors: true,
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV? "ez-forms/css/bundle.css":"ez-forms/css/bundle.[contenthash:6].css",
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
