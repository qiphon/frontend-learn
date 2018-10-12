// 装载
self.addEventListener('install',function(event){
    console.log('install',event)
    console.log('self',self)
    event.waitUntil(
        caches.open('app-v5')
            .then(function(cache){
                console.log('cache',cache)
                return cache.addAll([
                    './app.js',
                    './11.css',
                    './serviceworker.html',
                ])
            })
    )
})


// 请求拦截
self.addEventListener('fetch',function(event){
    console.log('fetch',event)
    event.respondWith(
        caches.match(event.request)
            .then(function(res){
                console.log('fetch1',res)
                if(res){
                    return res;
                }
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

// 激活
self.addEventListener('activate',(event)=>{
    console.log('activate',event)
    var cacheWhiteList = ['v2'];
    event.waitUntil(
        caches.keys().then((keyList)=>{
            if(cacheWhiteList.indexOf(key) === -1){
                console.log(key)
                return caches.delete(key)
            }
        })
    )
})