const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';
const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'styles.css'
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //     title: '盘古',
    //     filename: 'index.html', // Name of file in ./dist/
    //     template: '../public/index.html', // Name of template in ./src
    //     hash: true
    // })
];

if (!dev) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'webpack-report.html',
            openAnalyzer: false
        })
    );
}

module.exports = {
    mode: dev ? 'development' : 'production',
    context: path.join(__dirname, 'src'),
    devtool: dev ? 'none' : 'source-map',
    entry: {
        app: './client/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [path.resolve('./src'), 'node_modules']
        // extensions: ['js', 'jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins
    };
