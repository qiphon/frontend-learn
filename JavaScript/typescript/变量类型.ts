
let uname :string = 'qiphon';
let age:number = 0x27;
let say:string = ` ${uname} 
                    ${age + 1}
                        say Do not afraid ,just do it`;
// console.log(say)

// let arr : [] = [1,2,'sdf'];   // 这是错误的写法，
// console.log(arr)   

// let arr2 :number[] = [1,2,3,4]
// let arr4 :string[] = ['sdfs','sdfs',uname,say]
// console.log(arr2)
// console.log(arr4)

// let arr3 :Array<number> = [3,2,353,34,123,53,6346,43,63]
// let arr5 :Array<string> = ['sdf','wefsd','sdfsd','hgrh']
// console.log(arr3)
// console.log(arr5)

//let tuple :[string,number,object] = [uname,age,{}]

//console.log(tuple)
// enum color2 {red,green,blue}

// let e :color2 = color2.red;
// console.log(e)
// let f :string = color2[2]
// console.log(f)


// enum color {red=2,green,blue}
// let c :color = color.red;
// console.log(c)
// let d :string = color[2]
// console.log(d)


// enum color3 {red=2,green=5,blue=6}
// let g :color3 = color3.green;
// console.log(g)
// let h:string = color3[6]
// console.log(h)
// let bool: boolean = true;

// let anything :any =12;
// // console.log(anything)
// anything = 'sdfsdf'
// console.log(anything)
// anything = {a:age}
// console.log(anything)

// anything = 24;
// anything.toFixed(2)
// console.log(anything)
// let obj :object = 12;  // 会报错
// obj.toFixed(2)
// console.log(obj)

// void

// function num():number{
//     return 12;
// }
// function str():string{
//     return '除了void外的函数声明必须有返回值'
// }
// function vo():void{
//     console.log('我可以没有返回值')
// }


// let len :number = (<string>anything).length;
// let len :number = (anything as string).length 
// console.log(len)

// let [, second, , fourth] = [1, 2, 3, 4];
// console.log(second)
// console.log(fourth)
// function keepWholeObject(wholeObject: { a: string, b?: number }) {
//     let { a, b = 1001 } = wholeObject;
//     console.log(a,b)
// }
// keepWholeObject({a:'2'})

// let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
// let search = { food: "rich", ...defaults };
// console.log(search)

// 一个元素可能 是 number或undefined
// let num :number | undefined | null ;
// num = null;
// num = undefined;
// num = 333;
// console.log(num)

// let num :any[] = [12,'12',{a:12}];
// console.log(num)

// function run():number{
//     return 12;
// }
// console.log(run())

// function info(age:number=20,name:string):string{
//     if(age)
//     return `${name}---${age}`;
//     else
//     return '没有年龄'
// }
// console.log(info(10,'lee'))

// function sum(a:number,...arg:number[]):number{
//     let sum:number= a ;
//     for(let i =0;i <arg.length; i++){
//         sum +=arg[i]
//     }
//     return sum;
// }
// console.log(sum(1,2,3))

// // 方法重载
// function info(name:string):string;
// function info(age:number):string;
// function info(name:string,age?:number):string;
// // 下面函数里一定要有any ，否则会出现编译错误
// function info(name:any,age?:any):any{
//     if(name && age && typeof name === 'string'){
//         return 'all';
//     }else if(age){
//         return 'number'
//     }else{
//         return 'string'
//     }
// };

// console.log(info('undefined'))

// class Person{
//     name:string;    // 属性，前面省略了public关键词
//     constructor(n:string){  // 构造函数，实例类的时候触发的方法
//         this.name = n
//     }
//     run():void{
//         console.log(this.name)
//     }
// }

// let p = new Person('lee')
// p.run()
// class Person{
//     name:string;    // 属性，前面省略了public关键词
//     constructor(n:string){  // 构造函数，实例类的时候触发的方法
//         this.name = n
//     }
//     run():void{
//         console.log(this.name)
//     }
//     getN():string{
//         return this.name
//     }
// }

// let p = new Person('lee')
// p.run()

// 继承实现

// class Person{
//     name:string;    // 属性，前面省略了public关键词
//     protected age:number;    // 保护属性
//     private say:string;   // 私有属性，只有在类内部能访问
//     constructor(n:string,age:number,say:string){  // 构造函数，实例类的时候触发的方法
//         this.name = n
//         this.age = age
//         this.say = say
//     }
//     run():void{
//         console.log(this.name,this.age,this.say)
//     }
// }

