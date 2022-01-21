<template>
  <div class="detail-container">
    <div class="box" v-for="(val, key) in indices">
      <h3>{{ key }}</h3>
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#' + icon_name[key]" />
      </svg>
      <h4>{{ val.category }}</h4>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex';
import icon_loader from '../../public/assets/alifonts/iconfont'

const store = useStore()
const indices = store.state.indices
const icon_name = {
  交通指数: 'icon-jiaotongfei',
  化妆指数: 'icon-huazhuang',
  太阳镜指数: 'icon-taiyangjing',
  感冒指数: 'icon-ganmao',
  旅游指数: 'icon-lvyou',
  晾晒指数: 'icon-a-clothesyifushaiyifu',
  洗车指数: 'icon-ziyuan',
  空气污染扩散条件指数: 'icon-wuranyuan',
  空调开启指数: 'icon-kongtiao',
  穿衣指数: 'icon-yifu',
  紫外线指数: 'icon-ziwaixianruo',
  舒适度指数: 'icon-shushi',
  过敏指数: 'icon-bike-guominxingbiyan',
  运动指数: 'icon-yundong',
  钓鱼指数: 'icon-diaoyu',
  防晒指数: 'icon-fangshaishuang'

}

</script>

<style scoped>
.icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.detail-container {
  display: flex;
  justify-content: space-evenly;
  align-content: flex-start;
  flex-wrap: wrap;
}
.box {
  width: 40vw;
  height: 40vw;
  background-color: #f7f8f9;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  padding: 10px;
}
</style>
