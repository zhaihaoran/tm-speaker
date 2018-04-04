// 所有的接口字段map合集
const attrs = {
    // 邀约状态
    "status": {
        11: "已发起",
        12: "已收到",
        21: "进行中",
        22: "进行中",
        31: "已完成",
        32: "已完成",
        41: "被拒绝",
        42: "我拒绝",
    },
    // 列表map
    "menus": {
        10101: {
            name: "发起邀约",
            path: "/invite/send",
            icon: "el-icon-phone"
        },
        10201: {
            name: "已发起邀约",
            path: "/invite/over",
            icon: "el-icon-phone"
        },
        10202: {
            name: "收到的邀约",
            path: "/invite/received",
            icon: "el-icon-phone"
        },
        10203: {
            name: "进行中",
            path: "/underway",
            icon: "el-icon-phone"
        },
        10204: {
            name: "已完成",
            path: "/done",
            icon: "el-icon-phone"
        },
        10205: {
            name: "被拒绝",
            path: "/refused",
            icon: "el-icon-phone"
        },
        10206: {
            name: "我拒绝",
            path: "/refuse",
            icon: "el-icon-phone"
        },
        10207: {
            name: "全部邀约",
            path: "/invite/all",
            icon: "el-icon-phone"
        },
        10301: {
            name: "主页设置",
            path: "/setting",
            icon: "el-icon-phone"
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
            icon: "el-icon-phone"
        },
        /* 演讲者 */
        20101: {
            name: "发起邀约",
            path: "/invite/send",
            icon: "el-icon-phone"
        },
        20201: {
            name: "已发起邀约",
            path: "/invite/over",
            icon: "el-icon-phone"
        },
        20202: {
            name: "收到的邀约",
            path: "/invite/received",
            icon: "el-icon-phone"
        },
        20203: {
            name: "进行中",
            path: "/underway",
            icon: "el-icon-phone"
        },
        20204: {
            name: "已完成",
            path: "/done",
            icon: "el-icon-phone"
        },
        20205: {
            name: "被拒绝",
            path: "/refused",
            icon: "el-icon-phone"
        },
        20206: {
            name: "我拒绝",
            path: "/refuse",
            icon: "el-icon-phone"
        },
        20207: {
            name: "全部邀约",
            path: "/invite/all",
            icon: "el-icon-phone"
        },
        20301: {
            name: "主页设置",
            path: "/setting",
            icon: "el-icon-phone"
        },
        20401: {
            name: "演讲者资料",
            path: "/certification/check",
            status: {
                1: "未审核",
                2: "已提交",
                3: "已审核",
                4: "已驳回"
            },
            icon: "el-icon-phone"
        }
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
        2: "演讲者"
    },
    // 学校进展状态
    "schoolStatus": {
        1: "待开课通知",
        2: "待上课",
        3: "待课后反馈提交",
        4: "待课后反馈确认",
        100: "完成"
    },
    // 演讲者进展状态
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
    // 状态码 map
    "code": {
        // 系统级
        0: '系统未知错误',
        1: '处理正常结束',
        2: '服务器关闭',
        // 代码功能Code
        101: '未知的action',
        102: '处理正常结束',
        103: '加密通讯验证失败',
        104: '会话session不匹配',
        105: '会话session过期',
        106: '数据被锁定（并发处理）',
        107: '上传失败',
        108: '上传文件类型不支持',
        109: '上传文件太大',
        // 业务级
        201: '应用不存在',
        202: '用户不存在',
        203: '用户已存在',
        204: '登录token不匹配',
        205: '用户名校验失败（长度、字符要求等）',
        206: '密码校验失败（长度、字符要求等）',
        207: '密码不匹配（提供的密码和用户的密码不一致）',
        208: '短信验证码不一致',
        209: '手机号格式不正确',
        210: '手机号已被使用',
        211: '用户被冻结',
        212: '学校或演讲者认证状态未通过',
        213: '学校课程数量不足',
        214: '邀约不存在',
        215: '邀约与用户无关联（不是演讲者或者学校任一方）',
        216: '邀约状态不正确',
        217: '不是邀约发起者',
        218: '不是受邀请者',
        219: '邀约学校进度状态不正确',
        220: '缺少反馈',
        221: '邀约反馈不存在',
        222: '学校不存在',
    },
}

const baseURL = 'http://10.0.0.148';

const Api = {
    upload: baseURL + '/api/common/?act=upload'
}

module.exports = {
    // 日期格式化
    baseURL,
    Api,
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
        } else {
            return `${y}-${m}-${d} ${h}:${minute}:${s}`
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
        context.updateValue(obj);
        context.getPageData(cfg);
    }
}
