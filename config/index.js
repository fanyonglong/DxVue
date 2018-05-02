var path=require('path')
module.exports={
    extractCss:true,
    dev:{
            port:9003,
            host:'localhost',
            compress: true,
            index:"index.html",
            contentBase:path.resolve(__dirname,'../dist'),
            poll:false
    }
}