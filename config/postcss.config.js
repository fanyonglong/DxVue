
/**
名称	类型	默认	描述
exec	{Boolean}	undefined	启用PostCSS解析器支持 CSS-in-JS
parser	{String\|Object}	undefined	设置PostCSS解析器
syntax	{String\|Object}	undefined	设置PostCSS语法
stringifier	{String\|Object}	undefined	设置PostCSS字符串
config	{Object}	undefined	设置postcss.config.js配置路径&&ctx
plugins	{Array\|Function}	[]	设置PostCSS插件
sourceMap	{String\|Boolean}	false	启用源地图
*/
module.exports = {
    parser: 'sugarss',
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      'cssnano': {}
    }
  }