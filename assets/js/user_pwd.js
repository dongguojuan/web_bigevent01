$(function () {
    // 1.定义校验规则
    var form = layui.form
    form.verify({
        
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        //   新旧不能重复 
       samePwd: function(value){
        // value是新密码  旧密码要获取
        if(value ==$('[name="oldPwd"]').val()){
             return('原密码新密码不能一致')
        }
    },
    rePwd: function(value){
        // value是新密码  旧密码要获取
        if(value !==$('[name="newPwd"]').val()){
             return('俩次密码不一致')
        }
    },


 })
    
// 2.表单提交
$('.layui-form').on('submit',function(e) {
  e.preventDefault();
  $.ajax({
      method:"POST",
      url:"/my/updatepwd",
      data: $(this).serialize(),
      success:function (res) {
          if(res.status !==0) {
              return  layui.layer.msg(res.message)
          }
          layui.layer.msg("修改密码成功")
          $('.layui-form')[0].reset()
      }
  })
})

    
})