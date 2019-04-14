import { ADD, DOWN } from '../mutation-types'
const state = {
    count: 0,
    test: 'test'
}

// getters
const getters = {
    newCount: (state) => (val) => {
        return state.count + val
    }
}

// actions
const actions = {
    [ADD]({commit},payload){
        commit(ADD,payload)
    }
}

// mutations
const mutations = {
    [ADD](state, payload) {
        state.count += payload.val
    },
    [DOWN](state, payload) {
        state.count -= payload.val
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
