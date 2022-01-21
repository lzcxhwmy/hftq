<template>
    <div class="fiveday-container">
        <h3>未来预报</h3>

        <div class="row" v-for="day in days">
            <div class="time">
                <p>{{ dayjs(day.fxDate).format('MM月-DD日') }}</p>
            </div>
            <!-- 这种位置不确定的静态资源是不会经过webpack打包的，所以只能用绝对路径来 -->
            <img :src="`/assets/icon/${day.iconDay}.png`" alt />
            <span class="temp">{{ day.tempMax }}°</span>
            <span class="line"></span>
            <span class="temp_last">{{ day.tempMin }}°</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import dayjs from "dayjs";


const store = useStore();
let days = computed(() => store.state.days)

</script>

<style scoped>
.fiveday-container {
    margin-top: 20px;
    border-radius: 16px;
    background-color: #f7f8f9;
    padding: 10px 20px;
}
.row {
    height: 56px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.row > img {
    height: 36px;
    width: 36px;
    margin: 0 5px;
}
.line {
    flex: 1;
    height: 5px;
    border-radius: 3px;
    background-image: linear-gradient(to right, #f18360, #427bff);
}
.temp {
    margin: 0 5px;
    width: 36px;
    box-sizing: border-box;
}
.temp_last {
    width: 36px;
    text-align: right;
}
.time > p:nth-child(2) {
    color: rgba(0, 0, 0, 0.5);
}
h3 {
    text-align: center;
}
</style>