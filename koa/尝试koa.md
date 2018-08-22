#koa入门

###安装 

```
mkdir koa-test

npm init

npm install koa --save

```

在目录下创建server.js

```
const Koa = require('koa')
const App = new Koa()


App.use(async(ctx)=>{
    ctx.body = 'hello koa'
})

App.listen(3000)

//运行代码

node server.js

```

之后再浏览器打开就能看到 ‘hello koa’ 了



接下来我们改写下server.js 的内容，看一下koa的异步是怎么执行的

```
const Koa = require('koa')
const App = new Koa()


App.use(async(ctx, next)=>{
    ctx.body = 1
    next();

    ctx.body +=2
})
App.use(async(ctx, next)=>{
    ctx.body += 3
    next();

    ctx.body +=4
})
App.use(async(ctx, next)=>{
    ctx.body += 5
    next();

    ctx.body += 6
})

App.listen(3000)

// 135642  

```

## 三种异步方式的实现

```
// #异步代码的类型

/// 回调地狱型
/*
function ajax(fn){
    setTimeout(()=>{
        console.log('settimeout')
        fn()
    },1000)
}

ajax(()=>{
    console.log(111)
    ajax(()=>{
        console.log(222)
        ajax(()=>{
            console.log(333)
        })
    })
})
*/

// promise 型

function delay(msg){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(msg)
        },1000)
    })
}

/*

delay('qiphon')
    .then((msg)=>{
        console.log(msg)
        return delay(2)
    })
    .then((msg)=>{
        console.log(msg)
        return delay(3)
    })
    .then(msg=>{
        console.log(msg)
    })
    .catch((err)=>{
        console.log(err)
    })

    */

// async + await

function delay2(msg){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(msg)
        },1000)
    })
}

async function asy(){
    await delay2(1).then(msg=>{
        console.log(msg)
    })

    await delay2(2).then(msg=>{
        console.log(msg)
    })

    await delay2(3).then(msg=>{
        console.log(msg)
    })
}

asy()

```


我们打印下ctx 会得到如下内容

```
{
    request:  //请求
    {
        method: 'GET',
        url: '/favicon.ico',
                header:
        {
            host: 'localhost:3000',
            connection: 'keep-alive',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
            accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
            referer: 'http://localhost:3000/',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9'
        }
    },
    response:   // 响应
    {
        status: 200,
            message: 'OK',
                header:
        {
            'content-type': 'text/plain; charset=utf-8',
                'content-length': '1'
        }
    },
    app: { subdomainOffset: 2, proxy: false, env: 'development' },
    originalUrl: '/favicon.ico',
    req: '<original node req>',
    res: '<original node res>',
    socket: '<original node socket>'
}

```
 

 ## koa router  使用

 下载  yarn add koa-router

 ```
const Koa = require('koa')
const App = new Koa()
const Router = require('koa-router')


const router = new Router()
const log = require('./koa-logger')



router.get('/',(ctx,next)=>{
    ctx.body= JSON.stringify(ctx)
})
router.get('/add',(ctx,next)=>{
    ctx.body= "add"
})
router.get('*',(ctx,next)=>{
    ctx.body= "<h1>404"
})

App.use(router.routes())
    .use(router.allowedMethods())

App.listen(3000)

 ```