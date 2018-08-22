#react native note 

facebook提供了快速开发react应用的工具，叫create-react-app 
```
npm install create-react-app -g   //安装工具

create-react-app <appName>  // 创建项目，在该路径下会生成一个appName的项目目录

cd worth  // 我的appName是worth

npm start  // 运行项目

```

#### 增加一个新的react组件

react 的首要思想是通过组件（Component）来开发应用。所谓组件，简单说，是完成指定功能的独立的、可重用的代码。

>!注意： 代码最好使用大驼峰，不要使用小驼峰(react判断一个组件是不是html中的元素的原则第一个是首字母是否大写)

##### 在html中直接使用onclick很不专业，原因如下：

: 1. onclick添加的事件处理函数是在全局环境下执行的，这污染了全局环境，很容易产生意料不到的问题
: 2. 给很多的dom添加onclick事件，可能会影响网页的性能
: 3. 使用onclick的dom元素，如果要动态的从dom树中删除掉的话，需要把对应的事件处理器注销，加入忘了注销可能会引起内存泄漏

示例：写个计数的组件
```
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ClickCounter from './clickCounter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ClickCounter />, document.getElementById('root'));
registerServiceWorker();
 

//clickCounter.js

import React, { Component } from 'react'

class ClickCounter extends Component {
    constructor(props){
        super(props);
        // console.log(this)
        this.onClickButton = this.onClickButton.bind(this);
        this.state = { count: 0 }
    }
    onClickButton(){
        // console.log(this)
        this.setState({
            count:this.state.count + 1
        })
    }
    render(){
        const box = {
            margin:'30px'
        }
        return (
            <div style={box}>
                <button onClick={this.onClickButton}>click me!</button>
                <div>
                    click count : {this.state.count}
                </div>
            </div>
        )
    }
}
export default ClickCounter;

```

##### package.json中scripts命令解释

```
"scripts": {
    "start": "react-scripts start",   // 运行项目
    "build": "react-scripts build",     // 创建生产环境优化代码
    "test": "react-scripts test --env=jsdom",   // 用于单元测试
    "eject": "react-scripts eject"  // 把潜藏在react-scripts 中的一系列技术栈配置都“弹射”到应用的顶层 这个命令会改变一些文件也会添加一些文件
  }

```

####易于维护的组件的设计要素

作为软件的通则，组件的划分要满足*高内聚*和*低耦合*的原则

#####高内聚
> 值的是把逻辑紧密相关的内容放在一个组件中。用户界面无外乎内容、交互行为和样式。传统上，交互是js，样式是css，内容是html。这虽然满足一个功能模块的需要，但是不满足高内聚的原则。而react展示内容的jsx、行为的js和样式都可以写在同一个文件内。体现了高内聚的特点。

#####低耦合
> 指的是不同组件之间依赖关系要尽量弱化，也就是每个组件要尽量独立。根据功能划分模块，让不同组件实现不同的功能

####react 组件的数据

react组件中的数据分为2种。prop（组件的对外接口）和state（组件的内部状态） ，无论是prop还是state 的变化都会引起组件的重新渲染。

##### 父组件-->子组件传参

```
// 参数传递
class ControlPanel extends Component {
    render(){
        return (
            <div>
                <Counter caption="First" initVal={0} />
                <Counter caption="Sec" initVal={10} />
                <Counter caption="Thr" initVal={20} />
            </div>
        )
    }
}

// 每个Counter组件都使用了 caption 和initVal 2个prop 。

// 参数读取
import PropTypes from 'prop-types';
class Counter extends Component {
    constructor(props){
        super(props);  // 数据传递是依赖于这个的，没有这个就收不到数据
        // console.log(this)
        this.onClickButton = this.onClickButton.bind(this);
        this.state = { count: this.props.initVal }   // props 数据的获取
    }
    onClickButton(){
        // console.log(this)
        this.setState({
            count:this.state.count + 1
        })
    }
    render(){
        const box = {
            margin:'30px'
        }
        const {caption} = this.props;  // render 中接收数据的方法
        return (
            <div style={box}>
                <button onClick={this.onClickButton}>click me! {caption}</button>
                <div>
                    click count : {this.state.count}
                </div>
            </div>
        )
    }
}

Counter.propTypes = { // 约束参数字段类型
    caption:PropTypes.string.isRequired,
    initVal : PropTypes.number
}

```
> 关于propTypes 的详细内容在这里https://reactjs.org/docs/typechecking-with-proptypes.html
propTypes,在产品环境下没有任何作用，所以要在上线后把这个去掉，现有的bable-react-optimize 就具有这个功能


####react 的state

state 值的更改一定要使用setState,直接修改会发生意想不到的问题


###props 和 state 比较
prop|state
--|--|
prop 用于外部接口 |state 用于记录内部状态
prop 的赋值在外部世界使用组件时|state赋值在组件内部
组件不应该改变prop的值|state就是用来让组件改变的


####组件的生命周期

1. 装载过程 （Mount），也就是组件第一次在DOM树中渲染的过程
2. 更新 （Update），组件重新渲染的过程
3. 卸载过程（Unmount），组件从dom树中删除的过程

##### Mount 

渲染的时候，依次调用下面的函数：
constructor / getInitialState / getDefaultProps / componentWillMount / render / componentDidMount

