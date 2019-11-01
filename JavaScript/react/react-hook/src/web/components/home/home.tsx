import * as React from 'react'
// import './home.module.less'
// import st from './home.module.less'
// import './home.scss'
// import st from './home.module.scss'
import './home.module.scss'

const { useState } = React

// console.log(st)
const Home = () =>{
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(1);
    const changeInput = (ev)=> {
        console.log(ev,'input')
        setCount(ev)
    }
    return (
        <>
            <h2 className="h2">我是body
                <small>this is small { count }</small>
            </h2>
            
            <input type="text" placeholder="placeholder" onInput= { ev=>changeInput(ev.target.value) } />
        </>
    )
} 

module.exports =  Home 