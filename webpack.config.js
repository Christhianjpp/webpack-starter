const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {

    mode: 'development',

    output: {
        clean: true    // borra la carpeta dist
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
            }
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
