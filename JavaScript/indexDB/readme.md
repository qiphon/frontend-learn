# [indexDB 前端数据仓库](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

IndexedDB是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索。虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB提供了一个解决方案。

IndexedDB是一个基于JavaScript的面向对象的数据库。 IndexedDB允许您存储和检索用键索引的对象；可以存储结构化克隆算法支持的任何对象。 您只需要指定数据库模式，打开与数据库的连接，然后检索和更新一系列事务。

webkit/blink 支持当前版本规范， Chrome 23+、Opera 17+、IE10+同样支持

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

## 局限性

一下情况不适合使用 indexedDB 

- 全球多种语言混合存储。国际化支持不好。需要自己处理
- 和服务器数据同步。需要自己写同步代码
- 全文搜索。indexedDB 接口没有类似 SQL 语句中的 LIKE 功能

注意，在以下情况，数据库可能会被清除：

- 用户请求清除数据
- 浏览器处于隐私模式。最后退出浏览器的时候，数据会被清除
- 硬盘等存储设备的容量到限
- 数据损坏
- 进行与特性不兼容的操作


## 名词解释

- 数据库（database）

一个信息库，通常包含一个或多个 Object stores，每个数据库必须包含以下内容

    - 名字：它标识了一个特定源中的数据库，并且在数据库的整个生命周期内保持不变。此名字可以为任意字符串值（包括空字符串）
    - 当前版本：当一个数据库首次创建时，它的 version 为 1，除非另外指定，每个数据库在任意时刻只能有一个version

- 持久性（durable）

在 Firefox 中，indexeddb 是持久的，也就是说在一个读写事务中，一旦 IDBTransaction.oncomplete 事件被触发，就代表着数据被写入到磁盘中了
从 Firefox 4 开始indexedDB 事务放松了对持久性的保证以提高性能，这与其他浏览器相同。这种情况下，当操作系统被告知去写入数据后 complete 事件被触发，但此时数据可能还未写入到磁盘。事件触发因此变得更快，但是这样会有极小的情况会发生以下情况：
如果操作系统崩溃或在写入数据时断电，那么整个事务就会丢失。由于这种事件是罕见的，不必过分担心

- 对象仓库（object store）

数据在数据库中存储的方式，数据以键值的形式被对象仓库永久持有，对象仓库中的数据以 keys 升序排列

每个对象仓库在同一个数据库中必须有唯一的名字。对象存储可以有一个 key generator 和一个 key path。如果对象仓库有 key path，则使用 in-line keys,否则使用 out-of-line keys

- 版本（version）

每当第一次创建一个数据库，它的版本为 int 1，每个数据库依次有一个版本号；
一个数据库不能有多个版本号。改变版本号唯一的途径是通过一个比当前版本号更高的值去打开数据库。 这会开启一个 VERSION_CHANGE 事务，并触发 upgradeneeded 事件，只有在该事件的处理函中才能更新到数据库模式

- 数据库连接 （database connection）

通过打开数据库创建的操作。一个给定的数据库可以同时拥有多个连接

- 事务（transaction)

在一个特定的数据库上，一组具备原子性和持久性的数据访问和数据修改的操作。对数据库读取和修改的操作只能在事务中进行

一个数据库可以有多个关联的事务，只要进行写操作的事务作用域不相互重合。

事务的作用域在事务被创建时就被确定，指定事务能够进行交互的对象仓库，作用域一旦被确定，就会在整个生命周期中保持不变。

事务期望有较短的生命周期，所以浏览器会终止一个消耗时间过长的事务，为了释放存储资源，运行过久的事务会被锁定。你可以中断一个事务，来回滚事务中对数据库进行的操作。也可以在事务未开始或未激活时中断它。

事务有三种模式：读写、只读和版本变更。创建和删除对象仓库唯一的方法就是通过调用版本变更事务。

- 请求（request）

在数据库上进行读写操作完成后的操作。每个请求代表一个读或写操作

- 索引（index）

一个对象仓库，专门用来查找另一个对象仓库中的记录，其中被查找的对象仓库被称为引用对象仓库。
索引是一个稳定的键值对存储，其记录中的值是引用对象仓库记录中的键。当引用对象仓库中的记录新增、更新或删除时，索引中的记录就会进行粒子性增加。
索引中的每一条记录只能指向引用对象仓库中的一条记录，但是多个索引可以同时引用同一个对象仓库。当对象仓库发生改变时，所有引用该对象仓库的引用均会自动更新

- 键（key）

在对象仓库中组织和检索被存储起来的值的数据值。
数据仓库的键有一下三种方式生成：键生成器、键路径和显示指定的值。键必须是一种能够比较大小的数据类型，在同一个数据仓库中，每条记录必须有一个独一无二的键
键的数据类型可以是以下几种：字符串、日期、浮点、和数组。
键的取值可以从空数组到无穷。并且你可以使用嵌套数组。
在Firefox 11 之前，键只能是字符串和整形

- 键生成器（key generator）

一种生成有序键值的机制。如果对象仓库并不具备一个键生成器，那么应用程序必须为存储的记录提供键。生成器在仓库之间不共享

- 内键（in-line key）

作为存储值一部分的键。内键由键路径查找。内键由生成器生成。当内键生成后，他会被键路径存储在值中，它也可以被当做键使用

- 外键（out-of-line key）

与值分开存储的键

- 键路径（key path）

指定浏览器如何从对象仓库或索引存储的值中提取键，一个合法的键路径可以是以下形式：空字符串、JavaScript标识符或由句点分割的多个 JavaScript标识符，但不能包括空格

- 值（value）

每一条记录包含一个值，该值可以包含任何 JavaScript 表达式，包括： 布尔、数字、字符串、日期、对象、数组、正则、undefined和null

对于对象和数组，他们的属性和值也可以是任意合法的值。

规范允许存储文件和二进制对象，但是该标准只被 Firefox 11+ 支持

- 作用域（scope）

事务所作用的一组对象仓库或索引。只读事务的作用域可以是相互重叠并同时执行操作。但写操作事务的作用域不可以相互重叠。但是仍然可以同时开启多个拥有相作用域的事务，只要保证他们的操作不会同时执行

- 游标（cursor）

在键的某个范围内迭代查询多条记录的机制。游标有一个正在被迭代的对象仓库或索引的源。它处于该范围内的一个位置，并按照键的顺序正向或逆向移动。

- 键范围（key range）

用做键的数据类型上的连续的间隔。使用键或键的某个范围可以从对象仓库和索引中读取记录。可以通过上限和下限设置和筛选范围。
