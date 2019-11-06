# [indexDB 前端数据仓库](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

IndexedDB是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索。虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB提供了一个解决方案。

IndexedDB是一个基于JavaScript的面向对象的数据库。 IndexedDB允许您存储和检索用键索引的对象；可以存储结构化克隆算法支持的任何对象。 您只需要指定数据库模式，打开与数据库的连接，然后检索和更新一系列事务。

## 基本模式

IndexedDB 鼓励使用的基本模式如下所示：

1. 打开数据库。(open 请求不会立即打开数据库或者开始一个事务。open 函数的结果是一个 IDBDatabase 对象的实例。)

    var request = window.indexedDB.open("MyTestDatabase");

2. 在数据库中创建一个对象仓库（object store）。
3. 启动一个事务，并发送一个请求来执行一些数据库操作，像增加或提取数据等。
4. 通过监听正确类型的 DOM 事件以等待操作完成。
5. 在操作结果上进行一些操作（可以在 request 对象中找到）

## 接口

为了获取数据库的访问权限，需要在window对象的indexedDB属性上调用open()方法。该方法返回一个 IDBRequest对象；**异步操作**通过在 IDBRequest对象上触发事件来和调用程序进行通信。

### 连接数据库

- IDBEnvironment
提供IndexedDB功能。它由window和worker实现，这个接口不再是2.0规范的一部分。
- IDBFactory
提供数据库访问。这是全局对象indexedDB实现的接口，因此是API的入口。
- IDBOpenDBRequest
表示一个打开数据库的请求。
- IDBDatabase
表示一个数据库连接。这是在数据库中获取事务的唯一方式。

### 接收和修改数据

- IDBTransaction

    表示一个事务。在数据库上创建一个事务，指定作用域（例如要访问的存储对象），并确定所需的访问类型（只读或读写）。
- IDBRequest

    处理数据库请求并提供对结果访问的通用接口。
- IDBObjectStore

    表示允许访问通过主键查找的IndexedDB数据库中的一组数据的对象存储区。
- IDBIndex

    也是为了允许访问IndexedDB数据库中的数据子集，但使用索引来检索记录而不是主键。这有时比使用IDBObjectStore更快。
- IDBCursor

    迭代对象存储和索引。
- IDBCursorWithValue  （可能不支持）

    迭代对象存储和索引并返回游标的当前值。
- IDBKeyRange（可能不支持）

    定义可用于从特定范围内的数据库检索数据的键范围。
- IDBLocaleAwareKeyRange （可能不支持）

    定义一个键范围，可用于从特定范围内的数据库中检索数据，并根据为特定索引指定的语言环境的规则进行排序（详见createIndex()的参数）。这个接口不再是2.0规范的一部分。


### 自定义事件接口
此规范使用以下自定义接口触发事件：

- IDBVersionChangeEvent（可能不支持）
作为IDBOpenDBRequest.onupgradeneeded事件的处理程序的结果，IDBVersionChangeEvent接口表示数据库的版本已经发生了改变。

### 过时的接口
规范的早期版本还定义了这些现在已删除的接口。这些文档便于您需要更新以前编写的代码：

- IDBVersionChangeRequest 

    表示更改数据库版本的请求。改变数据库版本的方法已经改变了（通过调用IDBFactory.open而非IDBDatabase.setVersion），接口IDBOpenDBRequest现在拥有IDBVersionChangeRequest。
- IDBDatabaseException  

    表示执行数据库操作时可能遇到的异常情况。
- IDBTransactionSync 

    同步版本的IDBTransaction。
- IDBObjectStoreSync 

    同步版本的IDBObjectStore。
- IDBIndexSync 

    同步版本的IDBIndex。
- IDBFactorySync 

    同步版本的IDBFactory。
- IDBEnvironmentSync 

    同步版本的IDBEnvironment。
- IDBDatabaseSync 

    同步版本的IDBDatabase。
- IDBCursorSync 

    同步版本的IDBCursor。

## 浏览器兼容写法

```js 
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || 
                    window.mozIndexedDB || 
                    window.webkitIndexedDB || 
                    window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || 
                        window.webkitIDBTransaction || 
                        window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || 
                    window.webkitIDBKeyRange || 
                    window.msIDBKeyRange
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

```