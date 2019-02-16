// https://webpack.js.org/concepts/
// https://github.com/webpack-contrib/mini-css-extract-plugin

// https://blog.johnwu.cc/article/webpack-4-sass-to-css.html
// https://www.kancloud.cn/hfpp2012/webpack-tutorial/467001
// https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/
// https://ithelp.ithome.com.tw/articles/10185426
const path = require("path");
//// 載入轉存 html 檔案的套件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: './dist'
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            style: {
              name: 'style',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader"
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    // fallback to style-loader in development
                    loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, 
                     // creates style nodes from JS strings
                    
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
                    options: {
                        sourceMap: true,
                        data: "$env: " + process.env.NODE_ENV + ";"
                    }
                }]
            },
        ]
    }
};