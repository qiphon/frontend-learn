#js高级技巧

##安全的类型检测

```
let data = [1,2,3,4]
console.log(data instanceof Array)

```
但是上面的方法在iframe下访问父窗口变量的时候会失败

```
<iframe src="./iframe.html" frameborder="0"></iframe>
<script>
    let data = [1,2,3,4]
    console.log(data instanceof Array)
    
    window.global = {
        arr:[1,2,0,43]
    }
    console.log("self",window.global.arr instanceof Array)
</script>


// iframe 内容

<script>
    console.log("iframe",window.parent.global.arr instanceof Array)
</script>




/// 当把一个函数当作参数传个另一个函数时，此函数的执行上下文往往会发生变化

        class draw{
            constructor(){
                this.point = []
            }
            handleMouseClick(event){
                this.point.push(event.latLng)
            }
            init(){
                $map.on('click',this.handleMouseClick)   ///这里的this不再指向draw
            }
        }


/// 方法一

        class draw{
            constructor(){
                this.point = []
            }
            handleMouseClick(event){
                this.point.push(event.latLng)
            }
            init(){
                let _this = this;
                $map.on('click',event=>_this.handleMouseClick(event))   ///这里的this不再指向draw
            }
        }

// 由于使用了箭头函数this 还是指向父级的上下文所以这里直接使用this也是可以的

init(){
    $map.on('click',event=>this.handleMouseClick(event))   ///这里的this不再指向draw
}
```


##防止篡改对象

有时候要防止写好的对象被误篡改，所以要写一些保护方法

1. Object.seal防止新增和删除属性

```
let person = {
    name:1
}

Object.seal(person)

delete person  //false

person.age=3    //再次查询是undefined
//使用严格模式时会报错

```
 
2. Object.freeze冻结对象

这个方法是不能改属性值 也不能增加属性

```
b = {a:2}
{a: 2}
Object.freeze(b)
{a: 2}
b.t=2
2
b
{a: 2}
b.t 
undefined
b.a=99
99
b
{a: 2}

//严格模式下会报错
// 使用Object.isFrozen 、 Object.isSealed 、 Object.isExtensive 判断当前对象的状态

```

3. defineProperty 冻结单个属性

如果设置enumable/writalbe 为 false ，那么这个属性将不可遍历和写

```
m = {
    name:'qqq'
}
{name: "qqq"}
Object.defineProperty(m,'grade',{enumerable:false,value:3})   ///将不可遍历
{name: "qqq", grade: 3}
for(let key in m){console.log(key)}
VM4830:1 name
undefined




y={m:12}
{m: 12}
Object.defineProperty(y,'grade',{writable:false},44)  ///不可修改
{m: 12, grade: undefined}
y
{m: 12, grade: undefined}
y.grade=4
4
y
{m: 12, grade: undefined}


```

