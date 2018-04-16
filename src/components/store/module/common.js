import Util from '@comp/lib/utils'

const state = {
    common_sidebar: false, // 主体侧边栏状态
    help_sidebar: false, // 帮助侧边栏
    sidebar_toggle: false, // 侧边栏展开状态
    // sesson里取
    login_state: 0, // 登陆状态 0：未登录
    checkState: 0, // 审核状态
    menuList: {}, // 菜单列表
    users: {}, //用户信息
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
    /**
     * 拿到用户登陆状态
     *
     * @param {any} state
     * @param {any}
     */
    getUserLogin(state, baseUrl) {
        const cfg = {
            act: 'getUserLogin',
        }
        Util.commonPost({
            url: "api/common/",
            cfg,
            ActionSuccess: res => {
                let cfg = res.data.data;
                if (cfg && +cfg.isLogin > 0) {
                    state.users = cfg
                } else {
                    window.location.href = baseUrl
                }
            }
        })
    },
    getFormData(state, {
        onError,
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onError,
            onSuccess,
            cfg
        })
    },
    /**
     *
     * 获取用户菜单列表
     * @param {any} state
     * @param {any}
     */
    getMenuList(state) {
        const cfg = {
            act: 'getMenuList',
        }
        Util.fetchPost({
            cfg,
            ActionSuccess: res => {
                state.menuList = res.data.data.menuList;
                state.checkState = state.menuList.find(el => el.menuId == 10401).status;
            }
        })
    },
    /* 数组数据 - 照片 */
    getArrayData(state, {
        onError,
        onSuccess,
        ...cfg
    }) {
        Util.fetchPost({
            onError,
            onSuccess,
            cfg
        })
    },
    /* 获取表单数据 */
    formSubmit(state, {
        onError,
        onSuccess,
        isMessage = true,
        successText = "提交成功",
        errorText = "提交失败",
        ...cfg
    }) {
        Util.fetchPost({
            onError,
            onSuccess,
            isMessage,
            successText,
            cfg,
            errorText
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
    signout(state, baseUrl) {
        state = {};
        const cfg = {
            act: 'logout',
        }
        Util.commonPost({
            url: "api/common/",
            cfg,
            ActionSuccess: res => {
                let cfg = res.data.data;
                if (cfg && +cfg.isLogin > 0) {
                    state.users = cfg
                } else {
                    window.location.href = baseUrl
                }
            }
        })
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
