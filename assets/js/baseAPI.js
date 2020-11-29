// 1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
// 
// 
// 拦截所有Ajax请求：get/post/ajax;
// 处理函数
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;

    //2.针对需要权限的接口配置头像信息
    // 必须以/my/开头的
    if(params.url.indexOf('/my/')!==-1) {
        params.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }
    // 3.拦截所有响应，判断身份认证信息
    params.complete = function (res) {
        // console.log(res)
        var obj = res.responseJSON
    //    var obj = res.responseJSON;
        if(obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/login.html'
        }
        
    }

})

