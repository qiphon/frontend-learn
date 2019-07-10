const argv = require('yargs-parser')(process.argv.slice(2))
// console.log('===========')
process.env.NODE_ENV = argv.mode || 'development';
const _modeConfig = require(`./config/webpack.${process.env.NODE_ENV}.js`)

const merge = require('webpack-merge')
// 路径
const { join, resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

const isDev = process.env.NODE_ENV === 'development' ? true : false

// css 默认项
const defaultCssLoader = (opts, preProcessor) => {
    l = [
        isDev && { loader: 'style-loader', options: { sourceMap: true } }, // creates style nodes from JS strings
        { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true , ...opts} }, // translates CSS into CommonJS
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: (loader) => {
                    // console.log(loader);
                    [
                        require('postcss-import')({ root: loader.resourcePath }),
                        require('postcss-flexbugs-fixes'), // 修复css bug
                        require('autoprefixer')(),  // CSS浏览器兼容
                        require('cssnano')(), // css minify
                        require('postcss-preset-env')({ // lets you convert modern CSS into something most browsers can understand
                            autoprefixer: {
                                flexbox: 'no-2009',
                            },
                            stage: 3,
                        }),
                    ]
                },
                sourceMap: true
            }
        },
    ].filter(Boolean)
    if (preProcessor) {
        l.push({
            loader: preProcessor,
            options: {
                sourceMap: !isDev,
            },
        });
    }
    return l;
}
const webpackConfig = {
    entry: {
        app: resolve('./src/web/index.tsx')
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',
    // loader
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less/,
                use: defaultCssLoader({}, 'less-loader' ),
                // { loader: 'less-loader' } // compiles Less to CSS
            },
            {
                test: /\.scss/,
                use: defaultCssLoader({}, 'sass-loader' ),
                // { loader: 'sass-loader' } // compiles scss to CSS
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
}

module.exports = merge(webpackConfig, _modeConfig)