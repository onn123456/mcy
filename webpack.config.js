let Hwp=require("html-webpack-plugin")
let Ext=require("extract-text-webpack-plugin")
let webpack=require("webpack")

module.exports={
    entry:__dirname+"/src/main.js",
    output:{
        path:__dirname+"/dist/",
        filename:"app.js",
        publicPath:"/"
    },
    devtool:"source-map",
    devServer:{
        contentBase:__dirname+"/dist/",
        port:3000,
        inline:true,
        publicPath:"/",
        historyApiFallback:true,
        disableHostCheck:true
        
    },
    module:{
        rules:[
            {test:/\.css$/,loader:Ext.extract("css-loader")},
            {test:/\.less$/,loader:Ext.extract("css-loader!less-loader")},
            // {test:/\.html$/,loader:"string-loader"},
            {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader"}
        ]
    },
    plugins:[
        new Hwp({
            template:"index.html",
            filename:"index.html",
            inject:true
        }),
        new Ext("app.css"),
        new webpack.ProvidePlugin({
            React:"react"
        })
    ]
}