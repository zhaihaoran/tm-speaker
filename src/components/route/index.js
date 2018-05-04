import Vue from 'vue'
import Router from 'vue-router'

// 发起邀约
import Invite_send from '@comp/view/invite_send.vue'
/* 邀约信息 */
// 已发起邀约
import Invite_over from '@comp/view/invite_over.vue'
// 收到的邀约
import Invite_received from '@comp/view/invite_received.vue'
// 进行中
import Underway from '@comp/view/underway.vue'

import Certification_check from '@comp/view/certifi_check.vue'
import Invite_all from '@comp/view/invite_all.vue'
import Refused from '@comp/view/refused.vue'
import Refuse from '@comp/view/refuse.vue'
import Done from '@comp/view/done.vue'
import Setting from '@comp/view/setting.vue'
import Flow_school from '@comp/view/flow_school.vue'
import Flow_speaker from '@comp/view/flow_speaker.vue'
import Download from '@comp/view/download.vue'
// error
import ErrorPage from '@comp/view/errorPage.vue'

Vue.use(Router)

// 默认路由，通过重定向实现

const router = new Router({
    mode: "history",
    routes: [{
        path: '/',
        redirect: '/invite/received'
    }, {
        path: '/help',
        redirect: '/help/flow/school'
    }, {
        path: '/404',
        name: '404',
        component: ErrorPage,
    }, {
        path: '/help/flow/school',
        name: 'flow_school',
        component: Flow_school,
    }, {
        path: '/help/flow/speaker',
        name: 'flow_speaker',
        component: Flow_speaker,
    }, {
        path: '/help/download/resources',
        name: 'download',
        component: Download,
    }, {
        path: '/invite/over',
        name: 'invite_over',
        component: Invite_over,
    }, {
        path: '/invite/received',
        name: 'invite_received',
        component: Invite_received,
    }, {
        path: '/certification/check',
        name: 'Certification_check',
        component: Certification_check,
    }, {
        path: '/refused',
        name: 'Refused',
        component: Refused,
    }, {
        path: '/refuse',
        name: 'Refuse',
        component: Refuse,
    }, {
        path: '/done',
        name: 'Done',
        component: Done,
    }, {
        path: '/underway',
        name: 'Underway',
        component: Underway,
    }, {
        path: '/invite/send',
        name: 'invite_send',
        component: Invite_send,
    }, {
        path: '/invite/all',
        name: 'invite_all',
        component: Invite_all,
    }, {
        path: '/setting',
        name: 'Setting',
        component: Setting,
    }]
})

// 拦截器 --- 路由拦截
router.beforeEach((to, from, next) => {
    // 如果跳转到其他网站，则404
    if (to.matched.length < 1) {
        next({
            path: '/404',
        })
    } else {
        next();
    }
})

export default router;
