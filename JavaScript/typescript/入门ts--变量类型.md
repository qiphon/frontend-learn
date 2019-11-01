#入门ts

###安装 

安装node后全局安装typescript就可以了

###编译ts文件
> tsc test.js

### vs code 自动编译ts文件

```
1. tsc --init   会生成一个配置文件，修改配置文件中的 outDir 添加一个路径

2. 找到vs code顶部菜单  终端 --> 运行任务 --> 输入’tsc 监视 ‘ 会显示该文件的配置，选择这个配置文件

```

###数据类型

typescript里的数据类型 ： 布尔（Boolean）、 数字（number）、字符串（string）、数组（array）、元祖（tuple）、枚举（enum）、任意类型（any）、null和undefined、void、never类型

1. boolean（最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做boolean（其它语言中也一样）。）
```
let isBool :boolean = true;
```
2. number（和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。）

```
let num:number =6;
let num16:number= 0xfood;  //十六进制
let num2:number = 0b1010;  //二进制
let num8:number = 0o744;	//八进制
```

3. string JavaScript程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 string表示文本数据类型。 和JavaScript一样，可以使用双引号（ "）或单引号（'）表示字符串。

```
let uname :string = 'qiphon';
let age:number = 0x27;
let say:string = ` ${uname} 
                    ${age + 1}
                        say Do not afraid ,just do it`;
console.log(say)

```

4. 数组 TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第二种方式是使用数组泛型，Array<元素类型>

```
//第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组;

let arr2 :number[] = [1,2,3,4]
let arr4 :string[] = ['sdfs','sdfs',uname,say]
console.log(arr2)
console.log(arr4)

// 第二种方式是使用数组泛型，Array<元素类型>

let arr3 :Array<number> = [3,2,353,34,123,53,6346,43,63]
let arr5 :Array<string> = ['sdf','wefsd','sdfsd','hgrh']
console.log(arr3)
console.log(arr5)

```

5. 元组 Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。

```
let tuple :[string,number,object] = [uname,age,{}]

tuple[3] = {a:3};   // 这里加入的字段必须在声明的时候声明过该类型

console.log(tuple)

```

6. 枚举
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```
// 默认情况下，从0开始为元素编号。
enum color2 {red,green,blue}
let e :color2 = color2.red;
console.log(e)
let f :string = color2[2]
console.log(f)

//  你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 2开始编号：
enum color {red=2,green,blue}
let c :color = color.red;
console.log(c)
let d :string = color[2]
console.log(d)

// 或者，全部都采用手动赋值：
enum color3 {red=2,green=5,blue=6}
let g :color3 = color3.green;
console.log(g)
let h:string = color3[6]
console.log(h)

```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字

7. Any
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：

```
let anything :any =12;
console.log(anything)

anything = 'sdfsdf'
console.log(anything)

anything = {a:age}
console.log(anything)


/// 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

anything = 24;
anything.toFixed(2)
console.log(anything)
let obj :object = 12;  // 会报错
obj.toFixed(2)
console.log(obj)

```

8. Void (通常用于给function)
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

```
function num():number{
    return 12;
}
function str():string{
    return '除了void外的函数声明必须有返回值'
}
function vo():void{
    console.log('我可以没有返回值')
}

let unusable: void = undefined;  // 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

```

9. Null 和 Undefined
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：

```
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// 一个元素可能是number 或者undefined或者null
let num :number | undefined ; // 如果变量声明却没有赋值，就不能声明成number ，所以我们可以使用undefined
num = 2;
console.log(num)

```


默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。

然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。


10. 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。


```
//类型断言有两种形式。 其一是“尖括号”语法：

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

//另一个为as语法：

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

```

> 函数中的参数不确定是否存在时可以在参数名后面紧跟一个问号，表示不确定性

```

function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
    console.log(a,b)
}
keepWholeObject({a:'2'})


```

11. 函数的定义方法

```
function run():number{
    return 12;
}
console.log(run())

function info(name:string,age:number):string{
    return `${name}---${age}`;
}
console.log(info('lee',23))

// 如果参数是可选参数，在参数后面添加问号（可选参数一定要配置到最后面）
function info(name:string,age?:number):string{
    if(age)
    return `${name}---${age}`;
    else
    return '没有年龄'
}
console.log(info('lee'))

// 默认参数
function info(name:string,age:number=20):string{
    if(age)
    return `${name}---${age}`;
    else
    return '没有年龄'
}
console.log(info('lee',10))

// 扩展运算符
function sum(a:number,...arg:number[]):number{
    let sum:number= a ;
    for(let i =0;i <arg.length; i++){
        sum +=arg[i]
    }
    return sum;
}
console.log(sum(1,2,3))

// 方法重载
function info(age:number):string;
function info(name:string):string;
function info(str:any):any{
    if(typeof str === 'string'){
        return 'string';
    }else{
        return 'number'
    }
};

console.log(info('lee'))

// 方法重载
function info(name:string):string;
function info(age:number):string;
function info(name:string,age?:number):string;
// 下面函数里一定要有any ，否则会出现编译错误
function info(name:any,age?:any):any{
    if(name && age && typeof name === 'string'){
        return 'all';
    }else if(age){
        return 'number'
    }else{
        return 'string'
    }
};

console.log(info('undefined'))


```

