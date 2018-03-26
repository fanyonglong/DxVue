const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const root= path.resolve(__dirname,'../');
function resolve(filepath)
{
    return path.resolve(root,filepath);
}
const entrys={};
module.exports ={
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
                    css:['vue-style-loader','css-loader']
                    // css: ExtractTextPlugin.extract({
                    //     use: 'css-loader',
                    //     fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                    //   })
                },
                cssSourceMap:false
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
    plugins: [
       // new ExtractTextPlugin("style.css")
     ]
};