// class Web extends Person{
//     constructor(n:string,age:number,say:string){
//         super(n,age,say)
//     }
//     work(){
//         // console.log(this.name,this.age,this.say)   // say 在这里不能访问报错
//     }
// }
// let p = new Person('zoe',22,'333333333333333')
// console.log(p.say)  // 也会报错

// let w = new Web('Lee',27,'1+1=2')
// w.work()               // 子类里面可以访问public和protected的属性
// console.log(w.name)   // 公有属性可以直接访问到的
// console.log(w.age)   // 保护属性es5能被访问，这里会报错
// console.log(w.say)   // 私有属性es5能被访问，这里会报错


// 静态方法
// class Qiphon {
//     name:string;
//     age:number=20;
//     constructor(name:string){
//         this.name = name;
//     }
//     info():void{
//         console.log(this.name)
//     }
//     static pos: string = 'frontend'
//     static print():void{ // 静态方法只能能调用静态属性
//         console.log('我是静态方法---->' + this.pos)
//         // console.log('我是静态方法---->' + this.age)   // 这里会报错
//     }
// }

// // let p = new Qiphon('qiphon');
// // p.info()
// Qiphon.print()


// 多态

// class Animal {
//     name:string;
//     constructor(name:stirng){
//         this.name = name ;
//     }
//     eat(){
//         console.log('这是一个吃的方法')
//     }
// }

// class Dog extends Animal {
//     constructor(name:string){
//         super(name)
//     }
//     eat(){
//         console.log(this.name + 'dog')
//     }
// }
// class Cat extends Animal {
//     constructor(name:string){
//         super(name)
//     }
//     eat(){ // 每个实例要重写这个方法，只是表现不一样
//         console.log(this.name + 'cat')
//     }
// }

// ts抽象类 ：他是提供其他类继承的基类，不能直接实例化

// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且并且必须在派生类中实现。

// abstract 抽象方法只能放在抽象类里面

// 抽象类和抽象方法用来定义标准，像上面的Animal类要求他的子类必须有eat方法
// abstract class Animal {
//     name:any;
//     constructor(name:any){
//         this.name = name;
//     }
//     abstract eat():any  // 抽象方法可以在子类里不实现，抽象方法必须实现
//     speak(){   
//         console.log('i can speak English')
//     }
// }

// // let aa = new Animal()  // 这里会报错，抽象类不允许实例化

// class Dog extends Animal {
//     constructor(name:any){
//         super(name)
//     }
//     eat(){
//         console.log(this.name + ' say :i love meat')
//     }
//     say(){
//         console.log('wangwang')
//     }
// }

// let mm = new Dog('huahua')
// mm.eat()
// mm.say()
// mm.speak()



// 接口

// 属性接口


// // 单个方法数据约束实现
// function print1(jsonInfo:{a:string}){
//     console.log('json 接口')
// }

// print1({a:'sdf'})

// // 批量方法参数进行约束

// interface FullName{   // 接口对象内以分号结尾
//     firstName:string;   
//     secondName:string;
// }

// function print(name:FullName){
//     console.log(name.firstName + name.secondName)
// }

// // print({          // 如果这样写同样会报错，这样写只能写接口规定的字段
// //     age:20,
// //     firstName:'Lee',
// //     secondName:'qiphon'
// // })

// let obj = {   // 这样写只要包含接口中定义的字段就不会报错
//     age:27,
//     firstName:'Lee',
//     secondName:'qiphon'
// }
// print(obj)

// 可选接口属性

// interface FullName{
//     firName:string;
//     secName?:string;  // 可选参数
// }
// function print(name:FullName){
//     console.log('print( '+ name.firName + ' ' + (name.secName?name.secName:' )'))
// }

// print({
//     firName:'Lee',
//     // secName:'qiphon'
// })


// 函数类型接口 ：对方法传入的参数以及返回值进行约束

// 加密的函数类型接口

interface encrypt{
    (key:string,value:string):string;
}

var md5:encrypt = function(key,value){
    return key + value;
}

console.log(md5('lee','qiphon'))

var sha1:encrypt = function(key,value){
    return key +  '-_-' +value;
}
console.log(sha1('zoe','lee'))