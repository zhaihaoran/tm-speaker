// 所有的接口字段map合集
const attrs = {
    // 邀约状态
    "status": {
        11: {
            text: "已发起",
            tags: "primary"
        },
        12: {
            text: "已收到",
            tags: "primary"
        },
        2: {
            text: "进行中",
            tags: "warning"
        },
        21: {
            text: "进行中",
            tags: "warning"
        },
        22: {
            text: "进行中",
            tags: "warning"
        },
        3: {
            text: "已完成",
            tags: "success"
        },
        31: {
            text: "已完成",
            tags: "success"
        },
        32: {
            text: "已完成",
            tags: "success"
        },
        41: {
            text: "被拒绝",
            tags: "danger"
        },
        42: {
            text: "我拒绝",
            tags: "danger"
        },
    },
    // 列表map
    "menus": {
        10101: {
            name: "发起邀约",
            path: "/invite/send",
            icon: "icon-faqiyaoyue",
            dividar: true
        },
        10201: {
            name: "已发起邀约",
            path: "/invite/over",
            icon: "icon-yifaqiyaoyue"
        },
        10202: {
            name: "收到的邀约",
            path: "/invite/received",
            icon: "icon-shoudaoyaoyue"
        },
        10203: {
            name: "进行中",
            path: "/underway",
            icon: "icon-jinxingzhong"
        },
        10204: {
            name: "已完成",
            path: "/done",
            icon: "icon-yiwancheng"
        },
        10205: {
            name: "被拒绝",
            path: "/refused",
            icon: "icon-beijujue"
        },
        10206: {
            name: "我拒绝",
            path: "/refuse",
            icon: "icon-shanchuguanbicha"
        },
        10207: {
            name: "全部邀约",
            path: "/invite/all",
            icon: "icon-all"
        },
        10301: {
            name: "主页设置",
            path: "/setting",
            icon: "icon-setting",
            dividar: true
        },
        10401: {
            name: "学校资料",
            path: "/certification/check",
            status: {
                1: "未审核",
                2: "已提交",
                3: "已审核",
                4: "已驳回"
            },
            icon: "icon-ziliao",
        },
        /* 梦享家 */
        20101: {
            name: "发起邀约",
            path: "/invite/send",
            icon: "icon-faqiyaoyue",
            dividar: true
        },
        20201: {
            name: "已发起邀约",
            path: "/invite/over",
            icon: "icon-yifaqiyaoyue"
        },
        20202: {
            name: "收到的邀约",
            path: "/invite/received",
            icon: "icon-shoudaoyaoyue"
        },
        20203: {
            name: "进行中",
            path: "/underway",
            icon: "icon-jinxingzhong"
        },
        20204: {
            name: "已完成",
            path: "/done",
            icon: "icon-yiwancheng"
        },
        20205: {
            name: "被拒绝",
            path: "/refused",
            icon: "icon-beijujue"
        },
        20206: {
            name: "我拒绝",
            path: "/refuse",
            icon: "icon-shanchuguanbicha"
        },
        20207: {
            name: "全部邀约",
            path: "/invite/all",
            icon: "icon-all"
        },
        20301: {
            name: "主页设置",
            path: "/setting",
            icon: "icon-setting",
            dividar: true
        },
        20401: {
            name: "梦享家资料",
            path: "/certification/check",
            status: {
                1: "未审核",
                2: "已提交",
                3: "已审核",
                4: "已驳回"
            },
            icon: "icon-ziliao",
        }
    },
    // 审核状态
    "checkStatus": {
        1: "未审核",
        2: "已提交",
        3: "已审核"
    },
    // 排序类型
    "orderType": {
        0: "无排序",
        1: "最近演讲",
        2: "最近邀约",
    },
    // 发起方
    "fromSide": {
        1: "学校",
        2: "梦享家"
    },
    // 学校进展状态
    "schoolStatus": {
        1: "待开课通知",
        2: "待上课",
        3: "待课后反馈提交",
        4: "待课后反馈确认",
        100: "完成"
    },
    // 梦享家进展状态
    "speakerStatus": {
        1: "待开课通知",
        2: "待上课",
        100: "完成"
    },
    // 是否冻结
    "suspend": {
        0: "否",
        1: "是"
    },
    // 是否贫困
    "isPoor": {
        0: "否",
        1: "是"
    },
    // 认证状态
    "authStatus": {
        1: "未提审",
        2: "待审核",
        3: "已通过",
        4: "已驳回",
    },
    // 性别
    "sex": {
        1: "女",
        2: "男",
    },
    // 身份
    "userType": {
        1: "学校",
        2: "梦享家",
        3: "管理员"
    }
}

const baseURL = process.env.BASE_URL;

module.exports = {
    // 日期格式化
    baseURL,
    attrs,
    dateformat(timestamp, state = 0) {
        if (timestamp < 1000) {
            return ''
        }
        var date = new Date(+timestamp * 1000);
        var y = date.getFullYear();
        // 月份是从0开始的！！坑死老子了
        var m = date.getMonth();
        var d = date.getDate();
        var h = date.getHours();
        var minute = date.getMinutes();
        var s = date.getSeconds();

        m = m < 10 ? '0' + m : m;
        m = +m + 1;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        s = s < 10 ? '0' + s : s;
        minute = minute < 10 ? '0' + minute : minute;
        if (state === 1) {
            return `${y}年${m}月${d}日${h}时${minute}分${s}秒`
        } else if (state === 2) {
            return `${y}-${m}-${d} ${h}:${minute}:${s}`
        } else {
            return `${y}-${m}-${d} ${h}:${minute}`
        }
    },
    // 属性格式化
    formatAttr(row, column, cellValue) {
        return attrs[column.property][cellValue];
    },
    // sidebar render
    // 学校资料是1个id对应两个页面，所以需要特殊处理
    sidebarRender({
        menuId,
        status
    }, type) {
        const {
            menus
        } = attrs;
        return menus[menuId][type];
    },
    /* getPageDate */
    commonPageInit(context, obj, cfg) {
        /* 页面每次挂载，都要清空掉查询条件 */
        context.clearSearchOps();
        /* 更新status */
        context.updateValue(obj);
        /* 获取页面数据 */
        context.getPageData(cfg);
    },
    /* 时间格式化   sec 转 min */
    formatDuration(sec = 0) {
        return Math.floor(sec / 60) + ':' + Math.floor(sec % 60)
    },
    /* sec to min  */
    secToMin(sec) {
        return Math.floor(sec / 60)
    },
    MinToSec(min) {
        return min * 60
    },
    toSpeakerHome(id) {
        return `/speaker/speakerId/${id}`
    },
    toSchoolHome(id) {
        return `/school/schoolId/${id}`
    },
}
