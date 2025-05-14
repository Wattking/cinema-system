<template>
    <div>
        <router-view></router-view> <!--路由容器-->

        <Tabbar v-show="store.isTabbarShow"></Tabbar>
    </div>
</template>


<script setup>
import Tabbar from './components/Tabbar.vue'
import useTabbarStore from './store/tabbarStore.js';

const store = useTabbarStore() 
</script>


<style scoped>
div {
    position: relative;
}
</style>