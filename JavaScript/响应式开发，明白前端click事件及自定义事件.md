#响应式页面开发

常见的前端响应式开发有3套相应的解决方案：

:   1. bootstrap 的 columns 布局
：  2. 使用全局的rem （页面所有元素的宽高和字体都用rem等比缩放）
:   3. 使用阿里的flex box ，这种方法和第二种类似。不同点是，页面的字体用的是px

#前端click事件及自定义事件

> 前端click事件在移动端会比较迟钝，但是touchstart会造成误触发
谷歌开发文档中可以找到答案：For many years, mobile browers applied a 300-350ms delay between touchend and click while they waited to see if this was going to be a double-tap or not, since double-tap was a gesture to zoom into text.
因为移动端要判断是否是双击所以才推迟300-350ms才触发click
chrome 32 版已经把这个延迟去掉了，如果有一个如下的标签
``` <meta name="viewport" content="width=device-width">  ```
即把viewport 设置成设备的实际像素，那么就不会有这个延时。并且这个举动受到了IE/Firefox/Safari(iOS9.3) 的支持。也就是说现在前端不需要考虑这个延时了。

```
/// 这个在chrome生效，safari不生效
<meta name="viewport" content="initial-scale=1.0">

/// 也可以设置css，这个chrome和safari都生效
html{
    touch-action:manipulation;
}


```

## click/ touch 触发顺序

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body{
            height: 100vh;
        }
    </style>
</head>
<body>
    <script>
        ;(function(){
            let target = document.body;
            console.log(target)
            let touchstartTime = 0;
            function log(event){
                if(event.type ==="touchstart") touchstartTime = Date.now();
                console.log(event.type,Date.now()-touchstartTime)
            }

            target.onclick = log
            target.ontouchstart = log
            target.ontouchend = log
            target.ontouchmove = log
            target.onmouseover = log
            target.onmousedown = log
            target.onmouseup = log

        })()
    </script>
</body>
</html>

```
去掉viewport和没去viewport是两个不同的结果，可以自己试一下

###tap事件的实现

> zepto 的tap是一个没有延时的click是在touchend之后生成的一个click事件，并触发click再取消原来的click。touchend之后不能每次都触发tap，因为有的用户不是在单击而是滑动。zepto使用的是位移偏差大于30，并且时间差小于700ms

```
// 手动实现一个tap事件
// tap 
        let $ = function(selector){
            let dom = null ;
            if(typeof selector === "string"){
                dom = document.querySelectorAll(selector)
            }else if (selector instanceof HTMLElement){
                document = selector;
            }
            return new $Element(dom)
        }

        class $Element{
            constructor(_doms){
                let doms = _doms.constructor === Array ||
                           _doms.constructor === NodeList ? _doms : [_doms]
                this.doms = doms;
                this.init()
                for(let i =0; i<doms.length;i++){
                    this[i] = doms[i]
                    if(!doms[i].listeners){
                        doms[i].listeners = {}
                    }
                }
            }
            init(){
                for(let i=0;i<doms.length;i++){
                    if(!this.doms[i].listeners){
                        this.initTapEvent(this.doms[i])
                    }
                }
            }
            on(enentType,cb){
                for(let i=0;i<doms.length;i++){
                    let dom = this.doms[i]
                    if(!doms.listeners[eventType]){
                        doms.listeners[eventType] = []
                    }
                    dom.listeners[eventType].push(cb)
                }
            }
            trigger(eventType,event){
                for(let i=0;i<doms.length;i++){
                    $Element.dispatchEvent(this.doms[i],eventType,event)
                }
            }
            static dispatchEvent(dom,eventType,event){
                let listeners = dom.listeners[eventType];
                if(listeners){
                    for(let i =0;i<listeners.length;i++){
                        listeners[i].call(dom,event)
                    }
                }
            }
        }


```

#摇一摇事件

>html5 新增一个devicemotion的事件，可以使用手机的重力感应

```
window.ondevicemotion = function(event){
    let gravity = event.accelerationIncludingGravity;
    console.log(gravity.x,gravity.y,gravity.z)  // x，y，z 三个方向的加速度
}

```
devicemotion事件会不断触发，而且触发的很快x轴和y轴的变化区间是-45 到 +45度，即这个区间就是
``` delta = 9.8 * sin(45) * 2 = 13.8  ```
只要x轴和y轴的g值变化超过13.8，我们就可以认为发生了摇一摇事件

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>摇一摇实现</title>
</head>
<style>

    #gravity{
        height: 100vh;
    }
</style>
<body>
    <div id="gravity"></div>
    <script>
        const EMPTY_VALUE = 100;
        const THREAD_HOLD = 13.8;

        let minX = EMPTY_VALUE;
        let minY = EMPTY_VALUE;
        
        window.ondevicemotion = function(event){
            let gravity = event.accelerationIncludingGravity;
            console.dir(gravity)
            let x = gravity.x;
            let y = gravity.y;
            if(x < minX)minX = x;
            if(y < minY)minY = x;
            if(Math.abs(x - minX)> THREAD_HOLD && Math.abs(y-minY)>THREAD_HOLD){
                console.log("shake")
                let event = new CustomEvent("shake")
                window.dispatchEvent(event)
                minX = minY = EMPTY_VALUE;
            }
        }
        window.addEventListener("shake",function(){
            let div = document.createElement("div")
            div.innerHTML = "window shake callback was called"
            document.getElementById('gravity').appendChild(div)
        })
    </script>
</body>
</html>


```