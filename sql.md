#了解sql

####cookies
>浏览器限制最大只能4k

####localstorage/sessionstorage
>适合小数据量的储存，firefox/chrome限制最大5m。
localStorage是以字符串形式存储的，存之前要先用 JSON.stringify 变成字符串， 取出的时候使用JSON.parse 恢复成对应的格式

##复杂数据管理（webSQL）

>WEB SQL 是前端数据库，它是本地储存的一种，使用SQLite实现，SQLite实现，它是一种轻量级的数据库，占用空间小，支持创建表，插入、修改、删除表格数据，但是不支持修改表结构（如删掉一纵列，修改表头等），不过可以把整张表删了
同一个域可以创建多个db，每个db有若干张表。如果单张表指定的空间太大，浏览器会提示用户是否允许使用这么多的空间。
firefox 不支持

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

*实例*
```
/**
*   @param dbName 数据库名字
*   @param version 数据库版本 
*   @param description 数据库描述
*   @param memory 数据库内存容量
*   @param create 建表
*   @param tables 表格字段
*   @param values 插入字段
*/
function websql(obj){
    let {db,dbName,version,description,memory,create,tableName,tables,insert,values,insertTable} = obj
    if(dbName && version && description && memory){
        return window.openDatabase(dbName,version,description,memory)
    }else if(db && tableName && create && tables){
        createTable(db,tableName,tables,insert,)
    }else if(db && insert && values){
        tableInsert(db,values,tableName,insertTable)
    }
}
function createTable(db,tableName,tables,insert,values){ // 创建
    db.transaction(tx=>{
        tx.executeSql("create table if not exists "+tableName+"(" + tables +")",[],
        (db,res)=>{   // 成功的函数
            console.log(res)
            insert && values && db.executeSql("insert into order_data values("+values+")")
        },
        (tx,err)=>{ // 失败回调
            console.log(tx)
            throw(`execute sql failed : ${err.code} ${err.message}`)
        })
    })
}
function tableInsert(db,values,tableName,insertTable){  // 插入
    db.transaction(tx=>{
        tx.executeSql("insert into "+tableName+"("+insertTable+") values("+values+")")
        },(err)=>{
        console.log("插入失败",err)
    })
}
let db = websql({
    dbName:'test_db',
    version:'v1.0',
    description:"qiphon's db",
    memory:2*1024*1024
})
// console.log(db)
db && websql({
    db,
    create:1,
    tableName:"student2",
    tables:'id integer primary key,score,create_time',
})
db && websql({
    db,
    insert:1,
    tableName:"student2",
    insertTable:"score, create_time",
    values:`101,${new Date().getTime()}`
})
```
####主键约束
> 如果插入一个重复的主键，这里为order_id，executeSql 会报错，所以一般id是自动生成的，MySQL可以指定某个整数字段为auto_increment,而webSQL 对整数字段不指定也是auto_increment,需要在创建的时候指定当前字段为integer

```
create table student(id integer primary key,age,score)

insert into student(age,score) values(19,87)
```

####select 查询
```
select city as "城市",count(order_id) as count, sum(price) as price from table group by city order by date desc limit 0,10

select id form table where id = ${order_id}
```

####创建索引
> 主键，自动会有索引，其他字段需要手动创建索引,创建索引会提高查询效率

```
create index if not exists index_score on student(score)
```

###关系型数据库的优缺点
####1. SQL支持非常复杂的查询，可以联表查询、使用正则表达式查询、嵌套查询，还可以写一个独立的SQL脚本
####2. 缺点：
        1. 不方便横向扩展，如果给数据表添加一个字段，当这个字段达到亿级，操作的复杂性会变得非常高
        2. 海量数据用SQL联表查询性能将会非常差
        3. 关系型数据库为保持事物的一致性特点，难以应对高并发


##非关系型数据库

非关系型数据库根据他的存储特点，常用的有

: 1. key-value 型，如 Redis/IndexedDB,value可以为任意的数据类型
: 2. JSON/document 型,如mongoDB,value按照一定的格式，可以对value字段做索引，IndexDB也支持

>非关系型数据库也叫NoSQL数据库。是not Only SQL 的简写，意思是不仅仅是SQL，但实际它和SQL没有什么关系，只是为了让大家感觉他不是太异类。
它的特点是存储比较灵活，但是查找没有像关系型SQL一样好用，适用于数据量很大，只需要单表key查询，一致性不用很高的场景。

##IndexedDB

>IndexedDB 是本地存储的第三种方式，它是非关系型数据库。它的建立数据库、建表、插入数据等操作

#SQL 注入
```
// 问题示例
select * form order_data where user_id = 2342342323 and state = '${userData.state}'

// 脚本注入的方法
select * form order_data where user_id = 2342342323 and state = 'ca' union select * from order_data where '' = '';

```

##分布式数据库
如果网站的访问量太大，一个数据库很可能扛不住，需要多搞几台相同的数据库分担压力，但是要保证这几个数据库数据一致性。有很多解决方案，最简单的如mySQL的replication