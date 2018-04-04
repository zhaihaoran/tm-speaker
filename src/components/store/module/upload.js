import axios from 'axios';
import qs from 'qs';
import {
    Message
} from 'element-ui';

const state = {
    pathfilename: '',
    photoShortPathFilename: '',
    photoUrl: ''
}

const fetchData = ({
    url,
    onSuccess,
    onError,
    cfg,
    isMessage = false,
    successText = "成功",
    errorText = "失败",
    ActionSuccess
}) => {
    axios({
        url,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: cfg
    }).then(res => {
        if (res && res.data.code === 1) {
            isMessage && Message.success(successText)
            ActionSuccess && ActionSuccess(res);
            onSuccess && onSuccess(res)
        } else {
            isMessage && Message.error(errorText)
            onError && onError(res);
        }
    });
}

const mutations = {
    update(state, payload) {
        state = Object.assign(state, payload)
    },
    commonUpload(state, {
        onSuccess,
        onError,
        filepathname,
        previewname,
        formCfg
    }) {
        formCfg.append('act', 'upload');
        fetchData({
            url: "common/",
            cfg: formCfg,
            onSuccess,
            onError,
            ActionSuccess: res => {
                state[previewname] = res.data.data.fileUrl
                state[filepathname] = res.data.data.shortPathFilename
            }
        })
    },
    /* 单独上传 */
    photoUpload(state, {
        onSuccess,
        onError,
        formCfg
    }) {
        fetchData({
            url: "schoolConsole/",
            cfg: formCfg,
            onSuccess,
            onError,
        })
    }
}

export default {
    state,
    mutations
}
