$(function() {
    // 1.获取用户信息
    getUserInof()
    // 退出
    $('#logout').on('click',function(){
        // 询问
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清除token，
            localStorage.removeItem('token')
            // 跳转页面，
            location.href="/login.html"
            // 关闭询问框
            layer.close(index);
          });
        
    })
});
// 获取用户信息(封装入口函数的外面)
// 原因后面其他的页面也调用
function getUserInof() {
    $.ajax({
        url:'/my/userinfo',
        // headers: {
        //     // 重新登录，因为token过期事件12小时
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function(res){
          if(res.status !==0) {
              return layui.layer.msg(res.massage)
          }
          renderAvatar(res.data)
        }
    })
}
// 封装用户头像渲染函数
function renderAvatar(user) {
    // 1.用户名 (昵称优先，没有用username)
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 2.用户头像
    if(user.user_pic !==null) {
        // 有头像
        $('.layui-nav-img').show().attr('src',user.user_pic);
        $('.text-avatar').hide();
    }else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text)
    }
}