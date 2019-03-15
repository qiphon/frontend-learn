# Fetch 基础  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

> Fetch API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

这种功能以前是使用  XMLHttpRequest实现的。Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如CORS和HTTP的扩展。

fetch规范与jQuery.ajax()主要有两种方式的不同，牢记：

1. 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。

2. 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。

```
function postData(url, data) {   // fetch  请求封装
    return fetch(url, {
        body: JSON.stringify(data), // 必须匹配 'Content-Type' header  // 上传JSON数据
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
                                    // 发送带凭据的请求
                                    // 为了让浏览器发送包含凭据的请求（即使是跨域源），要将credentials: 'include'添加到传递给 fetch()方法的init对象
                                    // 如果你只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'。
                                    // 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'。
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(r=>{
            console.log(r,'==========')
            return r.text();
            // 支持的方法
            // arrayBuffer() : 返回解决一个 ArrayBuffer 表示的请求主体的 promise
            // blob() : 返回解决一个 Blob 表示的请求主体的 promise
            // formData() : 返回解决一个 FormData 表示的请求主体的 promise
            // json() : 返回解决一个 JSON 表示的请求主体的 promise
            // text() : 返回解决一个 USVString(文本)表示的请求主体的 promise
        }) // parses response to JSON
}

// 调用
postData("/EmailSearch?number=1012002").then(res=>console.log(res))

// ==============上传文件示例
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', JSON.stringify(response)));

// ========上传多个文件
var formData = new FormData();
var photos = document.querySelector("input[type='file'][multiple]");

formData.append('title', 'My Vegas Vacation');
for (var i = 0; i < photos.files.length; i++) {
  formData.append('photos', photos.files[i]);
}

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));


// === 当网络请求状态码为404 等，不会报错
// 一个fetch()承诺将拒绝TypeError当遇到一个网络错误或CORS配置错误，在服务器端，尽管这通常意味着权限问题或类似- 404不构成一个网络错误
// 例如。准确检查成功fetch()将包括检查承诺是否已解决，然后检查该Response.ok属性的值是否为true。代码看起来像这样：
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) { 
  var objectURL = URL.createObjectURL(myBlob); 
  myImage.src = objectURL; 
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
});

// ========= fetch()可以使用Request()构造函数创建请求对象，并将其作为fetch()方法参数传递，
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});

// ======


```