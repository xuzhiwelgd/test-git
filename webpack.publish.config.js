//部署阶段的配置文件
var webpack = require("webpack");

var path = require("path");

//提取css插件
var ExtractTextPlugin= require("extract-text-webpack-plugin");

module.exports = {
    //入口文件
/*    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/js/app.js')
    ],*/
        entry:{
            app:path.resolve(__dirname,'src/js/app.js'),
            vendors:['react','react-dom']
        },
    //输出文件
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,//用正则来匹配文件路径，这段意思是匹配js或者jsx文件
                loader:'babel',//加载模块“babel” 是 “babel-loader” 的缩写
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader:'style!css'
            },
            {
                test:/\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                //loader:'style!css!sass'
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url?limit=25000&name=images/[name].[ext]'
            }
        ]
    },
    resolve:{
        root:'./node_modules',
        extensions:['','.js','.json','.scss','.jsx']
    },
    plugins:[
        //分离第三方的插件
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        //设置提取出来的css文件的位置
        //new ExtractTextPlugin("[name].css")
        new ExtractTextPlugin("[name].css"),
        //定义默认环境的插件，性能优化
        new webpack.DefinePlugin({
            'process.env':{
                    NODE_ENV:'"production"'
            }
        }),
        //压缩和混淆代码插件
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ]
}