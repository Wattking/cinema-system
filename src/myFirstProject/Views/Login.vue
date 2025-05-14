<template>
    <div>
        <h2>登陆页面</h2>
        <button @click="handleClick">登录</button>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleClick = () => {
    localStorage.setItem("token", "Fcc")
    router.push("/")
}
</script>


<!-- <script>
export default {
    methods: {
        handleClick() {
            localStorage.setItem("token", 'Fcc')
            this.$router.push("/")
        }
    }
}
</script> -->