12. 类

```
class Person{
    name:string;    // 属性，前面省略了public关键词
    constructor(n:string){  // 构造函数，实例类的时候触发的方法
        this.name = n
    }
    run():void{
        console.log(this.name)
    }
    getN():string{
        return this.name
    }
}

let p = new Person('lee')
p.run()



// 继承
class Person{
    name:string;    // 属性，前面省略了public关键词
    constructor(n:string){  // 构造函数，实例类的时候触发的方法
        this.name = n
    }
    run():void{
        console.log(this.name)
    }
}

class Web extends Person{
    constructor(name:string){
        super(name)
    }
}

let w = new Web('Lee')
w.run()


// 三种修饰符

public              公有      在类里面、子类、类外面都可以访问（默认）

protected           保护类型  在类里面、子类里面可以访问，在类外面无法访问

private             私有      在类里可以直接访问，子类、类外都无法访问

class Person{
    name:string;    // 属性，前面省略了public关键词
    protected age:number;    // 保护属性
    private say:string;   // 私有属性，只有在类内部能访问
    constructor(n:string,age:number,say:string){  // 构造函数，实例类的时候触发的方法
        this.name = n
        this.age = age
        this.say = say
    }
    run():void{
        console.log(this.name,this.age,this.say)
    }
}

class Web extends Person{
    constructor(n:string,age:number,say:string){
        super(n,age,say)
    }
    work(){
        // console.log(this.name,this.age,this.say)   // say 在这里不能访问报错
    }
}
let p = new Person('zoe',22,'333333333333333')
console.log(p.say)  // 也会报错

let w = new Web('Lee',27,'1+1=2')
w.work()               // 子类里面可以访问public和protected的属性
console.log(w.name)   // 公有属性可以直接访问到的
// console.log(w.age)   // 保护属性es5能被访问，这里会报错
// console.log(w.say)   // 私有属性es5能被访问，这里会报错



// 静态方法

class Qiphon {
    name:string;
    age:number=20;
    constructor(name:string){
        this.name = name;
    }
    info():void{
        console.log(this.name)
    }
    static pos: string = 'frontend'
    static print():void{ // 静态方法只能能调用静态属性
        console.log('我是静态方法---->' + this.pos)
        // console.log('我是静态方法---->' + this.age)   // 这里会报错
    }
}

// let p = new Qiphon('qiphon');
// p.info()
Qiphon.print()

// 多态 ：父类定义一个方法不去实现，让继承它的子类去实现，每个子类有不同的表现
// 多态属于继承
// 多态

class Animal {
    name:string;
    constructor(name:stirng){
        this.name = name ;
    }
    eat(){
        console.log('这是一个吃的方法')
    }
}

class Dog extends Animal {
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log(this.name + 'dog')
    }
}
class Cat extends Animal {
    constructor(name:string){
        super(name)
    }
    eat(){ // 每个实例要重写这个方法，只是表现不一样
        console.log(this.name + 'cat')
    }
}

// ts抽象类 ：他是提供其他类继承的基类，不能直接实例化

// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且并且必须在派生类中实现。

// abstract 抽象方法只能放在抽象类里面

// 抽象类和抽象方法用来定义标准，像上面的Animal类要求他的子类必须有eat方法

abstract class Animal {
    name:any;
    constructor(name:any){
        this.name = name;
    }
    abstract eat():any  // 抽象方法可以在子类里不实现，抽象方法在派生类中必须实现
    speak(){   
        console.log('i can speak English')
    }
}

// let aa = new Animal()  // 这里会报错，抽象类不允许实例化

class Dog extends Animal {
    constructor(name:any){
        super(name)
    }
    eat(){
        console.log(this.name + ' say :i love meat')
    }
    say(){
        console.log('wangwang')
    }
}

let mm = new Dog('huahua')
mm.eat()
mm.say()




```

13. 接口 （定义标准）

> 面向对象编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到了一种限制性的作用。接口定义了某一批类所需要遵守的规范，接口不必关心这些类的内部状态数据，也不关心这些类里面方法的实现细节，它只规定这批类里必须提供哪些方法。提供这些方法的类就可以满足实际需要。ts中的接口类似Java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

```
属性接口，就是对json对象的约束
// 单个方法数据约束实现
function print1(jsonInfo:{a:string}){
    console.log('json 接口')
}

print1({a:'sdf'})

// 批量方法参数进行约束

interface FullName{   // 接口对象内以分号结尾
    firstName:string;   
    secondName:string;
}

function print(name:FullName){
    console.log(name.firstName + name.secondName)
}

// print({          // 如果这样写同样会报错，这样写只能写接口规定的字段
//     age:20,
//     firstName:'Lee',
//     secondName:'qiphon'
// })

let obj = {   // 这样写只要包含接口中定义的字段就不会报错
    age:27,
    firstName:'Lee',
    secondName:'qiphon'
}
print(obj)

// 可选接口属性

interface FullName{
    firName:string;
    secName?:string;  // 可选参数
}
function print(name:FullName){
    console.log('print( '+ name.firName + ' ' + (name.secName?name.secName:' )'))
}

print({
    firName:'Lee',
    // secName:'qiphon'
})


```