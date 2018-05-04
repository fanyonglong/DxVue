const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob=require('glob');
const commonconfig=require('./webpack.common');
const root= path.resolve(__dirname,'../');
const webpack=require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var entrys={};
// var files=glob.sync(path.join(root,'src/components/**/*.vue'));
// files.map(function(filePath){
//     entrys[path.filename(filePath)]=filePath;
// })
module.exports =(env,argv)=>{

    return merge(commonconfig(env,argv),{
        entry:{
            'index':path.resolve(root,'src/index.js')
        },
        output: {
            /**
             * 模板	描述
            [hash] 模块标识符(module identifier)的 hash
            [chunkhash] chunk 内容的 hash
            [name]模块名称
            [id]模块标识符(module identifier)
            [query]模块的 query，例如，文件名 ? 后面的字符串
            */
            filename: '[name].[chunkhash].js',//此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
            chunkFilename:'[id].[chunkhash].js', //此选项决定了非入口(non-entry) chunk 文件的名称
            path: path.join(root, 'dist'),
           // libraryTarget: "umd"
        },      
        devtool:false,//'eval-cheap-module-source-map', 
        plugins:[
            new CleanWebpackPlugin(['dist/*'],{
            root: root
        }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //       compress: {
        //         warnings: false
        //       }
        //     },
        //     sourceMap: false,
        //     parallel: true
        //  }),
         //一个Webpack插件来优化\最小化CSS资产。
        //  new OptimizeCSSPlugin({
        //     cssProcessorOptions:{ 
        //         safe: true,
        //          map: { 
        //              inline: false 
        //             } 
        //         }
        //  }),
        //Webpack清单插件 构建状态  codecov 小胶质Webpack插件用于生成资产清单。
        new ManifestPlugin(),
         new webpack.DefinePlugin({
            //'process.env': require('../config/dev.env')
          }),
          /**
           该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
            keep module.id stable when vender modules does not change
           * hashFunction: 散列算法，默认为 'md5'。支持 Node.JS crypto.createHash 的所有功能。
            hashDigest: 在生成 hash 时使用的编码方式，默认为 'base64'。支持 Node.js hash.digest 的所有编码。
            hashDigestLength: 散列摘要的前缀长度，默认为 4。
            用法
          */
         //   new webpack.HashedModuleIdsPlugin(),
            // enable scope hoisting
            /*
            过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。
            这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，
            一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
q              这个插件会在 webpack 中实现以上的预编译功能。
            */
            new webpack.optimize.ModuleConcatenationPlugin(),
            // split vendor js into its own file
            //CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。
            //The CommonsChunkPlugin 已经从 webpack v4 legato 中移除。想要了解在最新版本中如何处理 chunk，请查看 SplitChunksPlugin。
            //4.0 SplitChunksPlugin
            new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                ) === 0
                )
            }
            }),
            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
            }),
          new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(root,'example/index.html'),
            inject: true
          })
        ]
    });
    
}