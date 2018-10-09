
# 小程序worker 

步骤 ：
1. 在app.json 下添加

```
{"workers":"workers"}

```
2. 根据步骤 1 中的配置，在代码目录下新建以下两个入口文件：

```
workers/request/index.js

workers/response/index.js

```

3. 编写 Worker 代码

```
workers  request index.js//

worker.postMessage({
  msg: 'hello qiphon from worker: ',
  qiphon: { a: 1, b: 3, c: [1, 23, 4] }
})

worker.onMessage((msg) => {
  console.log('[Worker] on appservice message', msg)
  // console.dir(msg)
  const buffer = msg.buffer
})


pages 下页面文件中的写法
const worker = wx.createWorker('workers/request/index.js')

worker.postMessage({
  msg: 'hello from AppService',
  qiphon:{a:1,b:3,c:[1,23,4]}
})

worker.onMessage(function (msg) {
  console.log('[AppService] onWorkerMessage', msg)
  console.dir(msg)
  console.log(msg.qiphon)
})

```