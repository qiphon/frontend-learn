"use strict"
if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js',{scope : './'})
        .then(function(reg){
            // console.log('reg',reg) // 返回注册信息
            window.swReg = reg;
            // console.log('reg',swReg.scope)
        })
        .catch((err)=>{
            console.log(err)
        })
    // 发送消息到 serviceworker 
    var h1 = document.getElementsByTagName('h1')[0];
    var msg = document.getElementsByClassName('msg')[0]

    h1.addEventListener('click',function(){
        console.log(navigator.serviceWorker)
        navigator.serviceWorker.controller.postMessage('post msg from h1')
    })

    // 接受信息
    navigator.serviceWorker.addEventListener('message',(res)=>{
        console.log('app 接收信息',res)
        msg.innerHTML = res.data.message
    })


}else{
    console.log('service not supported!')
}

