<template>
    <div>
        center
        <van-button type="primary">主要按钮</van-button>
    </div>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router'
//1.Button组件的局部注册
import { Button as vanButton } from 'vant'
//2.路由的生命周期,在路由离开之前做一些事情
onBeforeRouteLeave(() => {
    const answer = window.confirm('你确定要离开吗？')
    if (!answer) return false
})
</script>