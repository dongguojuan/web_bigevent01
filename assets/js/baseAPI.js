// 1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
// 
// 
// 拦截所有Ajax请求：get/post/ajax;
// 处理函数
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
})