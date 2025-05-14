<template>
    <van-nav-bar title="影院">
        <template #left>
            <div>{{ cityStore.cityName }}</div>
            <van-icon name="arrow-down" @click="handleClick" />
        </template>
        <template #right>
            <van-icon name="search" size="26" />
        </template>
    </van-nav-bar>


    <div class="cinema-container">
        <!-- 选择器样式优化 -->
        <div class="filter-container">
            <select v-model="type" class="cinema-filter">
                <option :value="1">App订票</option>
                <option :value="0">前台兑换</option>
            </select>
        </div>

        <!-- 影院列表样式优化 -->
        <ul class="cinema-list">
            <li v-for="data in store.filterCinemaList(type)" :key="data.cinemaId" class="cinema-item">
                <div class="cinema-info">
                    <h3 class="cinema-name">{{ data.name }}</h3>
                    <p class="cinema-address" v-if="data.address">{{ data.address }}</p>
                    <div class="cinema-tags">
                        <span class="tag" v-if="data.distance">距离: {{ data.distance }}km</span>
                        <span class="tag" v-if="data.lowPrice">最低¥{{ data.lowPrice }}起</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useCinemaStore from '../store/cinemaStore';
import useCityStore from '../store/cityStore';
import { NavBar as vanNavBar, Icon as vanIcon } from 'vant';
import { useRouter } from 'vue-router'
const router = useRouter()
const type = ref(1)
const store = useCinemaStore()
const cityStore = useCityStore()
onMounted(() => {
    if (store.cinemaList.length === 0) {
        store.getCinemaList(cityStore.cityId)
    }
    else {
        console.log("读出缓存数据")
    }
})
const handleClick = () => {
    router.push('/city')
    store.cinemaList = [] //清空缓存数据
}
</script>

<style scoped lang="scss">
.cinema-container {
    padding: .9375rem;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.filter-container {
    margin-bottom: .9375rem;
    position: sticky;
    top: 0;
    background: white;
    padding: .625rem;
    border-radius: .5rem;
    box-shadow: 0 .125rem .5rem rgba(0, 0, 0, 0.05);
    z-index: 10;
}

.cinema-filter {
    width: 100%;
    padding: .625rem .9375rem;
    border: .0625rem solid #e0e0e0;
    border-radius: .375rem;
    background-color: white;
    font-size: .875rem;
    color: #333;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right .625rem center;
    background-size: .9375rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #ff5f5f;
        box-shadow: 0 0 0 .125rem rgba(255, 95, 95, 0.2);
    }
}

.cinema-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cinema-item {
    background: white;
    border-radius: .5rem;
    margin-bottom: .75rem;
    padding: .9375rem;
    box-shadow: 0 .125rem .5rem rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-0.125rem);
        box-shadow: 0 .25rem .75rem rgba(0, 0, 0, 0.1);
    }
}

.cinema-info {
    .cinema-name {
        margin: 0 0 .5rem 0;
        font-size: 1rem;
        color: #333;
        font-weight: 600;
    }

    .cinema-address {
        margin: 0 0 .625rem 0;
        font-size: .8125rem;
        color: #666;
        line-height: 1.4;
    }

    .cinema-tags {
        display: flex;
        gap: .625rem;
        margin-top: .5rem;

        .tag {
            font-size: .75rem;
            padding: .1875rem .5rem;
            background-color: #f8f8f8;
            border-radius: .25rem;
            color: #ff5f5f;
        }
    }
}

/* 响应式调整 */
@media (max-width: 30rem) {
    .cinema-container {
        padding: .625rem;
    }

    .cinema-item {
        padding: .75rem;
    }
}
</style>