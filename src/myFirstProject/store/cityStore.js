import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCityStore = defineStore('city', () => {
    const cityName = ref('北京')
    const cityId = ref(110100)


    const change = (name, id) => {
        cityName.value = name
        cityId.value = id
    }

    return {
        cityName,
        cityId,
        change
    }
})

export default useCityStore