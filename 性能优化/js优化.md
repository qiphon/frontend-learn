减少代码偶合、减少作用域查找、不要滥用闭包


### 使用=== 代替 ==
```
null == undefined   //true 

'' == '0'           //false

0 == ''             //true

0 == '0'            //true

' \t\r\n ' == 0     //true

new String('abc') == 'abc'  //true

new Boolean(true) == true  //true

true == 1           //true

```
如果用全等（===），上面全部是false

###使用三目替代简单的if语句

```
function num(num){
    if(num < 0) return -1;
    else return num;
}
///优化

function num(num) {
    return num< 0?-1 : num;
}

```
