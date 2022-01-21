import axios from 'axios'
import { key } from '../settings'

async function load_all_weather_data(location) {

  let all_data = await Promise.all([
    // 实时天气
    axios.get('https://devapi.qweather.com/v7/weather/now', { params: { key, location } }),
    // 全部天气指数
    axios.get('https://devapi.qweather.com/v7/indices/1d', { params: { key, location, type: 0 } }),
    // 实时空气质量
    axios.get('https://devapi.qweather.com/v7/air/now', { params: { key, location } }),
    // 逐小时天气预报
    axios.get('https://devapi.qweather.com/v7/weather/24h', { params: { key, location } }),
    axios.get('https://devapi.qweather.com/v7/weather/7d', { params: { key, location } })

  ])

  return all_data.map(item => item.data)

}

export default async function use_load_city_all_data(store) {

  let [live, indices, air, hour, days] = await load_all_weather_data(store.state.location.area_id);

  // 处理指数数据
  let indices_data = {}
  for (let item of indices.daily) {
    indices_data[item.name] = { 'category': item.category, text: item.text }
  }

  // 处理逐小时数据
  let hour_data = { times: [], temps: [] }
  for (let item of hour.hourly) {
    hour_data.times.push(item.fxTime)
    hour_data.temps.push(item.temp)
  }

  // 去除今天的天气
  days.daily.shift()
  console.log(days.daily);

  store.commit('update_air', air.now)
  store.commit('update_live', live)
  store.commit('update_indices', indices_data)
  store.commit('update_hour', hour_data)
  store.commit('update_days', days.daily)

}