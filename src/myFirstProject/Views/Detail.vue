<template>
    <div>
        <button @click="handleback">回退</button>
        <h2>这是任何电影的详情页面</h2>
        <button @click="handleclick">猜你喜欢</button>
    </div>
</template>


<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import useTabbarStore from '../store/tabbarStore.js'
const route = useRoute()
const router = useRouter()
const store = useTabbarStore()
//以下是模拟，点开某一个电影Detail时Tabbar隐藏,

//在组件挂载之前执行
onBeforeMount(() => {
    // store.isTabbarShow = false
    store.change(false)
})
//在组件卸载之前执行
onBeforeUnmount(() => {
    // store.isTabbarShow = true
    store.change(true)

})
//组件挂载完成后执行
onMounted(() => {
    console.log(route.params.myid)
})
const handleclick = () => {
    router.push('/detail/6666')
}
const handleback = () => {
    router.back()
}
watch(() => route.params, (newValue) => {
    console.log('新参数:', newValue.myid)
})  
</script>
<!-- <script>
export default {
    mounted() {
        console.log(this.$route.params.myid)
    },

    methods: {
        handleclick() {
            this.$router.push('/detail/6666')
        },
        handleback() {
            this.$router.back()
        }
    },
    watch: {
        "$route.params": function () {
            console.log(this.$route.params.myid)
        }
    }
}
</script> -->