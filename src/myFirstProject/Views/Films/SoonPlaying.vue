<template>
    <div>
        <van-list class="movie-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
            :immediate-check="false" offset="10">
            <li v-for="data in store.soonPlayingList" :key="data.filmId" class="movie-item"
                @click="router.push('/detail/' + data.filmId)">
                <img :src="data.poster" alt="即将上映电影海报" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">{{ data.name }}</h3>
                    <div class="info-row">
                        <span class="info-label">种类:</span>
                        <span class="info-content">{{ data.category }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">导演:</span>
                        <span class="info-content">{{ data.director }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">上映地:</span>
                        <span class="info-content">{{ data.nation }}</span>
                    </div>
                </div>
            </li>
        </van-list>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useSoonplayingStore from '../../store/soonplayingStore.js';
//重点:Vant--->这是用来做List懒加载功能滴
import { List as vanList } from 'vant'

const store = useSoonplayingStore()
const router = useRouter()
const loading = ref(false)//加载状态
const finished = ref(false)//结束状态
//vanList组件的onLoad事件
const onLoad = () => {
    //滚动到底部再加载数据
    if (store.soonPlayingList.length === store.total) {
        finished.value = true
        return
    }
    store.getSoonplayingList()
    //必须把此loading改成false,否则会无法获取数据
    loading.value = false
}
//组件加载完成后执行的函数
onMounted(() => {
    if (store.soonPlayingList.length === 0) {
        //首次获取数据
        store.getSoonplayingList()
        //必须把此loading改成false,否则会无法获取数据
        loading.value = false
    }
    else {
        console.log("读出缓存数据(SoonPlaying)")
    }
})
</script>

<style scoped>
.movie-list {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(21.875rem, 1fr));
    gap: 1.25rem;
}

.movie-item {
    display: flex;
    background: #fff;
    border-radius: .5rem;
    box-shadow: 0 .125rem .5rem rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.movie-item:hover {
    transform: translateY(-0.3125rem);
}

.movie-poster {
    width: 7.5rem;
    height: 11.25rem;
    object-fit: cover;
}

.movie-info {
    flex: 1;
    padding: .75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.movie-title {
    margin: 0 0 .5rem 0;
    font-size: 1rem;
    color: #333;
}

.info-row {
    display: flex;
    margin-bottom: .375rem;
    font-size: .8125rem;
}

.info-label {
    color: #666;
    width: 4.375rem;
    margin-right: .5rem;
    flex-shrink: 0;
}

.info-content {
    color: #333;
}

@media (max-width: 48rem) {
    .movie-list {
        grid-template-columns: 1fr;
    }

    .movie-poster {
        width: 6.25rem;
        height: 9.375rem;
    }
}
</style>