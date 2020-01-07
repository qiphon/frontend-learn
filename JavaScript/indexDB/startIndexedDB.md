开始使用indexedDB
-----------

> IndexedDB 是一种可以让你在用户的浏览器内持久化存储数据的方法。IndexedDB 为生成 Web Application 提供了丰富的查询能力，使我们的应用在在线和离线时都可以正常工作。

## 基本模式
IndexedDB 鼓励使用的基本模式如下所示：

- 打开数据库。
- 在数据库中创建一个对象仓库（object store）。
- 启动一个事务，并发送一个请求来执行一些数据库操作，像增加或提取数据等。
- 通过监听正确类型的 DOM 事件以等待操作完成。
- 在操作结果上进行一些操作（可以在 request 对象中找到）

### IndexedDB 兼容写法

```js

// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

// open 请求不会立即打开数据库或者开始一个事务。对open 函数的调用会返回一个我们可以作为事件来处理的包含result （如果成功）或者错误值的 IDBOpenDBRequest 对象
// open 第二个参数是数据库的版本号。版本号决定数据库的架构，即数据库的对象仓库和它的结构。 如果数据库不存在，就会创建一个，然后 ``` onupgradeneeded ``` 被触发，需要在
// 这个事件的处理函数中创建数据库模式； 如果数据库已经存在，但声明了一个更高的数据库版本，会直接触发 ``` onupgradeneeded ``` 事件，允许在处理函数中更新数据库模式
/** 
 *   @params dbName    String    数据库名字
 *   @params dbversion 
 * indexedDB.open(dbName [, dbversion])
*/
if(window.indexedDB){
    // do something...
    // 打开数据库
    // 如果 indexedDB.open() 事件成功， 就会返回一个对象，这个对象中的 result 是一个 IDBDatabase 实例
    var request = window.indexedDb.open('testDB')

}

```
> 注意：版本号是一个 unsigned long long 数字，这意味着它可能是一个特别大的数字。
> 版本号不能使用浮点数，否则他会 四舍五入 为整数，这可能导致 ``` onupgradeneeded ``` 事件不会被触发
> ``` var request = indexedDB.open('testdb', 2.4) ``` 这里的 2.4 会被转为 2

### 成功和失败的处理



```js
request.onerror = function(event){
    // 不是所有事情都成功时触发
}
request.onsuccess = function(event){
    // 所有事情都成功的时候触发
}

```

indexedDB 的 API 被设计成尽可能地减少对错误处理的需求，所以可能不会看到有很多的错误事件。
然而在打开数据库的情况下还是有一些会产生错误事件的情况：
- 最有可能出现的问题就是用户决定不允许 web APP 访问及创建一个数据库。 
indexedDB 设计的目的就是允许大量数据可以被存储以供离线使用

- 当用户首次尝试打开一个 indexedDB 存储时，会针对用户进行提醒，由用户决定数据是否被存入。
- indexedDB 在浏览器使用隐私模式下是被禁止的
- 如果 indexedDB.open() 事件成功， 就会返回一个对象，这个对象中的 result 是一个 IDBDatabase 实例
- 在打开数据库时最常见的可能出现的错误之一是 ``` VER_ERR ``` 。这表明存储在磁盘上的数据库版本高于你试图打开的版本。这是一种必须被错误处理程序处理的一种出错情况

### 创建和更改数据库版本号

当创建一个新的数据库或增加已经存在的数据库的版本号（当打开数据库时指定一个比之前更大的版本号），onupgradeneeded 事件会被触发，IDBVersionChangeEvent 对象会作为
参数传递给绑定在 request.result 上的 onversionchange 事件处理函数，应该在此创建该版本需要的对象仓库。

要更新数据库的 schema ,也就是创建或者删除对象存储空间，需要实现 onupgradeneeded 处理程序，这个处理程序将作为一个允许处理对象存储空间的 versionchange 事务的一部分被调用

```JS
request.onupgradeneeded = function(event){
    // 保存 IDBDatebase 接口
    var db = event.target.result
    // 为该数据库创建一个对象仓库
    var objStore = db.createObjectStore('name', {keyPath: 'myKey'})
}

```

在这种情况下，数据库将已经拥有来自数据库以前版本的数据，因此不必再次创建这些数据。只需要再创建新的数据，或者从以前版本中删除不再需要的数据。
如果需要修改已经纯在的数据，就必须删除旧的数据从新写入新的数据（如果需要保存这些数据，需要在升级数据库之前把他们保存下来）

创建name 相同的数据或删除 name 不存在的数据会报错

### 数据库结构

indexedDB 使用的是 *对象存储* 而不是 **table**，一个数据库可以包含无数个 *对象存储*，当一个值被存储到数据库时，会有一个特别的key。创建key 的方式

- keyPath
- key generator

keyPath  |  key generator  |  说明
--|--|--|
NO | No | 对象存储可以保存任意的值，甚至基础类型的值如 数字和字符串，并且必须提供一个单独的key
Yes | No | 对象存储 只能存储 js 的 object，这个对象必须有一个 keyPath 的键
No  | Yes | 对象存储 可以存储任何类型的值，对应的key 自动生成，也可以提供一个单独的key
Yes | Yes | 对象存储 只存储 js 的 object。通常， key 自动生成，并且值会被存储在以这个key 为 keypath 的对象中

还可以在任何对象存储上创建索引，前提是这个 *对象存储* 存储的是一个对象，不是基本类型值。索引的作用：

- 索引也可以用来查找存储的值
- 索引可以约束保存的数据，保证存储的对象的唯一性（不会出现键值相同的对象存储。例如想存储一组关于人的数据，并且这些人没有相同的邮箱，这个时候就可以使用 索引）

```js

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];
var request = indexedDB.open('testdb', 1)

request.onerror = function (event){
    console.log('request error', event)
}

request.onupgradeneeded = function(event){
    var db = event.target.result
    // 创建一个关于用户的 存储对象，用唯一的 ssn 作为 keypath
    var objStore  = db.createObjectStore('customer', { keyPath: 'ssn' })
    // 添加查询索引
    objStore.createIndex('name', 'name', {unique: false})
    // 以 email 作为唯一索引
    objStore.createIndex('email', 'email', {unique: true})

    objStore.transaction.oncomplete = function (event){
        var customerObjectStore = db.transaction('customer', "readwrite").objectStore('customer')
        customerData.forEach(function(customer){
            customerObjectStore.add(customer)
        })
    }
}

```

onupgradeneeded 是唯一的一个可以更改数据结构的地方，在其中可以创建和删除 对象存储以及构建和删除索引

对象存储使用 createObjectStore(name [,{keyPath: keyPath}]) 创建
- 第一个参数 name ，数据仓库的名字
- 第二个对象参数 ```{keyPath: keyPath} ``` 是可选的，但是这个参数很重要,他定义了 数据仓库 的可选属性同时也优化了数据仓库的类型

上面的例子说明： 
- 仓库名 customers
- keyPath 