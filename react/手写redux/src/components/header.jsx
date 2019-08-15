import React, { Component } from 'react'
import {connects} from '../store/redux-react'

class Main extends Component {
    state = {

    }
    componentDidMount(){
        console.log( this.props )
    }
    change(){
        console.log(11)
        this.props.msgChange(this.props.msg + 1 )
    }
    render(){
        return (
            <div>
                我是 Header
                <p style={{ color:'red' }} 
                    onClick={ ev=> this.change() }
                >{ this.props.msg }</p>
            </div>
        )
    }
}

export default connects(Main)