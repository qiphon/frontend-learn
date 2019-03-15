# dart 语法

1. 变量声明 

var 类似于JavaScript中的var，它可以接收任何类型的变量，但最大的不同是Dart中var变量一旦赋值，类型便会确定，则不能再改变其类型，如：

```
var t;
t= 'hello world';  // dart 是强类型语言，同时语法要求也比较严格，每句话结束必须写分号
// 类型一旦定义后就不能再修改
t = 1000 ;   // 这里会报错 

```

2. dynamic 和 Object 

Object 是 dart 所有对象的根基类，也就是说所有的类型都是Object的子类（包括 Function、Null），所以任何类型的数据都可以赋值给Object声明的对象。 dynamic 与 var 一样都是关键词，声明的变量可以赋值任意对象，dynamic 与 var 相同之处在于，dynamic 与 Object 声明的变量一样都可以在后期改变赋值类型。

```
dynamic t ;
Object x;
t = 'hello world';
x = 1000;
// 下面代码没有任何问题
t = 200;
x= 'hello dart';

```
dynamic 与 Object 不同的是，dynamic 声明的对象编译器会提供所有可能的组合，Object 声明的对象只能使用 Object 的属性与方法，否则编译器会报错。

```
dynamic a;
Object b;
main(){
    a = '';
    b = '';
    printLengths();

}
printLengths() {
    // no warning
    print(a.length);
    // waring 
    // The getter 'length' is not defined for the class 'Object'
    print(b.length);
}

```
变量a 不会报错，变量b 编译器会报错，dynamic 的这个特性与Objective-C 中的 id 作用很像。dynamic 的这个特点使得我们在使用它时需要格外注意，这很可能引入一个运行时错误。

3. final 和 const 
如果您从未打算改变一个变量，那么使用final 或 const ，不是 var，也不是一个类型。一个final变量只会被设置一次，两者的区别在于：const 变量是一个编译时常量；final 变量在第一次使用时被初始化。被final 或者 const 修饰的变量，变量类型可以省略。

```
// 可以省略 String 这个类型声明
final str = 'hello';
// final String str = 'hello';
const str1 = 'hi';
const String str1 = 'hi';

```
4. 函数

dart 是一种真正的面向对象的语言，所以即使是函数也是对象，并且有一个类型Function 。这意味着函数可以赋值给变量或作为参数传递给其它函数，这是函数式编程的典型特征。

-- 函数声明

```
bool isNoble(int atomicNumber) {
    return _nobleGases[atomicNumber] != null;
}

// dart 函数声明如果没有显式声明，返回值类型时会默认当做 dynamic 处理，注意函数返回值没有类型推断：

typedef bool CALLBACK();

// 如果不指定返回类型，此时默认为dynamic ，不是 bool
isNoble(int atomicNumber){
    return _nobleGases[atomicNumber] != null;
}

void test(CALLBACK cb){
    print(cb());
}

test(isNoble); // 报错， isNoble不是bool 类型

```
-- 对于只包含一个表达式的函数，可以使用简写语法

```
bool isNoble(int atomicNumber)=> _nobleGases[atomicNumber] != null;

```
-- 函数作为变量

```
var say = (str){
    print(str);
};
say('hello');

```

-- 函数作为参数传递

```
void execute(var callback){
    callback();
}

execute(()=>print('hello'));

```

-- 可选的位置参数

包装一组函数参数，用[]标记为可选位置参数：

```
String say(String from,String msg, [String device]){
    var result = '$from says $msg';
    if(device != null){
        result = '$result with a $device';
    }
    return result;
}

// 下面是可选参数调用这个函数的例子：

say('qiphon', "hello zoe");  // 结果是：qiphon says hello zoe

// 下面使用第三个参数调用这个函数的例子：

say('qiphon', "hello", 'smoke signal');  // 结果是: qiphon says hello with a smoke signal

```

-- 可选的命名参数

定义函数时，使用 ｛param1, param2, ... ｝,用于指定命名参数。

```
// 设置[bold] 和 [hidden]标识
void enableFlags({
    bool bold,
    bool hidden
}){
    // ... dosomething
};

// 调用函数时，可以使用指定命名参数。例如：paramName: value

enableFlags(bold:true,hidden: false);

可选命名参数在flutter中使用非常多

```

## 异步支持

dart 类库有非常多的返回 Future 或者 Stream 对象的函数。这些函数被称为异步函数：它们只会在设置好一些耗时操作之后返回，比如像io 操作。而不是等到这个操作完成。

