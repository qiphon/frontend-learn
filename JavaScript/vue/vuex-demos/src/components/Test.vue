<template>
    <div class="test">
        <!-- state -->
        <p>this is test's value : <span class="store">{{ test }}</span></p>
        <p>this is count's value : <span class="store">{{ count }}</span></p>
        <!-- getter -->
        <!-- <p>this is count's new value : <span class="store">{{ b }}</span></p> -->
        <!-- mutations -->
        <el-button @click="up">up</el-button>
        <el-button @click="downs">down</el-button>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { ADD, DOWN } from '../store/mutation-types'
export default {
    data(){
        return {
            a: 11112
        }
    },
    mounted(){
        console.log(this.$store.test)
    },
    computed: {
        // b(){
        //     return this.$store.getters.newCount(5)
        // },
        ...mapState('test',['count','test'])
        // ...mapState({
        //     test: state=> state.test.test,
        //     count: state=> state.test.count
        // })
    },
    methods: {
        up(val){
            // this.$store.commit('test/add',{
            //     val: 1
            // })
            this.$store.dispatch(`test/${ADD}`,{
                val: 2
            })
            // this.adds({
            //     val:1
            // })
        },
        downs(val){
            // 推荐模式
            this.$store.commit('test/'+DOWN, {
                val: 2
            })
            // 不推荐，没有状态跟踪
            // this.$store.state.count --
        },
        // ...mapActions(['adds'])
        // ...mapMutations(['down'])
    }
}
</script>
<style scoped>
.store{
    color: red;
}
</style>
