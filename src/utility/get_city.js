import axios from 'axios'
import {key} from '../settings'

// 这玩意不可能出错
function getPosition() {
    return new Promise((resolve, reject) => {
        // 地理位置服务不可用
        if (!('geolocation' in navigator)) {
            // 失败默认返回北京的经纬度
            resolve(116.41, 39.92)
        }

        // 地理位置服务可用
        navigator.geolocation.getCurrentPosition(
            // 定位成功
            (position) => {
                resolve(position.coords.longitude + ',' + position.coords.latitude)
            },
            // 定位失败
            () => {
                // 失败默认返回北京的经纬度
                resolve('116.41,39.92')
            },
            {
                timeout:3000
            }
        )
        
    })
}

export default  async function get_city(){
    let position = await getPosition();
    console.log(position);
    let {data: res}= await axios.get('https://geoapi.qweather.com/v2/city/lookup', {params:{
        location: position,
        key
    }})
    return res

}