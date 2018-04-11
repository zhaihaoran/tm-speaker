import axios from 'axios'
import {
    Message
} from 'element-ui';
import {
    baseURL
} from '@comp/lib/api_maps'
// 全局配置
axios.defaults.baseURL = baseURL;
axios.defaults.url = 'api/speakerConsole/';
axios.defaults.method = 'post';
axios.defaults.withCredentials = true;

// --- 接口拦截
/* 请求拦截 */
axios.interceptors.request.use(config => {
    // 在请求发送前做什么
    return config;
}, err => {
    return Promise.reject(err)
})

/* 响应拦截 */
axios.interceptors.response.use(res => {
    // 对响应数据做点什么
    if (res.data.code == 105) {
        // 返回首页
        Message.error({
            showClose: true,
            message: '登陆过期,请重新登陆',
            type: 'error',
            onClose: () => {
                console.log("登陆");
                window.location.href = baseURL
            }
        })
        return res;
    } else if (res.data.code == 1) {
        return res;
    } else {
        console.log("error", res.data);
        return res;
    }
}, err => {
    return Promise.reject(err)
})