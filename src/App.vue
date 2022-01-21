<template>
    <Header></Header>

    <div class="app_container">
        <router-view />
    </div>
    <Footer></Footer>
</template>


<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import get_city from './utility/get_city';
import { useStore } from 'vuex';
import use_load_city_all_data from './hooks/use_load_city_all_data';
import { onMounted } from 'vue';
import FooterVue from './components/Footer.vue';


// app挂载时，根据当前位置加载天气数据，将数据存入vuex中
const store = useStore();
onMounted(async () => {
    let city = await get_city();
    store.commit('update_location', city.location[0]);
    use_load_city_all_data(store);

})

</script>
<style>
.app_container {
    width: auto;
    user-select: none;
    padding: 10px;
}
a {
    text-decoration: none;
    color: #444;
}
a:link,
a:active,
a:hover {
    color: #444;
}
* {
    margin: 0;
    padding: 0;
}
</style>
