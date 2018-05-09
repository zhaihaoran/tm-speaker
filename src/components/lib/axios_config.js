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
    switch (res.data.code) {
        case 105:
            // 返回首页
            Message.error({
                showClose: true,
                message: '登陆过期,请重新登陆',
                type: 'error',
                onClose: () => {
                    window.location.href = baseURL
                }
            })
            return res;
        case 211:
            // 用户被冻结
            Message.error({
                showClose: true,
                message: '您已被冻结，请联系管理员',
                type: 'error',
                onClose: () => {
                    // 刷新
                    window.location.reload();
                }
            })
            return res;
        case 1:
            return res;
        default:
            console.log("error", res.data);
            return res;
    }
}, err => {
    return Promise.reject(err)
})
