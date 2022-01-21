import { createStore } from 'vuex'

export default createStore({
  state: {
    // 地理信息
    location: {
      area_name: "武侯",
      adm1: "四川省",
      adm2: "成都",
      country: "中国",
      area_id: '101270119',
    },

    // 实时天气
    live: {
      cloud: '',
      dew: '',
      feelsLike: '',
      humidity: '',
      icon: '',
      obsTime: '',
      precip: '',
      pressure: '',
      temp: '',
      text: '',
      vis: '',
      wind360: '',
      windDir: '',
      windScale: '',
      windSpeed: ''
    },

    // 天气指数
    indices: { "运动指数": { "category": "较不宜", "text": "天气较好，但考虑天气寒冷，风力较强，推荐您进行室内运动，若户外运动请注意保暖并做好准备活动。" }, "洗车指数": { "category": "较适宜", "text": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。" }, "穿衣指数": { "category": "冷", "text": "天气冷，建议着棉服、羽绒服、皮夹克加羊毛衫等冬季服装。年老体弱者宜着厚棉衣、冬大衣或厚羽绒服。" }, "钓鱼指数": { "category": "不宜", "text": "天气冷，不适合垂钓。" }, "紫外线指数": { "category": "最弱", "text": "属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。" }, "旅游指数": { "category": "一般", "text": "天气较好，温度稍低，而且风稍大，让您感觉有些冷，会对外出有一定影响，外出注意防风保暖。" }, "过敏指数": { "category": "极不易发", "text": "天气条件极不易诱发过敏，可放心外出，享受生活。" }, "舒适度指数": { "category": "不舒适", "text": "白天天气晴好，但仍会使您感觉偏冷，不舒适，请注意适时添加衣物，以防感冒。" }, "感冒指数": { "category": "较易发", "text": "昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。" }, "空气污染扩散条件指数": { "category": "良", "text": "气象条件有利于空气污染物稀释、扩散和清除，可在室外正常活动。" }, "空调开启指数": { "category": "开启制暖空调", "text": "您将感到有些冷，可以适当开启制暖空调调节室内温度，以免着凉感冒。" }, "太阳镜指数": { "category": "需要", "text": "白天天空晴朗，请适时佩戴太阳镜" }, "化妆指数": { "category": "保湿", "text": "天气寒冷，请用滋润保湿型化妆品，少扑粉，使用润唇膏后再抹口红。" }, "晾晒指数": { "category": "基本适宜", "text": "天气不错，午后温暖的阳光仍能满足你驱潮消霉杀菌的晾晒需求。" }, "交通指数": { "category": "良好", "text": "天气较好，路面干燥，交通气象条件良好，车辆可以正常行驶。" }, "防晒指数": { "category": "较弱", "text": "紫外线强度较弱，建议涂擦SPF在12-15之间，PA+的防晒护肤品。" } },

    // 空气质量
    air: {
      aqi: "37",
      category: "优",
      co: "0.6",
      level: "1",
      no2: "40",
      o3: "16",
      pm10: "37",
      pm2p5: "17",
      primary: "NA",
      pubTime: "2022-01-12T10:00+08:00",
      so2: "2",
    },

    // 逐小时天气预报
    hour:{"times":["2022-01-12T15:00+08:00","2022-01-12T16:00+08:00","2022-01-12T17:00+08:00","2022-01-12T18:00+08:00","2022-01-12T19:00+08:00","2022-01-12T20:00+08:00","2022-01-12T21:00+08:00","2022-01-12T22:00+08:00","2022-01-12T23:00+08:00","2022-01-13T00:00+08:00","2022-01-13T01:00+08:00","2022-01-13T02:00+08:00","2022-01-13T03:00+08:00","2022-01-13T04:00+08:00","2022-01-13T05:00+08:00","2022-01-13T06:00+08:00","2022-01-13T07:00+08:00","2022-01-13T08:00+08:00","2022-01-13T09:00+08:00","2022-01-13T10:00+08:00","2022-01-13T11:00+08:00","2022-01-13T12:00+08:00","2022-01-13T13:00+08:00","2022-01-13T14:00+08:00"],"temps":["-6","-7","-8","-9","-10","-12","-11","-11","-10","-10","-10","-9","-9","-8","-8","-8","-9","-10","-9","-9","-9","-7","-5","-4"]},

    days:[]
  },
  mutations: {
    update_location(state, payload) {
      state.location.area_name = payload.name;
      state.location.area_id = payload.id;
      state.location.adm1 = payload.adm1;
      state.location.adm2 = payload.adm2;
      state.location.country = payload.country;
    },

    update_live(state, payload) {
      state.live.cloud = payload.now.cloud,
        state.live.dew = payload.now.dew,
        state.live.feelsLike = payload.now.feelsLike,
        state.live.humidity = payload.now.humidity,
        state.live.icon = payload.now.icon,
        state.live.obsTime = payload.now.obsTime,
        state.live.precip = payload.now.precip,
        state.live.pressure = payload.now.pressure,
        state.live.temp = payload.now.temp,
        state.live.text = payload.now.text,
        state.live.vis = payload.now.vis,
        state.live.wind360 = payload.now.wind360,
        state.live.windDir = payload.now.windDir,
        state.live.windScale = payload.now.windScale,
        state.live.windSpeed = payload.now.windSpeed
    },
    update_indices(state, payload) {
      Object.assign(state.indices, payload)
    },
    update_air(state, payload) {
      Object.assign(state.air, payload)
    },
    update_hour(state, payload){
      Object.assign(state.hour, payload)
    },
    update_days(state, payload){
      state.days = []
      for (let item of payload){
        console.log(item);
          state.days.push(item)
      }
    }
  },
  actions: {
  },

})
