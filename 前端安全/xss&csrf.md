# xss 

>XSS全称跨站脚本(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故缩写为XSS，比较合适的方式应该叫做跨站脚本攻击。
跨站脚本攻击是一种常见的web安全漏洞，它主要是指攻击者可以在页面中插入恶意脚本代码，当受害者访问这些页面时，浏览器会解析并执行这些恶意代码，从而达到窃取用户身份/钓鱼/传播恶意代码等行为。

xss 分类 

1. 存储型 （持久型）  

例如留言板功能，提交留言时恶意代码传到数据库


2. 反射型 （非持久型）

示例

```
http://a.xx.com/search.html?key="><script>confirm(22)</script>"

echo $_GET['get'];
<?=$_GET['get']?>

```

3. DOM型 

```
a.com/address.html#<img src=0 onerror=alert(0)>



b.com/<img src=0 onerror=alert(0)>.html

```

其他的xss 

mXSS (突变型xss)  无害的js被解析
UXSS （通用型xss）
Flash XSS
UTF-7 XSS
MHTML XSS
CSS XSS
VBScript XSS


[文章选自](http://www.fooying.com/the-art-of-xss-1-introduction/)

#csrf 跨站伪造请求

>利用被害者身份去发出请求

csrf 与 xss区别

xss： 利用对用户输入的不严谨然后执行js语句

CSRF：通过伪造受新用户发送请求


html csrf 可以发起get请求的标签

```
<link href="">
<img src="">
<frame src="">
<script src="">
<video src="">
background:url('')

```

JSON HiJacking

构造自定义的回调函数

```
<script>
function hijack(data){
    console.log(data)
}

</script>
<script src="http://www.a.com/json?callback=hijack"></script>

```

Flash csrf 通过flash来实现跨域请求

```
import flash.net.URLRequest;
function get(){
    var url = new URLRequest('http://a.com?callback=hijack')
    url.method = "GET"
    sendToURL(url)
}

```
csrf 防御

1. 验证码

2. 通过检查请求来源 （每个请求都带refer）

3. 增加请求参数 token 