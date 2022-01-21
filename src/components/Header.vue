<template>
    <div class="header_container">
        <h1 ref="left_ele" @click="router.push('/')">&lt;</h1>
        <div class="logo" ref="logo_ele"></div>
        <div class="message"></div>
        <div class="search" @click="modalOpen = true"></div>
    </div>

    <!-- 撑开header_container固定定位后留下的空隙 -->
    <div class="partition"></div>

    <!-- 搜索模态框 -->
    <teleport to="body">
        <div v-if="modalOpen" class="modal">
            <div class="modal_container">
                <div class="modal_header">
                    <div class="search_icon"></div>
                    <input type="text" v-model="search_input" />
                    <div class="close" @click="modalOpen = false">X</div>
                </div>

                <ul>
                    <li
                        v-for="item in search_res"
                        @click="change_location(item)"
                    >{{ item.name }}/{{ item.adm1 }}/{{ item.adm2 }}</li>
                </ul>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import use_load_city_all_data from '../hooks/use_load_city_all_data';
import router from '../router';
import { key } from '../settings'


// 监听模态框开启状态，控制模态框开启和关闭
let modalOpen = ref(false)
watch(modalOpen, (new_val) => {
    search_input.value = '';
    if (new_val === true) {
        document.querySelector('body').style.overflow = 'hidden';
    } else {
        document.querySelector('body').style.overflow = 'auto';
    }
})
// ------------------------------------------------------------------


// 监听输入框内容，请求对应的地理信息
let search_input = ref('');
let search_res = reactive([])
watch(search_input, async new_val => {
    if (new_val.length < 1) return
    let { data: res } = await axios.get('https://geoapi.qweather.com/v2/city/lookup', {
        params: {
            key,
            location: new_val
        }
    })
    search_res.splice(0, search_res.length)
    for (let item of res.location) {
        search_res.push(item)
    }
})
// ---------------------------------------



// 处理城市列表的点击，实现切换城市后，更新城市天气数据
const store = useStore()
function change_location(city) {
    store.commit('update_location', city);
    use_load_city_all_data(store);
    modalOpen.value = false;
}
// ---------------------------------------------


// 监听路由，首页显示logo，详情页显示返回按钮
const route = useRoute()
let logo_ele = ref(null);
let left_ele = ref(null);
watch(route, new_val => {
    if (new_val.name === 'detail') {
        logo_ele.value.style.display = 'none';
        left_ele.value.style.width = '100px'
    } else {
        logo_ele.value.style.display = '';
        left_ele.value.style.width = 0
    }
})
// -----------------------------------------------

</script>

<style scoped>
h1 {
    width: 0;
    overflow: hidden;
    transition: all 0.5s;
    color: gray;
}
li {
    list-style: none;
    line-height: 3rem;
    font-size: 1.3rem;
    box-sizing: border-box;
}
li:hover {
    border: 1px solid white;
}
.close {
    border-bottom: 2px solid #979797;
    font-size: 20px;
}
.modal_container {
    color: white;
    padding: 0 15px;
}
.modal_header {
    display: flex;
    margin-top: 10px;
    align-items: flex-end;
}
.search_icon {
    border-bottom: 2px solid #979797;
    background-image: url("../../public/assets/search-light.png");
    height: 20px;
    width: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    padding-bottom: 5px;
}
.modal_header > input {
    background-color: transparent;
    height: 36px;
    outline: none;
    margin: 0 auto;
    display: block;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid #979797;
    color: rgba(255, 255, 255, 0.89);
    font-size: 1.2rem;
    padding: 0 10px;
    flex: 1;
}

.header_container {
    box-sizing: border-box;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 0 20px;
    border-bottom: 1px solid #e7e7e8;
    background-color: white;
    z-index: 1;
}
.logo {
    background-image: url("../../public/assets/logo.png");
    background-repeat: no-repeat;
    background-size: contain;
    height: 26px;
    width: 100px;
}

.search {
    height: 20px;
    width: 20px;
    /*  */
    background-image: url("../../public/assets/search.png");
    background-size: contain;
    cursor: pointer;
}
.message {
    flex: 1;
    text-align: right;
}
.partition {
    height: 60px;
}

.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgb(54, 54, 60);
    overflow-y: auto;
}
</style>