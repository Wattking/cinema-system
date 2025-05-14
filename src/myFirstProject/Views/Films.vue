<template>
    <div>
        <Swiper></Swiper> <!--轮播图-->
        <ul>
            <li>
                <router-link to="/films/nowplaying" active-class="kerwin">
                    <span>正在热映</span>
                </router-link>
            </li>
            <li>
                <router-link to="/films/soonplaying" active-class="kerwin">
                    <span>即将上映</span>
                </router-link>
            </li>
        </ul>

        <router-view></router-view> <!--路由容器---->
    </div>
</template>
<script setup>
import Swiper from '../components/Swiper.vue'    
</script>
<style scoped lang="scss">
.kerwin {
    color: red;

    span {
        border-bottom: .1875rem solid red;
        padding: .625rem .625rem;
    }

}

ul {
    list-style: none;
    display: flex;
    //吸顶效果
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;

    li {
        height: 3.125rem;
        line-height: 3.125rem;
        text-align: center;
        flex: 1;

        a {
            text-decoration: none;
        }
    }
}
</style>