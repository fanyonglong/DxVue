const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob=require('glob');
const root= path.resolve(__dirname,'../');
const webpack=require('webpack');
const config=require('../config');
const commonconfig=require('./webpack.common');   
const myHtml=require('../utils/webpack-plugin-html');
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// var entrys={};
// var files=glob.sync(path.join(root,'src/components/**/*.vue'));
// files.map(function(filePath){
//     entrys[path.filename(filePath)]=filePath;
// })
module.exports =(env, argv)=>{
return merge(commonconfig(env,{extractCss:true}),{
    entry:{
        app:path.resolve(root,'src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(root, 'dist'),
        // chunkFilename:'[id].js',//此选项决定了非入口(non-entry) chunk 文件的名称
        // pathinfo:true ,//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释
        // library: {
        //     commonjs: "dx-vuexproject"
        // },
        // libraryTarget: "umd",
        // sourceMapFilename:'[file].map',
        // umdNamedDefine:false //会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
     },      
   
      plugins:[
      new CleanWebpackPlugin(['dist/*'],{
        root: root
      }),
      //提供带 Content-Encoding 编码的压缩版的资源
      new CompressionPlugin({
        test:/\.js$/,
        algorithm:"gzip",
        asset: '[path].gz[query]',
        threshold:10024,//只处理比这个值大的资源。按字节计算
        minRatio:0.8 //只有压缩率比这个值小的资源才会被处理
      }),
      //用交互式可缩放树形图显示webpack输出文件的大小。
    //  new BundleAnalyzerPlugin(),
      //
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
        template: path.resolve(root,'example/index.html'),
        inject: true
      })
    ],
   // devtool:'source-map',
    //devtool:'eval-source-map',
    devtool:'eval-cheap-module-source-map',
    devServer:{
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
    }
});
}
