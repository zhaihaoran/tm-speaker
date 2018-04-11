import axios from 'axios';
import qs from 'qs';
import {
    Message
} from 'element-ui';

const state = {
    timerange: [], // 开始时间，结束时间
    orderType: 0, // 排序类型
    status: 1, // 发起状态
    page: 1, //页码
    perPage: 10, //每页数量
    data: [], // 数据
    fromSide: 0, // 从哪来
    form: {}, // 表单信息
    count: 0, // 总数据
    tableLoading: false, // loading,
    chatList: [], //聊天内容列表
    feedList: [] //反馈内容列表
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


const mutations = {
    updateValue(state, payload) {
        state = Object.assign(state, payload)
    },
    setTimeRange(state, array) {
        if (array.length == 0) {
            state.timerange = [];
        } else {
            state.timerange = [array[0] / 1000, array[1] / 1000]
        }
    },
    resetValue(state) {
        state = {
            timerange: [], // 开始时间，结束时间
            orderType: 0, // 排序类型
            status: 1, // 发起状态
            page: 1, //页码
            perPage: 20 //每页数量
        }
    },
    getPageData(state, {
        onSuccess,
        ...cfg
    }) {
        state.tableLoading = true;
        fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.data = res.data.data.data;
                state.count = +res.data.data.count;
                state.tableLoading = false;
            }
        })
    },
    /* 更新data中一行数据 */
    updatelist(state, row) {
        state.data.map(el => {
            if (+el.addTimestamp === +row.addTimestamp) {
                return Object.assign(el, row)
            }
            return el;
        })
    },
    /* 删除 */
    deleteSubmit(state, cfg) {
        fetchPost({
            cfg,
            isMessage: true,
            successText: "删除成功",
            errorText: "删除失败",
            onSuccess: res => {
                // 提交成功
                state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
            },
        });
    },
    /* 拒绝 */
    refuse(state, cfg) {
        fetchPost({
            cfg,
            isMessage: true,
            successText: "操作成功",
            errorText: "操作失败",
            onSuccess: res => {
                state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
            },
        });
    },
    /* 同意 */
    Ok(state, cfg) {
        fetchPost({
            cfg,
            isMessage: true,
            successText: "操作成功",
            errorText: "操作失败",
            onSuccess: res => {
                state.data = state.data.filter(el => el.appointmentId !== cfg.appointmentId);
            },
        });
    },
    /* 获取原因 */
    getRejectDesc(state, {
        onSuccess,
        ...cfg
    }) {
        fetchPost({
            onSuccess,
            cfg
        });
    },
    /* 获取聊天内容 */
    getChatList(state, {
        onSuccess,
        ...cfg
    }) {
        fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.chatList = res.data.data.chatMessageList
            }
        });
    },
    /* 发送聊天 */
    sendChatMsg(state, {
        onSuccess,
        ...cfg
    }) {
        fetchPost({
            onSuccess,
            cfg,
            ActionSuccess: res => {
                state.chatList.push({
                    senderType: 2,
                    senderName: "我", // 发送者名称
                    message: cfg.message, // 消息
                    addTimestamp: Math.floor(new Date().getTime() / 1000)
                })
            }
        });
    },
    /* 获取反馈列表 */
    getFeedList(state, cfg) {
        fetchPost({
            cfg,
            ActionSuccess: res => {
                state.feedList = res.data.data.feedbackList;
            }
        });
    }
}

export default {
    state,
    mutations,
}
