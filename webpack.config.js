const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 2 must haves: entry -> output
// The entry point (where app kicks off).
// Also tell it where to output the final bundle file.

// loader - lets you customize the behaviour of webpack when it loads a given file
// (how a file gets transformed when webpack uses it)

// devtool - use a sourcemap to make debugging easier (gives better console logs)

// devServer - use webpack's server that watches and rebuilds. Requires contentBase (the dir to serve)

// (process.env.NODE_ENV) - Heroku automatically sets it to 'production', we set it to 'test'
// in in our package.json "test" script, if neither of those we set it to 'production' here.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};
