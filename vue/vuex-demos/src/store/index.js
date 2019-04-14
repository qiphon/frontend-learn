import Vuex from 'vuex'
import Vue from 'vue'
import test from './modules/test'
Vue.use(Vuex)

// const store = new Vuex.Store({
//     // 全局状态
//     state: {
//         count: 12,
//         test: 13
//     },
//     // 相当于vue中的计算属性
//     getters: {
//         newCount: (state) => (val) => {
//             // console.log(state, getters)
//             return state.count + val
//         }
//     },
//     // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
//     // 一条重要的原则就是要记住 mutation 必须是同步函数
//     mutations: {
//         add(state, payload) {
//             state.count += payload.val
//         },
//         down(state, payload) {
//             state.count -= payload.val
//         }
//     },
//     // Action 提交的是 mutation，而不是直接变更状态。
//     // Action 可以包含任意异步操作。
//     // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
//     // 因此你可以调用 context.commit 提交一个 mutation，
//     // 或者通过 context.state 和 context.getters 来获取 state 和 getters。
//     actions: {
//         adds(context, payload) {
//             console.log(context, payload)
//             context.commit('add', payload)
//             return context.count    
//         }
//     }

// })

const store = new Vuex.Store({
    modules: {
        test
    }
})

export default store