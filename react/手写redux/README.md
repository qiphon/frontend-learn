# redux

1. 仓库唯一

2. 约定修改仓库的值只能通过dispatch

> 所有可以执行的操作都在dispatch 中定义，限制用户对数据对修改

类似下面这样

```js
let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}

// 定义创建仓库对函数，每次修改数据都要重新执行监听函数
function createStore (state, stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
      stateChanger(state, action)
      listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
  }

```

##### 纯函数

2.1. 一个函数的返回结果只依赖他的参数
2.2. 并且在执行过程里面没有副作用

- 一个函数的返回结果只依赖他的参数

```js
const a = 1
const foo = (b) => a + b
foo(2) // => 3

```

foo 函数不是一个纯函数，因为它返回的结果依赖于外部变量 a，我们在不知道 a 的值的情况下，并不能保证 foo(2) 的返回值是 3。虽然 foo 函数的代码实现并没有变化，传入的参数也没有变化，但它的返回值却是不可预料的，现在 foo(2) 是 3，可能过了一会就是 4 了，因为 a 可能发生了变化变成了 2。

```js
const a = 1
const foo = (x, b) => x + b
foo(1, 2) // => 3

```

现在 foo 的返回结果只依赖于它的参数 x 和 b，foo(1, 2) 永远是 3。今天是 3，明天也是 3，在服务器跑是 3，在客户端跑也 3，不管你外部发生了什么变化，foo(1, 2) 永远是 3。只要 foo 代码不改变，你传入的参数是确定的，那么 foo(1, 2) 的值永远是可预料的。

这就是纯函数的第一个条件：一个函数的返回结果只依赖于它的参数。

- 在执行过程里面没有副作用

一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的。

我们修改一下 foo：

```js
const a = 1
const foo = (obj, b) => {
  return obj.x + b
}
const counter = { x: 1 }
foo(counter, 2) // => 3
counter.x // => 1

```

我们把原来的 x 换成了 obj，我现在可以往里面传一个对象进行计算，计算的过程里面并不会对传入的对象进行修改，计算前后的 counter 不会发生任何变化，计算前是 1，计算后也是 1，它现在是纯的。但是我再稍微修改一下它：

```js
const a = 1
const foo = (obj, b) => {
  obj.x = 2
  return obj.x + b
}
const counter = { x: 1 }
foo(counter, 2) // => 4
counter.x // => 2

```

现在情况发生了变化，我在 foo 内部加了一句 obj.x = 2，计算前 counter.x 是 1，但是计算以后 counter.x 是 2。foo 函数的执行对外部的 counter 产生了影响，它产生了副作用，因为它修改了外部传进来的对象，现在它是不纯的。

除了修改外部的变量，一个函数在执行过程中还有很多方式产生外部可观察的变化，比如说调用 DOM API 修改页面，或者你发送了 Ajax 请求，还有调用 window.reload 刷新浏览器，甚至是 console.log 往控制台打印数据也是副作用。

纯函数很严格，也就是说你几乎除了计算数据以外什么都不能干，计算的时候还不能依赖除了函数参数以外的数据。

3. 
