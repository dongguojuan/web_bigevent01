// 入口函数
$(function(){
    // 初始化文章分类列表
    initArtCateLisr()
    var layer=layui.layer
    // 封装初始化文章分类列表
    function initArtCateLisr(){
        $.ajax({
            method:"get",
            url:"/my/article/cates",
            success:function(res){
                // if(res.status !==0) return "获取文章分类失败"
              var htmlStr =  template('art_tr',res.data)
              $('tbody').html(htmlStr)
            }
        })
    }

    //2 添加类别事件
 
    $('#btnAdd').on('click',function(){
        indexAdd =  layer.open({
            type: 1, 
            title: '添加文章类别',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
          });     
    })
    // 3.利用事件委托原理 给form_add监听提交事件
    var indexAdd = null
    $('body').on('submit','#form_add',function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) return layer.msg('文章添加失败')
            //    先获取在提示成功
                initArtCateLisr()
                layer.msg('恭喜您！文章添加成功')
                // 关闭弹出层
                 layer.close(indexAdd)
            }
        })
    })

    // 4.修改
    var indexEdit = null  //编辑弹出层索引
    var form = layui.form
    $('tbody').on('click',".btn_edit",function(){
        // 4.1弹出层
     indexEdit =  layer.open({
            type: 1, 
            title: '修改文章类别',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
    }); 
        // 4.2 获取Id,发送ajax获取数据，渲染页面
        var Id=$(this).attr('data-id');
        $.ajax({
            method:"get",
            // 
            url:"/my/article/cates/"+Id,
            success:function(res){
                form.val("form-edit",res.data)
            }
        })
    })

    // 5.给编辑得弹出框绑定监听  提交事件 利用事件委托原理
    $('body').on('submit',"#form-edit",function(e){
      e.preventDefault()
      $.ajax({
          method:"POST",
          url:"/my/article/updatecate",
          data:$(this).serialize(),
          success:function(res){
              if(res.status !==0) return layer.msg('文章更新失败')
              //    先获取在提示成功
              initArtCateLisr()
              layer.msg('恭喜您！文章更新成功')
              // 关闭弹出层
               layer.close(indexEdit)
          }
      })
    })
//    删除
$('tbody').on('click',".btn-delete",function(){
    // 
    var Id = $(this).attr('data-id')
    // 弹出对话框
    layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method:"GET",
            url:"/my/article/deletecate/"+Id,
            success:function(res){
                if(res.status!==0) return layer.msg(res.message)
                //    先获取在提示成功
                    initArtCateLisr()
                    layer.msg('恭喜您！删除成功');
                    // 关闭弹出层 
                    layer.close(index);
            }
        })
        
      
      });
})

})
