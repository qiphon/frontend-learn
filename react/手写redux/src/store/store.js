
function createStore(reducer){
    let state = null
    let listeners = []
    const subscribe = (...listener) => listeners = [ ...listeners,...listener]
    const getState = ()=> state
    const dispatch = action => {
        // console.log(action,'action')
        state = reducer(state, action)
        listeners.forEach(fun => fun())
    }
    dispatch()
    return {
        subscribe,
        getState,
        dispatch
    }
}

const reducer = (state, action) =>{
    // console.log(state,action);debugger
    if(!state){
        return {
            msg: 'hello111'
        }
    }
    if( !action || action.type === undefined ){
        return console.warn('action is required')
    }
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                msg: action.val
            }
        default:
            return state
    }
}

const Store = createStore(reducer)


// export 
export default Store