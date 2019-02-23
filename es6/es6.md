# es6 

### function name

```
function aa(){

}

aa.name // aa


let b = function aa(){

}
b.name // aa


let b = function(){

}
b.name // b

```

### 对象到属性名字包含空格或横线

```
let a = {

}

a["hot drink"] = "hot drink"

a["hot drink"]   //  "hot drink"

```

### Object.setPrototypeOf

```
let a = {
    drink(){
        return "tea"
    }
}

let b = {
    drink(){
        return "beer"
    }
}

let c = Object.create(a)
a.drink()   // tea




```