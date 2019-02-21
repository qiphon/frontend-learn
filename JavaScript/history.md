##pushState和popstate   hash
```
window.history.pushState(state,title,url)

@params Object  state   用于存放当前页面数据
@params String  title   没有太大的作用
@params String  url     当前页面url后面想要跟着的东西

//popstate只能监听自己push进去的内容如果不是自己push进去的就不会触发这个事件
当前进时会有event.state,后退时候state是null
window.addEventListener('popstate',event=>{
    console.log(event)
})
打印出的结果
PopStateEvent {isTrusted: true, state: null, type: "popstate", target: Window, currentTarget: Window, …}
bubbles:false
cancelBubble:false
cancelable:true
composed:false
currentTarget:Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
defaultPrevented:false
eventPhase:0
isTrusted:true
path:[Window]
returnValue:true
srcElement:Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
state:null
target:Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
timeStamp:6672.59999999078
type:"popstate"
__proto__:PopStateEvent


```

##hash(网址链接#后面的内容包含#)

1. \#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。
2. 改变#后的内容不会触发页面重载
3. 改变#会改变浏览器的访问历史
    每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。
    这对于ajax应用程序特别有用，可以用不同的#值，表示不同的访问状态，然后向用户给出可以访问某个状态的链接。
    值得注意的是，上述规则对IE6和IE7不成立，它们不会因为#的改变而增加历史记录。
4. window.location.hash读取#值
5. onhashchange事件

    这是一个HTML 5新增的事件，当#值发生变化时，就会触发这个事件。IE8+、Firefox 3.6+、Chrome 5+、Safari 4.0+支持该事件。
    ```
    它的使用方法有三种：

    window.onhashchange = func;

    <bodyonhashchange="func();">

    window.addEventListener("hashchange",func, false);

    对于不支持onhashchange的浏览器，可以用setInterval监控location.hash的变化。
    ```

6. Google抓取#的机制

    >默认情况下，Google的网络蜘蛛忽视URL的#部分。
    但是，Google还规定，如果你希望Ajax生成的内容被浏览引擎读取，那么URL中可以使用"#!"，Google会自动将其后面的内容转成查询字符串_escaped_fragment_的值。
    比如，Google发现新版twitter的URL如下：
    http://twitter.com/#!/username
    就会自动抓取另一个URL：
    http://twitter.com/?_escaped_fragment_=/username
    通过这种机制，Google就可以索引动态的Ajax内容。

7. #后的字符

    >在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。
    比如，下面URL的原意是指定一个颜色值：
    http://www.example.com/?color=#fff
    但是，浏览器实际发出的请求是：
    GET /?color= HTTP/1.1
    Host: www.example.com
    可以看到，"#fff"被省略了。只有将#转码为%23，浏览器才会将其作为实义字符处理。也就是说，上面的网址应该被写成：
    http://example.com/?color=%23fff