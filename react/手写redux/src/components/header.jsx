import React, { Component } from 'react'
import {connect} from '../store/redux-react'

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

// 2个map 函数
const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        msgChange: val => {
            dispatch({
                type: 'CHANGE',
                val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)