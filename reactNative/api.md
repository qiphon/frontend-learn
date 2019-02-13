# reactNative api

### 网络

> React Native 提供了和 web 标准一致的Fetch API，用于满足开发者访问网络的需求。如果你之前使用过XMLHttpRequest(即俗称的 ajax)或是其他的网络 API，那么 Fetch 用起来将会相当容易上手。

实例： 

```
fetch("https://mywebsite.com/endpoint/", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    firstParam: "yourValue",
    secondParam: "yourOtherValue"
  })
});

// 提交数据的格式关键取决于 headers 中的Content-Type。Content-Type有很多种，对应 body 的格式也有区别。到底应该采用什么样的Content-Type取决于服务器端，所以请和服务器端的开发人员沟通确定清楚。常用的'Content-Type'除了上面的'application/json'，还有传统的网页表单形式，示例如下：

fetch("https://mywebsite.com/endpoint/", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "key1=value1&key2=value2"
});

// Fetch 方法会返回一个Promise，这种模式可以简化异步风格的代码（译注：同样的，如果你不了解 promise，建议使用搜索引擎补课）
function getMoviesFromApiAsync() {
  return fetch("https://facebook.github.io/react-native/movies.json")
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.movies;
    })
    .catch(error => {
      console.error(error);
    });
}


// 你也可以在 React Native 应用中使用 ES2017 标准中的async/await 语法：

// 注意这个方法前面有async关键字
async function getMoviesFromApi() {
  try {
    // 注意这里的await语句，其所在的函数必须有async关键字声明
    let response = await fetch(
      "https://facebook.github.io/react-native/movies.json"
    );
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}

// Example POST method implementation:  // post 实例

postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

```

## WebSocket 支持

```
var ws = new WebSocket("ws://host.com/path");

ws.onopen = () => {
  // connection opened
  ws.send("something"); // send a message
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};

```

## 使用其他的网络库

React Native 中已经内置了XMLHttpRequest API(也就是俗称的 ajax)。一些基于 XMLHttpRequest 封装的第三方库也可以使用，例如frisbee或是axios等。但注意不能使用 jQuery，因为 jQuery 中还使用了很多浏览器中才有而 RN 中没有的东西（所以也不是所有 web 中的 ajax 库都可以直接使用）。


## 触摸事件 onPress

移动应用上的用户交互基本靠“摸”。当然，“摸”也是有各种姿势的：在一个按钮上点击，在一个列表上滑动，或是在一个地图上缩放。React Native 提供了可以处理常见触摸手势（例如点击或滑动）的组件， 以及可用于识别更复杂的手势的完整的手势响应系统。

```
<Button
  onPress={() => {
    Alert.alert("你点击了按钮！");
  }}
  title="点我！"
/>

```

## 应用内的错误与警告提示（红屏和黄屏）
红屏或黄屏提示都只会在开发版本中显示，正式的离线包中是不会显示的。

#### 红屏错误
>应用内的报错会以全屏红色显示在应用中（调试模式下），我们称为红屏（red box）报错。你可以使用console.error()来手动触发红屏错误。

#### 黄屏警告
>应用内的警告会以全屏黄色显示在应用中（调试模式下），我们称为黄屏（yellow box）报错。点击警告可以查看详情或是忽略掉。和红屏报警类似，你可以使用console.warn()来手动触发黄屏警告。在默认情况下，开发模式中启用了黄屏警告。可以通过以下代码关闭：
```

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
```
你也可以通过代码屏蔽指定的警告，像下面这样调用 ignoreWarnings 方法，参数为一个数组：

```
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);

```

## 区分平台的代码 Platform 模块

> React Native 提供了一个检测当前运行平台的模块。如果组件只有一小部分代码需要依据平台定制，那么这个模块就可以派上用场。
Platform.OS在 iOS 上会返回ios，而在 Android 设备或模拟器上则会返回android。

Platform下面含有的属性
```
OS: "android"
Version: 27
isTV: false
isTesting: false
select: ƒ select(obj)
```

```
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  height: Platform.OS === "ios" ? 200 : 100
});

```
还有个实用的方法是 Platform.select()，它可以以 Platform.OS 为 key，从传入的对象中返回对应平台的值

```
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {  // 这个是返回的值
        backgroundColor: "red"
      },
      android: {
        backgroundColor: "blue"
      }
    })
  }
});


或者这样

const Component = Platform.select({
  ios: () => require("ComponentIOS"),
  android: () => require("ComponentAndroid")
})();

<Component />;

```


#### Platform.Version 

在 Android 上，Version属性是一个数字，表示 Android 的 api level
在 iOS 上，Version属性是-[UIDevice systemVersion]的返回值，具体形式为一个表示当前系统版本的字符串。比如可能是"10.3"。

```
// android

import { Platform } from "react-native";

if (Platform.Version === 25) {
  console.log("Running on Nougat!");
}

// ios
import { Platform } from "react-native";

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log("Work around a change in behavior");
}

```
### 特定平台扩展名(每个平台自动使用该平台的文件)

当不同平台的代码逻辑较为复杂时，最好是放到不同的文件里，这时候我们可以使用特定平台扩展名。React Native 会检测某个文件是否具有.ios.或是.android.的扩展名，然后根据当前运行的平台自动加载正确对应的文件。


```
// 例如这样一个文件夹下，放2个不同扩展名的文件

BigButton.ios.js
BigButton.android.js

// 引用的方法

import BigButton from './BigButton';

```

> 如果你还希望在 web 端复用 React Native 的代码，那么还可以使用.native.js的扩展名。此时 iOS 和 Android 会使用BigButton.native.js文件，而 web 端会使用BigButton.js。（注意目前官方并没有直接提供 web 端的支持，请在社区搜索第三方方案）