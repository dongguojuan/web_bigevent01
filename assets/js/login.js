// 入口函数
$(function () {
    // 1.点击：去登录 显示隐藏
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 2.自定义验证规则
    var form=layui.form;
    form.verify({
        // 不要忘记给结构里加属性用|隔开
        pwd: [
            /^[\S]{6,12}$/ //大\S 不能取空格、换行、制表(tab)               
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        // 确认密码校验规则
        repwd: function(value){
        // 选择器必须加空格，选择的是后代中的input,name属性值为：password的那一个标签
        // 取到注册表单里的密码值
        var pwd = $('.reg-box input[name=password]').val()
        // 对比
        if(value !==pwd){
            return "俩次密码不一致"
        }

        }  
    });
    // 3.注册功能
    var layer=layui.layer
    $('#form_reg').on('submit',function(e){
        // 先阻止提交的默认行为
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url:'/api/reguser ',
            data:{
                username: $('#form_reg  [name=username]').val(),
            password:$('#form_reg  [name=password]').val()},
            success:function(res){
               if(res.status !==0){
                //    return alert(res.message)
                return layer.msg('有表情地提示', {icon: 5})
               }
            //    alert(res.message)
            layer.msg('有表情地提示', {icon: 6});
            $('#link_login').click();
            // 重置form表单(清空内容)
            $('#form_reg')[0].reset()
            }  
        })
    });

//    4.登录功能
    $('#form_login').on("submit",function(e){
       // 先阻止提交的默认行为
       e.preventDefault();
     
       // 发送ajax
       $.ajax({
           method:"POST",
           url:"/api/login",
        // 快速获取表单中的数据   序列化(以数组形式)
           data:$(this).serialize(),
           success: function(res){
            //   校验返回状态
            if(res.status !==0){
                return layer.msg(res.message)
            }
            // 提示信息 保存token 跳转页面
            layer.msg("恭喜您，登录成功!")
            localStorage.setItem('token',res.token)
            location.href='/index.html'
           }
       })
    })
}) 