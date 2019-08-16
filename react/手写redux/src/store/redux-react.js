import React, { Component } from 'react'
import PropTypes from "prop-types";

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connnect extends Component {
        static contextTypes = {
            Store: PropTypes.object
        }
        componentWillMount() {
            this._updateProps()
            const { Store } = this.context
            Store.subscribe(this._updateProps.bind(this))
        }
        _updateProps() {
            // console.log( this.context)
            const store = this.context.Store
            let stateProps = mapStateToProps && mapStateToProps(store.getState())
            let dispatchProps = mapDispatchToProps && mapDispatchToProps(store.dispatch)
            this.setState({
                allProps: {
                    ...this.props,
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        render() {
            return <WrappedComponent {...this.state.allProps} />
        }
    }
    return Connnect
}
// provider
class Provider extends Component {
    static childContextTypes = {
        Store: PropTypes.object,
    }
    getChildContext() {
        return { Store:this.props.Store }
    }
    render() {
        // console.log(this.props)
        return <div {...this.props}>{this.props.children}</div>
    }
}



export {
    connect,
    Provider
}
