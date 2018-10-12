# PWA (Progressive Web Apps) 渐进式web APP

特性

1. 可靠：在没有网络的环境中也能提供基本的页面访问，而不会出现“未连接到互联网”的页面

2. 快速：针对网页渲染及网络数据访问有较好的优化

3. 融入：应用可以被增加到手机桌面，并且和普通应用一样，有全屏和推送等特性

Lighthouse  Google性能检测工具 ，

pwa检测点：

1. HTTPS
2. ```<meta name="viewport">tag with initial-scale ```
3. 屏幕自适应
4. serviceworker
5. offline  离线展示
6. 当JavaScript不存在时候也能展示一些内容
7. 所有的请求链接都是HTTPS
8. 3G网络环境下10s内显示
9. 用户可以安装到桌面
10. 页面能个性化定制


# service worker

在主线程之外的另一个线程

能力：

1. 拦截和处理网络请求的能力 

2. 在后台运行的同时，能和页面通信的能力，去实现大规模的后台数据处理

chrome service Worker 检查方法

1. ```chrome://serviceworker-internals/```

2. ```chrome://inspect/#service-workers ```