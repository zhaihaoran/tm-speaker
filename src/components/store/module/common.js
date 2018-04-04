import axios from 'axios';
import qs from 'qs';
import {
    Message
} from 'element-ui';

const state = {
    common_sidebar: false, // 主体侧边栏状态
    help_sidebar: false, // 帮助侧边栏
    sidebar_toggle: false, // 侧边栏展开状态
    // sesson里取
    login_state: 0, // 登陆状态 0：未登录
    checkState: 0, // 审核状态
}

const fetchPost = ({
    onSuccess,
    onError,
    isMessage = false,
    cfg,
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

// 模块的mutations 、 actions、getter 默认注册在全局命名空间的
const mutations = {
    setValue(state, payload) {
        state = Object.assign(state, payload)
    },
    toggleState(state) {
        //在这里改变state中的数据
        state.check_state = state.check_state ? 0 : 1
    },
    getFormData(state, {
        onError,
        onSuccess,
        ...cfg
    }) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            if (res && res.data.code === 1) {
                onSuccess && onSuccess(res);
            } else {
                onError && onError(res);
            }
        });
    },
    /* 数组数据 - 照片 */
    getArrayData(state, {
        onError,
        onSuccess,
        ...cfg
    }) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            if (res && res.data.code === 1) {
                onSuccess && onSuccess(res);
            } else {
                onError && onError(res);
            }
        });
    },
    /* 获取表单数据 */
    formSubmit(state, {
        onError,
        onSuccess,
        isMessage = true,
        ...cfg
    }) {
        fetchPost({
            onError,
            onSuccess,
            isMessage: isMessage,
            successText: "提交成功",
            cfg,
            errorText: "提交失败"
        })
    },
    switchSidebarView(state, view) {
        if (view === "help") {
            state.help_sidebar = true;
            state.common_sidebar = false;
        } else {
            state.help_sidebar = false;
            state.common_sidebar = true;
        }
    },
    login(state) {
        state.login_state = 1;
        sessionStorage.isLogin = 1;
    },
    signout(state) {
        state.login_state = 0;
        sessionStorage.isLogin = 0;
    },
    handleCheckState(state, ) {
        state.check_state = 0;
    }
}

const actions = {
    toggle({
        commit
    }) {
        //在这里改变state中的数据
        commit('toggle')
    }
}

export default {
    state,
    mutations,
    actions
};
