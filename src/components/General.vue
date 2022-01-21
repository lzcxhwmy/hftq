<template>
    <div class="general-container">
        <div class="location">
            <div>
                <p class="area">{{ location.area_name }}</p>
                <p class="light">{{ location.adm2 }}/{{ location.adm1 }}</p>
            </div>
            <div>
                <p class="light">{{ dayjs(air.pubTime).format('HH:mm') }}</p>
                <p class="time light">{{ dayjs(air.pubTime).format('YYYY-MM-DD') }}</p>
            </div>
        </div>

        <div class="graph" @click="go_details">
            <div class="item">
                <img :src="img_url" @error="img_load_error = true" />
            </div>
            <div class="item">
                <p class="temperature">{{ live.temp }}°</p>
                <p class="weather">{{ live.text }}</p>
            </div>
            <img class="go_detail_arrow" src="/assets/img/arrow.png" />
        </div>
        <div class="abstract">{{ indices.穿衣指数.text }}</div>
        <div class="base">
            <div>
                <div class="top">{{ live.windScale }}级</div>
                <div class="top">{{ live.windDir }}</div>
            </div>
            <div>
                <div class="top">{{ live.humidity }}%</div>
                <div class="top">相对湿度</div>
            </div>
            <div>
                <div class="top">{{ indices.紫外线指数.category }}</div>
                <div class="top">紫外线</div>
            </div>
        </div>

        <Hour></Hour>
    </div>
</template>


<script setup>

import Hour from './Hour.vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';

const router = useRouter()
const store = useStore()
let { location, live, indices, air } = store.state

function go_details() {
    router.push({ name: 'detail' })
}

// 根据天气，修改天气图标，图标不存在则加载默认图标
let img_load_error = ref(false)
watch(store.state.live, () => img_load_error.value = false)
const img_url = computed(() => {
    if (img_load_error.value) {
        return "/assets/icon/104.png"
    } else {
        return `/assets/icon/${store.state.live.icon}.png`
    }
})
// ---------------------------------


</script>

<style scoped>
.general-container {
    line-height: 1.4rem;
    width: auto;
    padding: 20px;
    background-image: linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
    box-sizing: border-box;
    border-radius: 16px;
}
.location {
    display: flex;
    justify-content: space-between;
}
.location .light {
    text-align: right;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 300;
}
.area {
    font-size: 18px;
}
.time {
    text-align: right;
}
.graph {
    height: 78px;
    display: flex;
    justify-content: center;
    margin-top: 32px;
    position: relative;
    cursor: pointer;
}

.graph .temperature {
    font-size: 40px;
    line-height: 40px;
}
.graph .item img {
    width: 78px;
    height: 78px;
}
.graph .aqi {
    position: absolute;
    right: 0px;
    top: -25px;
    height: 16px;
    background-color: red;
    border-radius: 14px;
    /* line-height: 30px; */
    padding: 0 4px;
    font-size: 15px;
    display: none;
}
.go_detail_arrow {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    /* height: 20px; */
}
.abstract {
    text-align: center;
}

.base {
    height: 70px;
    padding: 0 21px;
    display: flex;
    justify-content: space-around;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.03);
    align-items: center;
    margin-top: 30px;
}
</style>