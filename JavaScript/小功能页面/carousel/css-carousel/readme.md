# css + js 轮播图实现

轮播依赖css 的 animation
js主要控制轮播的逻辑


### 参数说明

```js

 /**
    *  carousel  created by qiphon 
    *    css3  animate
    *    js    animationend
    *  @params  wraperEl  String  外层包裹的元素（类名或ID名）
    *  @params  itemEl    String  内部的元素（每个要执行动画的元素）（类名或ID名）
    *  @params  options   Object
    *              interTimer  number  轮播执行的时间（大于零，默认 5s）
    *              interAutorun  boolean  轮播是否自动播放（默认true）
    *              moveDirection  string ( 'vertical' 纵向, 'horizontal' 横向（默认） )
    * 
    *  @return  carouselObj  object  额外手动控制轮播的js
    *             startInter  Function  开启轮播图定时器
    *             removeInter Function  删除轮播定时器
    *             run         Function(key [, index])  控制轮播的函数
    *                           key  number  轮播的方向 （ -1： 正向， 1：反向 ），默认情况下自动轮播下一个
    *                           index  number  下一个要出现的banner ，值是下一个banner的index（从 0 开始）
*/

```

### 使用方法

```js

// 一下是使用方法===============================

        var carousel = carouselFun('.content-wraper', '.item', {
            moveDirection: 'vertical'
        })
        document.querySelector('body').onclick = function () {
            carousel.run(-1)
        }
        
        document.querySelector('.carousel').onmouseover = function(){
            console.log('over')
            carousel.removeInter()
        }
        document.querySelector('.carousel').onmouseout = function(){
            console.log('out')
            carousel.startInter()
        }

```
