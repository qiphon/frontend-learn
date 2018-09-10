#入门ts

###安装 

安装node后全局安装typescript就可以了

###编译ts文件
> tsc test.js

###数据类型

typescript里的数据类型 ： 

 1. boolean（最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做boolean（其它语言中也一样）。）
```
let isBool :boolean = true;
```
2.number（和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。）

```
let num:number =6;
let num16:number= 0xfood;  //十六进制
let num2:number = 0b1010;  //二进制
let num8:number = 0o744;	//八进制
```

