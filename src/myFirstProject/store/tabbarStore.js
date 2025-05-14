import { defineStore } from "pinia"
import axios from 'axios'
//option store写法
// 第一个参数是唯一的storeId
// const useTabbarStore = defineStore("tabbar", {
//     //option store
//     state: () => {
//         return {
//             isTabbarShow: true
//         }
//     },
//     actions: {
//         change(value) {
//             this.isTabbarShow = value
//         }
//     }
// })

import { ref } from 'vue'
const useTabbarStore = defineStore("tabbar", () => {
    //ref包装的就是state
    const isTabbarShow = ref(true)

    //functions包装的就是actions(同步异步均可)
    const change = (myvalue) => {
        isTabbarShow.value = myvalue
    }

    return {
        isTabbarShow,
        change
    }
})
export default useTabbarStore