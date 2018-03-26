const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob=require('glob');
const commonconfig=require('./webpack.common');
const root= path.resolve(__dirname,'../');
const webpack=require('webpack');
const config=require('../config');
// var entrys={};
// var files=glob.sync(path.join(root,'src/components/**/*.vue'));
// files.map(function(filePath){
//     entrys[path.filename(filePath)]=filePath;
// })
module.exports =merge(commonconfig,{
    entry:{
        'index':path.resolve(root,'src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(root, 'dist'),
       // libraryTarget: "umd"
    },       
    plugins:[new CleanWebpackPlugin(['dist/*'],{
        root: root
    }),
        new webpack.DefinePlugin({
        'process.env': require('../config/dev.env')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(root,'example/index.html'),
        inject: true
      }),
    ],
    //devtool:'eval-source-map',
    devtool:'eval-cheap-module-source-map',
    devServer:{
        clientLogLevel:"warning",
        contentBase:[path.resolve(root,'dist')],
        port:9003,
        hot:true,
      //  openPage:
      //  open:'Chrome',
        host:'localhost',
        compress:true,//一切服务都启用gzip 压缩：
        index:"index.html",// 
        publicPath:"/",
        //quiet: true,
        historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
       // overlay:true, //当存在编译器错误或警告时，在浏览器中显示全屏叠加。默认情况下禁用。如果您只想显示编译器错误：
        watchOptions: {
            poll: config.dev.poll //通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
       },
       setup(app)
       {
            // app.get('/', function(req, res) {
            //     res.send('434343');
            // });
       }
    }
});
