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

8. Void
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

