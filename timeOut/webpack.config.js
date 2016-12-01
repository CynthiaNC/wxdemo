var path = require('path'); // 应该是路径模块
var webpack = require('webpack'); // 应该是webpack模块
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// var TEM_PATH = path.resolve(APP_PATH, 'templates');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'index.js')
    },

    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: 'bundle.js'
    },

    devtool: 'cheap-module-source-map',

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },

    externals: {
      'jQuery': 'jQuery'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: APP_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: 9216,
                // name: '../images/[name].[ext]',
                name: '[name].[ext]',
                emitFile: false
            },
            include: APP_PATH
        }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap=true'),
        //sass编译出来->css, css loader读取css，将其传给style loader，转为style标签，然后下面的插件将style全部转出来到CSS文件中
        include: APP_PATH
      }]
    },
    plugins: [
        new ExtractTextPlugin('app.css')//如果没有这个插件，就见不到CSS文件
    ]
};
