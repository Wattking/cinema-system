import { defineStore } from "pinia"
import axios from 'axios'
//setup store写法
import { ref } from 'vue'
const useNowplayingStore = defineStore("nowplaying", () => {
    //ref包装的就是state
    const pageNum = ref(1)
    const total = ref(0)
    const nowPlayingList = ref([])

    //functions包装的就是actions(同步异步均可)
    const getNowplayingList = async () => {
        var res = await axios({
            url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${pageNum.value}&pageSize=10&type=1&k=1920833`,
            headers: {
                'x-client-info':
                    '{"a":"3000","ch":"1002","v":"5.2.1","e":"1745164089463465625944065","bc":"110100"}',
                'x-host':
                    'mall.film-ticket.film.list'
            }
        })
        if (pageNum.value === 1) {
            nowPlayingList.value = res.data.data.films
            total.value = res.data.data.total
            pageNum.value++
        }
        else {
            nowPlayingList.value = [...nowPlayingList.value, ...res.data.data.films]
            pageNum.value++
        }
    }

    return {
        pageNum,
        total,
        nowPlayingList,
        getNowplayingList,
    }
})
export default useNowplayingStore
