import { defineStore } from "pinia"
import axios from 'axios'
// option store写法
// 第一个参数是唯一的storeId
// const useCinemaStore = defineStore("cinema", {
//     //option store
//     state: () => {
//         return {
//             cinemaList: []
//         }
//     },
//     actions: {
//         async getCinemaList() {
//             var res = await axios({
//                 url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=121376",
//                 headers: {
//                     'x-client-info':
//                         '{"a":"3000","ch":"1002","v":"5.2.1","e":"1745164089463465625944065","bc":"110100"}',
//                     'x-host':
//                         'mall.film-ticket.cinema.list'
//                 }
//             })
//             this.cinemaList = res.data.data.cinemas
//         }
//     },
//     getters: {
//         filterCinemaList(state) {
//             return (type) => {
//                 return state.cinemaList.filter(item => item.eTicketFlag === type)
//             }
//         }
//     }
// })

//setup store写法
import { ref, computed } from 'vue'
const useCinemaStore = defineStore("cinema", () => {
    //ref包装的就是state
    const cinemaList = ref([])

    //functions包装的就是actions(同步异步均可)
    const getCinemaList = async (cityId) => {
        var res = await axios({
            url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=121376`,
            headers: {
                'x-client-info':
                    '{"a":"3000","ch":"1002","v":"5.2.1","e":"1745164089463465625944065","bc":"110100"}',
                'x-host':
                    'mall.film-ticket.cinema.list'
            }
        })
        cinemaList.value = res.data.data.cinemas
    }

    //computed包装的就是getters
    const filterCinemaList = computed(() => {
        return (type) => {
            return cinemaList.value.filter(item => item.eTicketFlag === type)
        }
    })

    return {
        cinemaList,
        getCinemaList,
        filterCinemaList
    }
})
export default useCinemaStore
