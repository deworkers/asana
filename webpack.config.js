const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js?v=[hash]',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "less-loader",
                ],
            },
            { 
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css?v=[hash]'
        }),
        new webpack.DefinePlugin({
            BASE_URL: '"https://task.sbtest.ru/api"',
            IMG_URL: '"https://task.sbtest.ru/files/"',
            WS_URL: '"wss://task.sbtest.ru/api/ws"'
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src/compleet-components')
        },
        modules: ["node_modules"]
    },
    devtool: 'source-map',
    devServer: {
        static: {
          directory: path.join(__dirname, '/dist/'),
        },
        compress: true,
        port: 9000,
        hot: true,
    }
    
};
