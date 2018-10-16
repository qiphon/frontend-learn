var version = 'app-v9'

// 装载
self.addEventListener('install',function(event){
    console.log('install',event)
    console.log('self',self)
    event.waitUntil(
        caches.open(version)
            .then(function(cache){
                console.log('cache',cache)
                return cache.addAll([
                    './app.js',
                    './11.css',
                    './serviceworker.html',
                ])
            }).then(function(){
                console.log('skip waiting')
                return self.skipWaiting()
            })
    )
})

// 激活
// 如果当前浏览器没有激活的service worker或者已经激活的worker被解雇，
// 新的service worker进入active事件
self.addEventListener('activate',(event)=>{
    // console.log('activate',event)
    console.log('activate',caches)
    caches.keys().then((keyList)=>{
        console.log(keyList)
        for(let [i,item] of keyList.entries()){
            // console.log(i,item )
            // if(item.indexOf(cacheWhiteList) === -1){
                // console.log(keyList)
                if(item !==version)caches.delete(item)
            // }
        }
    })
    event.waitUntil(
        self.clients.claim()
    )
})

// 请求拦截
self.addEventListener('fetch',function(event){
    console.log('fetch',event)
    event.respondWith(
        caches.match(event.request)
            .then(function(res){
                // console.log('resss',!!res)
                if(!!res){
                    console.log('caches',res)
                    return res;
                }
                console.log('fetch1',res)
                return fetch(event.request)
            })
    )
})

// 消息处理
self.addEventListener('message',(event)=>{
    var promise = self.clients.matchAll().then(function(clientList){
        var senderID = event.source ? event.source.id : null;
        clientList.forEach((client)=>{
            if(client.id == senderID){   // 多个页面消息传递
                return;
            }else{
                client.postMessage({
                    client:senderID,
                    message:event.data
                })
            }
        })
    })
    event.waitUntil(promise)
})