1. constructor 构造函数 ，并不是每个组件都要定义构造函数，无状态的React组件往往就不需要定义构造函数。定义构造函数往往是下面的目的：

:  初始化state，因为组件生命周期中任何函数都可能要访问state，那么整个生命周期中的一个被调用的构造函数自然是初始化的state最理想的地方。

:  绑定成员函数的this环境。es6 下每个成员函数在执行时，this并不是和类实例自动绑定的，而在构造函数中，this就是当前组件的实例，所以为了方便调用，往往构造函数中将这个实例的特定函数绑定this为当前实例。

> 在实际使用中，会遇到另一种实例绑定的方式
```
this.foo = ::this.foo;  // 这里的两个冒号称作bind操作符，babel支持这种写法，但是es6不支持
// 等同于下面的语句
this.foo = this.foo.bind(this);
```

##### getInitialState/getDefaultProps

getInitialState 这个函数会初始化组件的this.state，但是这个方法只有用React.createClass方法创造组件才起作用

getDefaultProps 函数的返回值可以作为props的初始值，和getInitialState一样这个函数只有在React.createClass方法是才起作用

#####render 

render函数无疑是React组件中最重要的函数，一个React组件可以忽略其他所有函数都不实现，但一定要实现render函数，因为所有组件的父类React.Component类对除render之外的生命周期函数都有默认实现。
render 函数并不做实际的渲染动作，他只是返回一个jsx描述结构，最终有React来渲染。
render 函数应该是个纯函数完全根据state和prop来决定返回的结果，不应该在里面做动态操作


#####componentWillMount / componentDidMount

componentWillMount会在render函数之前调用componentDidMount会在调用render函数之后调用


####更新过程

页面装载完成后每当更新state/prop的状态就会触发更新，依次调用下面的函数

:  componentWillReceiveProps
:  shouldComponentUpdate
:  componentWillUpdate
:  render
:  componentDidUpdate

有意思的是，并不是所有的更新过程都会触发全部函数

1. componnetWillReceiveProps(nextProps)
关于这个，存在一些误解，并不是当组件props发生变化才会被调用。实际上，只要是父组件的render函数别调用，在render里的子组件就会经历更新过程
this.setState 不会触发这个函数。
另外，使用thisl.forceUpdate函数会强制进行重绘``` render(<tutton onClick={()=>this.forceUpdate()}></button>)  ```

在这个函数中this.props代表上次渲染的prop值，nextProps代表下次渲染的props值

2. shouldComponentUpdate(nextProps,nextState)
除了render 这个函数可能是react生命周期里最重要的函数了，因为它决定了一个组件什么时候不需要渲染shouldComponentUpdate返回一个布尔值，告诉react这个组件这次更新过程是否需要继续。更新过程中，react首先调用shouldComponentUpdate函数，如果这个函数返回true，那就继续更新，反之停止更新，也就不会引起后续的渲染了。

shouldComponentUpdate很重要，因为只要使用恰当它就能大大提到react的性能

```
shouldComponentUpdate(nextProps,nextState){
    return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count)
}

```

3. componentWillUpdate / componentDidUpdate

如果shouldComponentUpdate 函数返回true ，react接下来就会调用componentWillUpdate  render componentDidUpdate

####卸载过程

componentWillUnmount往往和componentDidMount有关，比如在componentDidMount中用非React方法创造了一些dom如果在componentWillUnmount中不清理掉可能会引起内存泄漏。


###组件向外传递数据

```
// 父组件
import React, { Component } from 'react'
import Counter from "./clickCounter"

class ControlPanel extends Component {
    constructor(props){
        super(props)
        this.onUpdate = this.onUpdate.bind(this)
        this.state={
            counter:0
        }
    }
    onUpdate(val){  // 接收参数
        console.log(val)
        this.setState({
            counter:val
        })
    }
    render(){
        return (
            <div>
                <Counter caption="First" initVal={0} />
                <Counter caption="Sec" initVal={10} />
                <Counter onUpdate={this.onUpdate} caption="Thr" />  ///在这里绑定事件
                <div>{this.state.counter}</div>     
            </div>
        )
    }
}
export default ControlPanel;

// 子组件
import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ClickCounter extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.initVal)
        this.onClickButton = this.onClickButton.bind(this);
        this.state = { count: this.props.initVal || 0 }
    }
    onClickButton(){
        // console.log(this)
        this.setState({
            count:this.state.count +1
        })
        this.props.onUpdate(this.state.count+1) // count 的值不会立刻改变（利用fun将值传出去）
    }
    render(){
        const box = {
            margin:'30px'
        }
        const {caption} = this.props;
        return (
            <div style={box}>
                <button onClick={this.onClickButton}>click me! {caption}</button>
                <div>
                    click count : {this.state.count}
                </div>
            </div>
        )
    }
}

ClickCounter.propTypes = {
    caption: PropTypes.string.isRequired,
    initValue: PropTypes.number
};
  
ClickCounter.defaultProps = {
    initValue: 0
};

export default ClickCounter;

```

通过上面可以看出来，react的数据是父子各自保留一份的，一旦出现有某个地方没有同步就会出现数据问题，这时，我们就需要利用一个全局的域去存储它。

# 