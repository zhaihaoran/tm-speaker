import axios from 'axios';
import qs from 'qs';

const state = {
    messages: [], // 聊天列表
}

const mutations = {
    GETCHATLIST(state, {
        cfg,
        onSuccess,
        onError
    }) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            state.messages = res.data.data.data;
            state.count = +res.data.data.count;
            state.tableLoading = false;
        });
    },
    SENDMESSAGES(state, {
        cfg,
        onSuccess,
        onError
    }) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            if(res && res.code == 1) {
                state.messages.push({

                })
            }
        });
    }
}

const action = {

}

export default {
    state,
    mutations,
    action
}
