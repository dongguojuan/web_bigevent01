$(function () {
    // 补0
    function padZero(n) {
        return  n>9?  n:"0"+n
    }
    // 位art-template 定义时间过滤器
    
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt =new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getUTCMinutes())
        var ss = padZero(dt.getSeconds())
        
        return y+"-" + m + "-"+ d + '' + hh + ":" + mm + ":" + ss
    }
    // 1.定义提交参数
    var q = {
        pagenum : 1,//页码值 默认打开第一页
        pagesize: 2,//默认显示多少条数据
        cate_id: "",//文章分类得ID
        state:"",//文章状态

    }
    // 2.初始化文章列表
    var layer=layui.layer
    initTable()

    function initTable() {
       $.ajax({
           method:"get",
           url:"/my/article/list",
           data:q,
           success:function (res) {
            //    console.log(res);
               if(res.status !== 0) {
                return layer.msg(res.message)
               }
            //    layer.msg(res.message)
               var str =template('tpl_table', res)
               $('tbody').html(str)
            //    调用分页
            renderPage(res.total)
           }
       }) 
    }

    // 3.初始化分类
    var form = layui.form
    initCate()

    function initCate() {
        $.ajax({
            method:"get",
            url:"/my/article/cates",
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 赋值，渲染form
                var htmlStr = template('tpl_cate',res)
                $('[name="cate_id"]').html(htmlStr)
                form.render()
            }
        })
    }

    // 4.筛选功能
    $('#form-search').on('submit',function (e) {
        e.preventDefault()
        // 获取
        var state = $('[name="state"]').val()
        var cate_id = $('[name="cate_id"]').val()
        // 赋值
        q.state = state;
        q.cate_id = cate_id
        // 初始化文章列表
        initTable()
    })

    //5. 分页
    function renderPage(total) {
        // alert(total)
        var laypage = layui.laypage;
  
        //执行一个laypage实例
        laypage.render({
          elem: 'test1' ,//注意，这里的 test1 是 ID，不用加 # 号
          count: total,//数据总数，从服务端得到
          limit:q. pagesize,//每页显示多少数据
          curr: q.pagenum,//当前页码
          layout:["count", "limit", 'prev', 'page', 'next',"skip"],
          limits:[2, 3, 4, 5, 10],
        //   触发jump:分页初始化的时候，页码改变的时候
        jump:function  (obj,first) {
            // obj: 所有参数所在的对象；first: 是否是第一次初始化分页
            // 改变当前页
            q.pagenum = obj.curr;
            q.pagesize =obj.limit
            // console.log(1);
            // 判断，不是第一次初始化分页，才能重新调用初始化文章列表
            if(!first) {
                // 初始化文章列表
                initTable()
            }
        }

        });
        
    }
    // 6.删除
    // id是通过模板里面的 自定属性设置的id
    $("tbody").on('click',".btn_del",function(){
        var id =$(this).attr("data-id")
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:"GET",
                url:"/my/article/delete/" + id,
                success:function (res) {
                    if(res.status !==0) return layer.msg(res.message)
                    layer.msg(res.message)
                    // 关闭弹出框  渲染
                    layer.close(index);
                    // 当删除当前页面的最后一条数据是我们要让当前的页码值跑到前一页 ：本页没有数据了
                   if($("tbody tr").length == 1 && q.pagenum > 1) q.pagenum--
                //    还可以判断按钮的长度
                // if($(".btn_del").length == 1 && q.pagenum > 1) q.pagenum--

                    initTable()
                }
            })
           
          });
    })
})