<template>
    <div>
        <!--索引列表,细节部分请看Vant文档-->
        <van-index-bar :index-list="indexList">
            <div v-for="data in cityList" :key="data.type">
                <van-index-anchor :index="data.type">{{ data.type }}</van-index-anchor>
                <van-cell :title="item.name" v-for="item in data.list" @click="handleClick(item.name, item.cityId)" />
            </div>
        </van-index-bar>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { IndexBar as vanIndexBar, IndexAnchor as vanIndexAnchor, Cell as vanCell } from 'vant'
import useCityStore from '../store/cityStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useCityStore()
const letterArr = ref([])
const cityList = ref([])
const indexList = computed(() => cityList.value.map(item => item.type))
const handleClick = (name, id) => {
    router.push('/cinemas') //跳转到影院列表
    store.change(name, id) //调用store中的change方法
}
onMounted(async () => {
    const res = await axios({
        url: "/api?k=6445810",
        headers: {
            'x-client-info':
                '{"a":"3000","ch":"1002","v":"5.2.1","e":"1745164089463465625944065","bc":"110100"}',
            'x-host':
                'mall.film-ticket.city.list'
        }
    })

    // console.log(res.data.data.cities)
    filterCity(res.data.data.cities)
})

const filterCity = (city) => {
    //city是一个对象数组，每一个item存的是城市详细信息
    for (let i = 65; i < 91; i++) {
        letterArr.value.push(String.fromCharCode(i))   //把大写字母存入数组
    }
    //cityList是一个对象数组，存的是城市的首字母和城市详细信息
    for (let i = 0; i < letterArr.value.length; i++) {
        cityList.value.push({
            type: letterArr.value[i],
            list: city.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr.value[i])
        })
    }
    cityList.value = cityList.value.filter(item => item.list.length > 0) //过滤掉没有城市的字母
}
</script>

<style>
:root:root {
    --van-index-bar-index-font-size: .8125rem;
    --van-index-bar-index-line-height: 1.25rem;
}
</style>