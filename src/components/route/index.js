import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 默认路由，通过重定向实现

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/invite/received'
    }, {
        path: '/help',
        redirect: '/help/flow/school'
    }, {
        path: '/404',
        name: '404',
        component: resolve => require(['@comp/view/errorPage.vue'], resolve),
    }, {
        path: '/suspend',
        name: 'suspend',
        component: resolve => require(['@comp/view/suspend.vue'], resolve),
    }, {
        path: '/help/flow/school',
        name: 'flow_school',
        component: resolve => require(['@comp/view/flow_school.vue'], resolve),
    }, {
        path: '/help/flow/speaker',
        name: 'flow_speaker',
        component: resolve => require(['@comp/view/flow_speaker.vue'], resolve),
    }, {
        path: '/help/download/resources',
        name: 'download',
        component: resolve => require(['@comp/view/download.vue'], resolve),
    }, {
        path: '/invite/over',
        name: 'invite_over',
        component: resolve => require(['@comp/view/invite_over.vue'], resolve),
    }, {
        path: '/invite/received',
        name: 'invite_received',
        component: resolve => require(['@comp/view/invite_received.vue'], resolve),
    }, {
        path: '/certification/check',
        name: 'Certification_check',
        component: resolve => require(['@comp/view/certifi_check.vue'], resolve),
    }, {
        path: '/refused',
        name: 'Refused',
        component: resolve => require(['@comp/view/refused.vue'], resolve),
    }, {
        path: '/refuse',
        name: 'Refuse',
        component: resolve => require(['@comp/view/refuse.vue'], resolve),
    }, {
        path: '/done',
        name: 'Done',
        component: resolve => require(['@comp/view/done.vue'], resolve),
    }, {
        path: '/underway',
        name: 'Underway',
        component: resolve => require(['@comp/view/underway.vue'], resolve),
    }, {
        path: '/invite/send',
        name: 'invite_send',
        component: resolve => require(['@comp/view/invite_send.vue'], resolve),
    }, {
        path: '/invite/all',
        name: 'invite_all',
        component: resolve => require(['@comp/view/invite_all.vue'], resolve),
    }, {
        path: '/setting',
        name: 'Setting',
        component: resolve => require(['@comp/view/setting.vue'], resolve),
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
