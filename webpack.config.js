const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, './src/img'),
                  to:   path.resolve(__dirname, './dist/img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [/*"style-loader"*/MiniCssExtractPlugin.loader, "css-loader"]  
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                loader: "file-loader",
                options: {
                  name: "[to][name].[ext]",
                }
            }
        ]
    }
}