async 和 await关键词支持了异步编程，运行你写出和同步代码很像的异步代码。

### Future

> Future 与 JavaScript 中的 Promise 非常相似，表示一个异步操作的最终完成（或失败）及其结果值的表示。简单来说，他就是用来处理异步操作的，异步处理成功了就执行成功的操作，否则就捕获错误或停止后续操作。一个Future 只会对应一个结果，要么成功要么失败。
由于本身功能较多，这里只提到常用的api 及特性。还有，请记住，Future 的所有api 的返回值仍然是一个Future 对象，所以可以很方便的链式调用。

```
Future.delayed(new Duration(seconds: 2), (){
    return 'hello';  // 这里用一个延时任务模拟网络请求
    // throw AssertionError('error');
}).then((data){
    print(data);
}).catchError((e){
    // 失败时执行
    print(e);
})

// 如果抛出错误，then 的回调将不会执行，直接执行catchError ；但是并不是只有catchError 回调才能捕获错误，then 方法还有个可选参数 onError

Future.delayed( new Duration(seconds: 2),(){
    throw AssertionError('error');
}).then((data){
    print('sucess');
},onError: (e){
    print(e);
})

// 有些时候 ，我们会需要无论成功和失败都执行指定函数，这时我们可以使用Future.whenComplete

Future.delayed( new Duration(seconds: 2),(){
    throw AssertionError('error');
}).then((data){
    print('sucess');
}).catchError((err){
    print(err);
}).whenComplete((){
    // 无论成功还是失败都会执行这个
})

// Future.wait  

Future.wait([
    Future.delayed(new Duration(seconds: 2),(){
        return "hello";
    }),
    Future.delayed(new Duration(seconds: 4),(){
        return 'world';
    })
]).then((res){
    print(res[0] + res[1]);   // 只有2个请求都完成时才会到这里
}).catchError((e){
    print(e);
})


```
### Async/await 

dart 中的 async/await 和 JavaScript 中的 async/await 功能和用法是一样的

```
Future<String> login(String userName, String pwd){
    // ... 用户登录
}

Future<String> getUserInfo(String id){
    // ... 获取用户信息
}

Future<String> saveUserInfo(String id){
    // ... 保存用户信息
}

login('qiphon',"*****").then((id){
    // 登录后返回ID
    getUserInfo(id).then((userinfo){
        saveUserInfo(userInfo).then((){
            // 保存信息后执行其他操作 。。。
            // 大量的异步会产生回调地狱，让代码非常难以维护
        })
    })
})

// 使用Future 消除回调地狱. Future 的所有api 的返回值仍然是一个Future 对象，所以可以很方便的进行链式调用，如果then中返回的是一个 Future 的话，该Future 会执行，执行结束会触发后面的then 回调

login('qiphon',"*****").then((id){
    return getUserInfo(id);
}).then((userInfo){
    return saveUserInfo(userInfo);
}).then((e){
    // 执行接下来的操作
}).catchError((e){
    print(e);
})

// async/await 消除 callback hell

task() async {  // async 用来表示函数是异步的，定义的函数会返回一个Future对象，可以使用then 方法添加回调函数。
    try{
        String id = await login('qiphon',"******");  // await 后面是一个Future ，表示等待该异步完成，完成后才继续往下走，await 必须出现在async 函数内部
        String userInfo = await getUserInfo(id);
        await saveUserInfo(userInfo);
        // .... 执行接下来的操作
    } catch(err){
        print(err);
    }
}

```

### stream 也是用于接收异步事件数据。和Future 不同的地方是它可以接收多个异步操作的结果（成功或失败）。也就是说，在执行异步任务时，可以通过多次触发成功或失败事件来传递结果数据或错误异常。stream 常用于会多次读取数据的异步场景，如网络下载、文件读写等。

```
Stream.fromFutures([
    // 1s 后返回结果
    Future.dalayed(new Duration(seconds: 1),(){
        return 'hello 1';
    }),
    Future.delayed(new Duration(seconds: 2),(){
        throw AssertionError('error');
    }),
    Future.delayed(new Duration(seconds: 3),(){
        return 'hello 3';
    })
]).listen((data){
    print(data);
},onError: (err){
    print(err)
},onDone:(){
    // ...
})
// 输出结果
// I/flutter (17666): hello 1
// I/flutter (17666): Error
// I/flutter (17666): hello 3
// 

```

学习来源  https://book.flutterchina.club/chapter1/dart.html 向辛勤的社区建造者致敬！