<template>
    <div class="air_condition">
        <h3>空气质量</h3>
        <br>
        <h3>{{ air.category }}</h3>
        <br>
        <div class="air_detail">
            <div class="item">
                <h6>{{ air.pm2p5 }}</h6>
                <div class="progress">
                    <div class="progress_value" :style="{ width: `${air.pm2p5 / 2}%` }"></div>
                </div>
                <span class="name">PM2.5</span>
            </div>
            <div class="item">
                <h6>{{ air.pm10 }}</h6>
                <div class="progress">
                    <div class="progress_value" :style="{ width: `${air.pm10 / 2.5}%` }"></div>
                </div>
                <span class="name">PM10</span>
            </div>
            <div class="item">
                <h6>{{ air.o3 }}</h6>
                <div class="progress">
                    <div class="progress_value" :style="{ width: `${air.o3 / 9.36}%` }"></div>
                </div>
                <span class="name">O3</span>
            </div>

            <div class="item">
                <h6>{{ air.co }}</h6>
                <div class="progress">
                    <div class="progress_value" :style="{ width: `${air.co / 0.3}%` }"></div>
                </div>
                <span class="name">CO</span>
            </div>
            <div class="item">
                <h6>{{ air.so2 }}</h6>
                <div class="progress">
                    <div class="progress_value" :style="{ width: `${air.so2 / 9.25}%` }"></div>
                </div>
                <span class="name">SO2</span>
            </div>
            <div class="item">
                <h6>{{ air.no2 }}</h6>
                <div class="progress">
                    <div class="progress_value" :style="{ width: `${air.no2 / 10}%` }"></div>
                </div>
                <span class="name">NO2</span>
            </div>
        </div>

    </div>
</template>


<script setup>import { useStore } from 'vuex';

let store = useStore();
let air = store.state.air;
</script>

<style scoped>
.progress_value {
    background-color: #427bff;
    height: 100%;
    border-radius: 5px;
    min-width: 8%;
}
.progress {
    background-color: #e9ecef;
    border-radius: 0.25rem;
    height: 8px;
    /* width: 100%; */
}
.item {
    height: 70px;
    width: 43%;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.name{
    font-size: 0.75rem;
    color: rgba(0, 0, 0, .5);
}
.air_detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.air_condition {
    border-radius: 16px;
    padding: 20px 20px 20px;
    background-color: #f7f8f9;
    margin-top: 20px;
    text-align: center;
}
</style>