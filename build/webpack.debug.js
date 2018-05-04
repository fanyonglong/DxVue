const webpack=require('webpack');
const config=require('./webpack.cpt.build')


let _webpack=new webpack(config({},{}),(error)=>{
    if(error)
    {
        console.log('失败：',error);
        return;
    }
});


// const watching = compiler.watch({
//     // watchOptions 示例
//     aggregateTimeout: 300,
//     poll: undefined
//   }, (err, stats) => {
//     // 在这里打印 watch/build 结果...
//     console.log(stats);
//   });
//   watching.close(() => {
//     console.log("Watching Ended.");
//   });
// // _webpack.run(()=>{


// // })