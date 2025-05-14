<template>
    <div>
        <van-list class="movie-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
            :immediate-check="false" offset="10">
            <li v-for="data in store.nowPlayingList" :key="data.filmId" class="movie-item"
                @click="router.push('/detail/' + data.filmId)">
                <!-- 左边：电影海报 -->
                <img :src="data.poster" alt="电影海报" class="movie-poster">

                <!-- 右边：电影信息 -->
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
                        <span class="info-label">评分:</span>
                        <span class="movie-grade">{{ data.grade }}</span>
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
import useNowplayingStore from '../../store/nowplayingStore.js';
import { useRouter } from 'vue-router'
//这是用来做List懒加载功能滴
import { List as vanList } from 'vant'

const store = useNowplayingStore()
const router = useRouter()
const loading = ref(false)//加载状态
const finished = ref(false)//结束状态  
const onLoad = () => {
    //滚动到底部再加载数据
    if (store.nowPlayingList.length === store.total) {
        finished.value = true
        return
    }
    store.getNowplayingList()
    //必须把此loading改成false,否则会无法获取数据
    loading.value = false
}
onMounted(() => {
    if (store.nowPlayingList.length === 0) {
        //首次获取数据
        store.getNowplayingList()
        //必须把此loading改成false,否则会无法获取数据
        loading.value = false
    }
    else {
        console.log("读出缓存数据(NowPlaying)")
    }
})
</script>



<style scoped>
.movie-list {
    padding: 0;
    list-style: none;
}

.movie-item {
    display: flex;
    /* 横向排列 */
    align-items: flex-start;
    /* 顶部对齐 */
    padding: .9375rem;
    margin-bottom: .9375rem;
    background: #fff;
    border-radius: .5rem;
    box-shadow: 0 .125rem .5rem rgba(0, 0, 0, 0.1);
}

.movie-poster {
    width: 7.5rem;
    height: 11.25rem;
    object-fit: cover;
    margin-right: 1.25rem;
    /* 图片和文字之间的间距 */
    border-radius: .25rem;
}

.movie-info {
    flex: 1;
    /* 占据剩余空间 */
}

.movie-title {
    margin: 0 0 .625rem 0;
    font-size: 1.125rem;
    color: #333;
}

.info-row {
    display: flex;
    margin-bottom: .375rem;
    font-size: .875rem;
    line-height: 1.5;
}

.info-label {
    color: #666;
    width: 3.75rem;
    /* 固定标签宽度，保持对齐 */
    flex-shrink: 0;
    /* 防止被压缩 */
}

.info-content {
    color: #333;
}

.movie-grade {
    color: #ff9900;
    font-weight: bold;
}

/* 响应式调整：在小屏幕上适当缩小间距 */
@media (max-width: 30rem) {
    .movie-poster {
        width: 5rem;
        height: 7.5rem;
        margin-right: .75rem;
    }

    .movie-title {
        font-size: 1rem;
    }

    .info-row {
        font-size: .8125rem;
    }
}
</style>