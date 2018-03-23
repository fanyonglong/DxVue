const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root= path.resolve(__dirname,'../');
const entrys={};
module.exports ={
    entry:'',
    output: {
        filename: 'index.js',
        path: path.join(root, 'dist'),
       // libraryTarget: "umd"
    },
    module: {
        // noParse: /jquery|vue|lodash/,
         rules: [
           {
             test: /\.vue$/,
             use:'vue-loader',
             options:{

             }
         }]
    },         
    plugins:[]
};