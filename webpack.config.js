var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devServer: {
        historyApiFallback: true,
        inline: true,
        contentBase: './src',
        hot: true,
        port: 9000
    },
    devtool: isProduction ? '' : 'source-map',
    resolve: {
        alias: {
            components:     path.resolve(__dirname, 'dev', 'js', 'components'),
            containers:       path.resolve(__dirname, 'dev', 'js', 'containers'),
            services:       path.resolve(__dirname, 'dev', 'js', 'services'),
            lib:           path.resolve(__dirname, 'dev', 'js', 'lib'),
            scss:           path.resolve(__dirname, 'dev', 'scss')
        },
        extensions: ['', '.json', '.jsx', '.js']
     },
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },

            {test: /\.css$/, loader: 'style-loader!css-loader?sourceMap'},
            { test: /\.less$/,loader: 'style-loader!css-loader?sourceMap!less-loader?sourceMap'},
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader'
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
            { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" }
        ]
    },
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'js/bundle.min.js',
        publicPath: isProduction ? '/src/' : '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            classie: "desandro-classie",
            imagesLoaded: "imagesloaded",
            Masonry: "masonry-layout"
        }),
        new webpack.DefinePlugin({
            imagesToLoad: JSON.stringify(fs.readdirSync(path.join(__dirname, 'src/images'))),
            'process.env': {
                NODE_ENV: JSON.stringify(isProduction ? 'production' : '')
            }
        })
    ]
};
