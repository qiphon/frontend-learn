####form  优点 

    1. 自动提交表单
    2. 回车键绑定
    3. 数据获取更轻松
    ```
        <div>
            <input id="user" />
            <input id="password" />
        </div>
        jQ 获取对应值的方式 $('user').val()  ///这个看着挺简单的，但是性能损耗比较大


        ///form方式的解决方案
        <form id="regist">
            <input id="user" />
            <input id="password" />
        </form>
        var form = document.forms.namedItem('regist')
        //document.getElementById('regist')

        <script>
            var form = document.forms.namedItem('regist')
            form['user'].oninput = function(){
                console.log(this.value)///当value不存在时返回undefined
            }
        </script>

    ```
##自动获取表单元素的函数

``` 
    <form action="" id="reg">
        <input type="text" name="uname" id="user">
        <input type="text" name="password" id="password">
    </form>
    <script>
    ////表单的name值一定要有，否则没有数据
        var form = document.forms.namedItem('reg')

        $.fn.serializeForm = function(){
            let o = {},
                a = this.serializeArray()
            $.each(a,function(){
                if(o[this.name]!==undefined){
                    if(!o[this.name].push){
                        o[this.name] = [o[this.name]]
                    }
                    o[this.name].push(this.value || '')
                } else {
                    o[this.name] = this.value || ''
                }
            })
            return o;
        }

        form['user'].oninput = function(){
            // console.log(this.value)
            console.log($('#reg').serializeArray())
            console.log($('#reg').serializeForm())
            // $('#reg').serializeForm()
        }
    </script>

```
