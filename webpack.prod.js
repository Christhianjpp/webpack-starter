const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin')
const Terser = require('terser-webpack-plugin')


module.exports = {

    mode: 'production',

    output: {
        clean: true,    // borra la carpeta dist
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,          // busca los .HTML    
                loader: 'html-loader',     //    *agrega el index.js a el html
                options: {
                    sources: false,
                    minimize: false
                }
            },
            {
                test: /\.css$/i,             // busca todos los archivos CCS
                exclude: /styles.css$/,   // ejecuta el siguiente test de styles
                use: ['style-loader', 'css-loader']    // toma el CCS y lo agrega al index
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]

    },

    plugins: [
        new HtmlWebPack({        // crea un archivo html en la carpeta dist
            template: './src/index.html',   // agrega todos los datos del index a la carpeta dis index
            filename: './index.html'   //   cambia el nombre
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false

        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]


}
