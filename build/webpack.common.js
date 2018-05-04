const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const root= path.resolve(__dirname,'../');
const config=require('../config');
function resolve(filepath)
{
    return path.resolve(root,filepath);
}

module.exports =(env,argv)=>{ 
    
    const entrys={};
    let plugins=[];
    if(argv&&argv.hasOwnProperty('extractCss'))
    {
        config.extractCss=argv.extractCss;
    }
    config.extractCss;
    
    if(config.extractCss)
    {
        plugins.push( new ExtractTextPlugin({
           // id:'',//id 此插件实例的唯一 ident。（仅限高级用途，默认情况下自动生成）
           disable:false, //禁用插件
           ignoreOrder:false,//禁用顺序检查 (这对 CSS 模块很有用！)，默认 false
            filename: '[name].[contenthash].css', //生成文件的文件名。可能包含 [name], [id] and [contenthash]
            /**
             * 从所有额外的 chunk(additional chunk) 提取（默认情况下，它仅从初始chunk(initial chunk) 中提取）
            当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
            */
           allChunks:true
        }));
    }
    return {
    context:root,
    entry:'',
    output: {
        filename: 'index.js',
        path: resolve('dist'),
       // libraryTarget: "umd"
    },
    module: {
        // noParse: /jquery|vue|lodash/,
         rules: [{
            test: /\.vue$/,
            loader:'vue-loader',
            options:{
                // postcss:{
                //     useConfigFile:false,
                //     config:{
                //         plugins:[require('postcss-cssnext')]
                //     }
                // },
                //extractCSS: true,
                // postcss:{
                //     useConfigFile:true,   
                //     config:{
                //         path:resolve('./')
                //     } 
                // },
                loaders: {
                    js: 'babel-loader',
                    // js:[{ loader: 'babel-loader', options: { 
                    //     presets: ['env'] 
                    // } }],                
                    include: [resolve('src'), resolve('test')],
                    css:!config.extractCss?['vue-style-loader','css-loader',{
                        loader:'postcss-loader'
                    }]:
                    ExtractTextPlugin.extract({
                        use: ['css-loader',{
                            loader:'postcss-loader',
                            sourceMap:config.sourceMapEnabled
                        }],
                        fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                      }),
                      postcss:{

                      }
                },
                cssSourceMap:config.sourceMapEnabled //是否开启 CSS 的 source maps，关闭可以避免 css-loader 的 some relative path related bugs 同时可以加快构建速度。
            }
        },{
        test:/\.js$/,
        use:'babel-loader',
        include: [resolve('src'), resolve('test')]
        }]
    },   
    // externals:[{
    //     vue:{
    //         commonjs:'vue'
    //     },
    //     'vue-router':{
    //         commonjs:'vue-router'
    //     }
    // }],
  resolve: {
     extensions: [".js",'.vue',".css", ".json", ".jsx"],
     alias: {
        '@': resolve('src'),
        'vue$': 'vue/dist/vue.esm.js',
      }
  },    
//   externals: {
//     vue:"vue"
//   },
    plugins:plugins
};
}