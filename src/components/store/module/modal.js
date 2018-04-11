import axios from 'axios';
import qs from 'qs';

import {
    Message
} from 'element-ui';


const state = {
    form: {
        speakTimestamp: new Date().getTime() / 1000,
        addTimestamp: new Date().getTime() / 1000,
    },
    modal: false,
    speakTimestamp: 0
}

const fetchData = ({
    onSuccess,
    onError,
    cfg,
    isMessage = false,
    successText = "成功",
    errorText = "失败",
    ActionSuccess
}) => {
    axios({
        data: qs.stringify(cfg)
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
    showModal(state, data) {
        state.modal = true
        state.form = Object.assign(state.form, data)
        state.speakTimestamp = data.speakTimestamp
    },
    /* modal edit */
    submit(state, {
        onSuccess,
        ...cfg
    }) {
        fetchData({
            cfg,
            onSuccess,
            isMessage: true,
            successText: "修改成功",
            errorText: "修改失败",
        })
    },
    closeModal(state, cfg) {
        state.modal = false;
        state.form = {
            speakTimestamp: 0,
            addTimestamp: 0
        };
    },
    setDateValue(state, payload) {
        state = Object.assign(state, payload)
    }
}

export default {
    state,
    mutations
}
