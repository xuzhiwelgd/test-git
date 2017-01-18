//开发阶段的配置文件
var path = require("path");

//自动打开游览器插件
var OpenBrowserPlugin = require("open-browser-webpack-plugin"); 

module.exports = {
    //入口文件
    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/js/app.js')
    ],
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
                loader:'style!css'
            },
            {
                test:/\.scss$/,
                loader:'style!css!sass'
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url?limit=25000'
            }
        ]
    },
    resolve:{
        root:'./node_modules',
        extensions:['','.js','.json','.scss','.jsx']
    },
    plugins:[
        new OpenBrowserPlugin({url:'http://localhost:8080',browser:'chrome'})
    ]
}