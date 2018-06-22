const path = require('path');
const webpack=require('webpack');
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
    
   // const VueLoaderPlugin = require('vue-loader/lib/plugin')
    return {
    context:root,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'index.js',
        path: resolve('dist'),
        publicPath:'/'
       // libraryTarget: "umd"
    },
    module: {
         rules: [{
            test: /\.vue$/,
            loader:'vue-loader'
            // options:{
            //     loaders: {
            //          css:['vue-style-loader',{
            //             loader: 'css-loader',
            //             options: {
            //               sourceMap: true
            //             }}]
            //     },
            //     cssSourceMap:true//是否开启 CSS 的 source maps，关闭可以避免 css-loader 的 some relative path related bugs 同时可以加快构建速度。
            // }
        },{
        test:/\.js$/,
            use:'babel-loader',// 
            include: [resolve('src'), resolve('test')]
        },
    {
        test:/\.css$/,
        use:['vue-style-loader',{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }}]
    }],
        
    },   
     // these devServer options should be customized in /config/index.js
  devServer: {
       clientLogLevel:"warning",
       contentBase:[path.resolve(root,'dist')],
        port:9003,
        hot:true,
      //  openPage:
       open:'Chrome',
        host:'localhost',
        compress:true,//一切服务都启用gzip 压缩：
        index:"index.html",// 
        publicPath:"/",
      //  quiet: true,
        historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
       // overlay:true, //当存在编译器错误或警告时，在浏览器中显示全屏叠加。默认情况下禁用。如果您只想显示编译器错误：
        watchOptions: {
            poll: config.dev.poll //通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
        },
        progress:true,//将运行进度输出到控制台。
        setup(app)
        {
                // app.get('/', function(req, res) {
                //     res.send('434343');
                // });
        }
  },
    target:'web',
    resolve: {
        extensions: [".js",'.vue',".css", ".json", ".jsx"],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },    
    plugins:[    
      new webpack.DefinePlugin({
        'process.env': require('../config/dev.env')
      }),
      //启用热替换模块(Hot Module Replacement)，也被称为 HMR。
      new webpack.HotModuleReplacementPlugin(),
      //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update. 
      new webpack.NoEmitOnErrorsPlugin(), //	在输出阶段时，遇到编译错误跳过
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve('example/index.html'),
        inject: true
      })]
};
}