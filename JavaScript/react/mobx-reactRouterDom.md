# create-react-app 搭建 有ReactRouterDom 和 Mobx 项目

1. 下载 create-react-app

```
npm i create-react-app -g

```

2. 创建react 项目

```
create-react-app qiphon-demo

cd qiphon-demo

```

3. 自己修改webpack之类的配置需要执行npm run eject弹出配置文件

```
yarn eject

```
之后webpack配置项会暴露出来，可以在package.json 中进行配置

安装依赖，并配置Babel 

```package.json

"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-decorators": "^7.3.0",
    "@babel/plugin-transform-react-jsx": "^7.3.0",
    "@babel/plugin-transform-react-jsx-self": "^7.2.0",
    "@babel/plugin-transform-react-jsx-source": "^7.2.0"
  }

```

4. 安装 mobx / mobx-react

```
yarn add mobx mobx-react -S

```
src目录下面创建 store 文件

```
import { action, observable } from 'mobx'

class Store {
    @observable name= "qiphon"
    @action doSomething(val){
        this.name = val
    }
}

// 一定要new 一下
export default new Store()

```
入口文件引入Store

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import Store from './store/index'

ReactDOM.render(   
    <Provider Store={ Store } ><App /></Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

5. 其他页面引入 或使用 Store

```
import React , { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Foot from '../components/footer'

@inject("Store") @observer
class Index extends Component {
    componentDidMount(){
        console.dir(this.props.Store)
    }
    render(){
        return (
            <div className="home">
                <div>store { this.props.Store.qiphon }</div>
                <h1><a href="/news">i'm Home . touch me to news center</a></h1>
                <Foot />
            </div>
        )
    }
}

export default Index

```

6. 配置路由

```

yarn add react-router-dom -S

```

路由文件配置

```
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import Index from './routes/index'
import News from './routes/news'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/news" component={News} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

```