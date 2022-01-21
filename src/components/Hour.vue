<template>
    <div class="hour-container">
        <div ref="chart_container" class="chart_container"></div>
    </div>
</template>

<script setup>

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, ref, watch, watchEffect } from 'vue';
import dayjs from 'dayjs';
import { useStore } from 'vuex';


let chart_container = ref(null);
const store = useStore();
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

function init_chart(x, y) {
    // echarts.use([GridComponent, LineChart, SVGRenderer, UniversalTransition]);
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(chart_container.value);

    let option = {
        grid: {
            left: '15px',
            right: '15px',
            bottom: '28px'
        },
        xAxis: {
            type: 'category',
            data: x,


        },
        yAxis: {
            type: 'value',
            show: false,

        },

        series: [
            {
                // data: [820, 932, 901, 934, 1290, 1330, 1320],
                data: y,
                type: 'line',
                smooth: true,
                label: {
                    show: true,
                    formatter: '{c}°'
                },

            }
        ],
        textStyle: {
            fontSize: '1.1rem'
        }
    };

    option && myChart.setOption(option);
}

onMounted(
    () => {
        init_chart(
            store.state.hour.times.map((date) => dayjs(date).format('HH') + ':00'),
            store.state.hour.temps
        )
    }
)
watch(store.state.hour, () => {
    init_chart(
        store.state.hour.times.map((date) => dayjs(date).format('HH') + ':00'),
        store.state.hour.temps
    )
},
)



</script>

<style scoped>
.hour-container {
    overflow-x: auto;
}
.chart_container {
    height: 180px;
    width: 1100px;
    margin: 0 auto;
}
</style>