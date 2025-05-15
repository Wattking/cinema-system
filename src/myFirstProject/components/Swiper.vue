<template>
  <div>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="data in datalist" :key="data">
          {{ data }}
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Swiper } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const datalist = ref([]);
let swiperInstance = null;

onMounted(() => {
  datalist.value = ['轮播1', '轮播2', '轮播3', '轮播4', '轮播5', '轮播6', '轮播7', '轮播8'];
  
  // 确保DOM更新完成后再初始化Swiper
  nextTick(() => {
    swiperInstance = new Swiper('.swiper', {
      modules: [Pagination, Autoplay],
      loop: true, // 必须设置为true才能无限循环
      autoplay: {
        delay: 1300,
        disableOnInteraction: false, // 用户操作后继续自动播放
        pauseOnMouseEnter: true, // 鼠标悬停暂停
        waitForTransition: true, // 等待过渡完成
      },
      speed: 400,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // 添加以下配置确保滑动顺畅
      resistanceRatio: 0, // 禁用弹性效果
      followFinger: false, // 禁用跟随手指
    });
    
    // 添加错误处理
    swiperInstance.on('reachEnd', () => {
      console.log('Reached end, should loop back');
    });
  });
});
</script>

<style>
.swiper {
  width: 100%;
  height: 200px;
  overflow: hidden; /* 添加overflow隐藏 */
}

.swiper-wrapper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background: #ffc4ad;
  width: 100%;
  height: 100%;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #c61c1c;
  opacity: 0.5;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
  background: #a3dc16;
  opacity: 1;
  transform: scale(1.2);
}
</style>
