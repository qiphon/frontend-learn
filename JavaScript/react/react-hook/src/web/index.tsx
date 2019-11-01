// const a = 12323
// console.log(a, 'ts')
import * as React from 'react'
import * as dom from 'react-dom'
const Home = require('./components/home/home')
const { useCallback, useState, useEffect } = React

const App = () => {
    return (
        <>
            <h1>react demo</h1>
            <Home />
        </>
    )
}

dom.render(<App />,document.getElementById('root'))