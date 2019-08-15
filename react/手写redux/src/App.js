import React from 'react';
import Store from './store/store'
import Header from './components/header'
import Main from './components/content'
import { Provider } from './store/redux-react'

class App extends React.Component {
  state={
    msg: 'app',
  }
  componentWillMount(){
  }
  render(){
    return (
      <Provider className="App" Store={ Store } >
        <div>
          <Header a='111' />
        </div>
          <Main />
          <div>{ this.state.msg }</div>
      </Provider>
    );
  }
}

export default App;
