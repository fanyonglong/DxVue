const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob=require('glob');
const commonconfig=require('./webpack.common');
const root= path.resolve(__dirname,'../');
const webpack=require('webpack');


module.exports =(env,argv)=>{
    var entrys={};
    var files=glob.sync(path.join(root,'src/components/**/*.vue'));
    files.map(function(filePath){
        entrys[path.dirname(filePath).split(/\\|\//g).pop()]=filePath; //path.relative(root,filePath);
    })
    console.log(entrys);
    return merge(commonconfig(env,argv),{
        entry:entrys,
        output: {
            filename: '[name].js',
            path: path.join(root, 'dist'),
           // libraryTarget: "umd"
        },      
        externals: {
            vue:"vue"
         },
        devtool:false,//'eval-cheap-module-source-map', 
        plugins:[new CleanWebpackPlugin(['dist/*'],{
            root: root
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common"
        }),
         new webpack.DefinePlugin({
            //'process.env': require('../config/dev.env')
          }),
        //   new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.resolve(root,'example/index.html'),
        //     inject: true
        //   })
        ]
    });
    
}