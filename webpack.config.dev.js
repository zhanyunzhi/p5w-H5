var path =  require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');         //引入html处理插件
var webpack = require('webpack');         //引入插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");         // 引入css 单独打包插件

module.exports = {
    entry: {
        vendor: ['./src/lib/js/jquery-1.8.3.min.js','./src/lib/js/jquery.fullPage.min.js'],             //jquery,fullPage第三方插件打包到一起        因为没有模块化，所以只能原样引入
        //fullPage: './src/js/jquery.fullPage.min.js',        //fullPage      因为没有模块化，所以只能原样引入
        index: './src/index.js'           //入口文件1
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js',                   //name对应entry里面的属性名，chunkhash对应各自生成的hash
    },
    module: {
        rules: [
            {               //处理js文件，将es6转换
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['latest']
                    }
                }],
                exclude: [
                    path.resolve(__dirname,'node_modules'),          //排除不使用当前loader的文件
                    path.resolve(__dirname,'src/lib/js')          //排除不使用当前loader的文件
                ]
            },
            {                 //处理css文件
                test: /\.css$/,
                use: ExtractTextPlugin.extract({        //单独生成css文件
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {                 //处理sass文件
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({        //将sass编译后单独生成css文件
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            {                 //处理html文件，将html转成字符串
                test: /\.html$/,
                use: [
                    { loader: 'html-loader'}
                ]
            },
            {                 //处理图片文件
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            name: 'assets/[name].[ext]'       //改变打包存储的路径
                            //limit: 900                //小于20000B的图片打包成base64，超过的用file-loader打包
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('css/style.css')              //单独打包css文件,所有的css文件都会打包进这里
]
}