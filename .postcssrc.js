/*

postcss-utilities包括用作@util规则的最常用的混合，快捷方式和助手。
atcss 包含根据特殊注释注释转换CSS的插件。
cssnano 包含优化用于生产的CSS大小的插件。
cssnext 包含允许您今天使用未来CSS功能的插件。
oldie 包含可以转换您的CSS以实现较旧的Internet Explorer兼容性的插件。
precss 包含允许您使用类似Sass的CSS的插件。
rucksack 包含插件以加速CSS功能和快捷方式的开发。
level4 仅包含允许您在没有IE9后备的情况下编写CSS4的插件。
short 增加并扩展了许多速记属性。
stylelint 包含可以隐藏样式表的插件。
postcss-hamster 用于垂直节奏，排版，模块化的比例功能。
postcss-preset-env 可让您将现代CSS转换为大多数浏览器可以理解的内容，并根据您的目标浏览器或运行时环境确定您需要的polyfills。

回退
postcss-color-rgba-fallback转换rgba()为十六进制。
postcss-disabled在伪类存在时添加[disabled]属性和/或.disabled类:disabled。
postcss-epub将该-epub-前缀添加到相关属性中。
postcss-esplit 将IE浏览器的CSS超过4095个选择器。
postcss-fallback添加fallback函数以避免重复的声明。
postcss-filter-gradient 为旧的IE添加渐变过滤器。
postcss-flexibility为...添加-js-前缀Flexibility polyfill。
postcss-gradient-transparency-fix转换transparent渐变中的值以支持Safari的不同颜色插值。
postcss-hash-classname 将散列字符串附加到您的css类名称。
postcss-mqwidth-to-class 将最小/最大宽度媒体查询转换为类。
postcss-opacity 为IE8添加不透明度过滤器。
postcss-page-break将page-break-回退添加到break-属性。
postcss-pseudoelements将::选择:器转换为符合IE 8兼容性的选择器。
postcss-replace-overflow-wrap替换overflow-wrap用word-wrap。
postcss-round-subpixels 插件将子像素值舍入到最近的完整像素。
postcss-unmq 删除媒体查询，同时保留IE≤8的桌面规则。
postcss-vmin在IE9中生成单元的vm回退vmin。
postcss-will-change在will-change属性之前插入3D黑客。
autoprefixer 使用我可以使用的数据为您添加供应商前缀。
postcss-pie 使IE几个最有用的CSS3装饰功能。
cssgrace 为IE和其他旧浏览器提供各种帮助和传输CSS 3。
pixrem为rem单元生成像素后备。
postcss-fixie 增加简单和无痛的IE黑客攻击
*/

module.exports = {
    plugins:{
        'precss':{},
        // 未来css
        'postcss-preset-env':{
            browsers: 'last 3 versions'
        },
        // 
        'autoprefixer':{

        }
    }
}