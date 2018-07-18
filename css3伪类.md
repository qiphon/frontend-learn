###巧用css3伪类(尽可能地使用伪元素)

>优点:<br>
1.不会增加js的dom负担<br>
2.不会增加浏览器对html的解析,加快浏览器加载html<br>
3.对seo很有帮助

注意：img、input 不能有伪类

1. 表单:focus 事件的使用
    ```
        .input:focus + div{
            display:block
        }

    ```

2. :invalid 配合h5正则表单验证
```
input[type="email"]:invalid + div{
    color:red;
}

```
3. :checked 样式显示
```
input[type="checkbox"]:checked + div {
    color:green;
}

```
4. :hover 常见的二级菜单、tip框(下面代码展示tip框实现)
```
<style>
    span[data-title]{
        position: relative;
    }
    span[data-title]:hover:after{
        position: absolute;
        content:attr(data-title);
        top:150%;
        left: 50%;
        transform: translate(-50%);
        white-space: nowrap;
    }
</style>
<h1>hello,i'm qiphon . i'm from <span data-title="China">CN</span>.</h1>

5. :checked (很少见的使用) counter 主要是和伪类同时使用

```
<style>
    .choose{
        counter-reset: fruit 0; /*标识计数器count从1开始*/
        /* counter-reset: count1 0 count3 0 count4 0 ;声明了三个计数器，count1，count2，count3*/
    }
    .choose input:checked{
        counter-increment: fruit 2; /*表明每次递增 2*/
    }
    .counter::before{
        content:counter(fruit)
    }
</style>
<div class="choose">
    <label for="">
        <input type="checkbox" >香蕉
    </label>
    <label for="">
        <input type="checkbox" >苹果
    </label>
</div>
<p>
    你选择了<span class="counter"></span>种水果
</p>

```


```
##其它伪类
```
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */

```