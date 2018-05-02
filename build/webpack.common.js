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
        plugins.push( new ExtractTextPlugin("style.css"));
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
                loaders: {
                    js: 'babel-loader',
                    // js:[{ loader: 'babel-loader', options: { 
                    //     presets: ['env'] 
                    // } }],                
                    include: [resolve('src'), resolve('test')],
                    css:!config.extractCss?['vue-style-loader','css-loader']:
                    ExtractTextPlugin.extract({
                        use: ['css-loader'],
                        fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                      })
                },
                cssSourceMap:false //是否开启 CSS 的 source maps，关闭可以避免 css-loader 的 some relative path related bugs 同时可以加快构建速度。
            }
        },{
        test:/\.js$/,
        use:'babel-loader',
        include: [resolve('src'), resolve('test')]
        }]
    },   

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