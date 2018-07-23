#了解sql

####cookies
>浏览器限制最大只能4k

####localstorage/sessionstorage
>适合小数据量的储存，firefox/chrome限制最大5m。
localStorage是以字符串形式存储的，存之前要先用 JSON.stringify 变成字符串， 取出的时候使用JSON.parse 恢复成对应的格式

##复杂数据管理（webSQL）

>WEB SQL 是前端数据库，它是本地储存的一种，使用SQLite实现，SQLite实现，它是一种轻量级的数据库，占用空间小，支持创建表，插入、修改、删除表格数据，但是不支持修改表结构（如删掉一纵列，修改表头等），不过可以把整张表删了
同一个域可以创建多个db，每个db有若干张表。如果单张表指定的空间太大，浏览器会提示用户是否允许使用这么多的空间。

```
/**
*   四个参数
*       1. dbName   2. dbVersion 3. dbDescription   4. dbMemory
*/

let db = window.openDatabase(
    "db_test","v1.0","this is webSQL ","dbMemory"
)

```

####创建表

/**
*   db.transaction,它会传入一个SQLTransaction的实例，表示一个事务，然后调用executeSql函数，传入四个参数
*   1. sql语句 2. 参数选项 3. 成功的回调函数 4. 失败的回调函数
*/

```
db.transaction(tx=>{
    tx.executeSql("create table if not exists order_data(order_id primary key,format_city,lat,lng,price,create_time)",[],null,(tx,err)=>{
        throw(`execute sql failed: ${err.code} ${err.message}`)
    })
})

// 描述 ： 创建一张order_data表，它的字段有6个，order_id为主键（主键用来标志这一行，并且不允许有重复的值）
```

####插入数据
```
db.transaction(tx=>{
    console.log(tx)
    tx.executeSql(`insert into order_data values(${order.orderId},'${order.format_city}',${order.lat},${order.lng},${order.price},${order.createTime})`)
    },(err)=>{
    console.log("操作失败",err)
})

```