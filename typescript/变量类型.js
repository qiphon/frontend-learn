var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var uname = 'qiphon';
var age = 0x27;
var say = " " + uname + " \n                    " + (age + 1) + "\n                        say Do not afraid ,just do it";
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
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign({ food: "rich" }, defaults);
console.log(search);
