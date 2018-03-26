var path=require('path')
module.exports={
    dev:{
            port:9003,
            host:'localhost',
            compress: true,
            index:"index.html",
            contentBase:path.resolve(__dirname,'../dist'),
            poll:false
    }
}