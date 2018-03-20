import Vue from 'vue'
import Router from 'vue-router'

// components
import Offer_Send from '@comp/view/offer_send.vue'
import Offer_Over from '@comp/view/offer_over.vue'

import Certification_checked from '@comp/view/certifi_checked.vue'
import Certification_check from '@comp/view/certifi_check.vue'
import Invite_speaker from '@comp/view/invite_speaker.vue'
import Invite_all from '@comp/view/invite_all.vue'
import Refused from '@comp/view/refused.vue'
import Refuse from '@comp/view/refuse.vue'
import Done from '@comp/view/done.vue'
import Underway from '@comp/view/underway.vue' //进行中
import Setting from '@comp/view/setting.vue'
import Flow_school from '@comp/view/flow_school.vue'
import Flow_speaker from '@comp/view/flow_speaker.vue'
import Download from '@comp/view/download.vue'

// 登陆
import Login from '@comp/view/login.vue'

Vue.use(Router)

// 默认路由，通过重定向实现

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/invite/send'
    }, {
        path: '/help',
        redirect: '/help/flow/school'
    }, {
        path: '/login',
        name: 'login',
        component: Login,
    }, {
        path: '/help/flow/school',
        name: 'flow_school',
        component: Flow_school,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/help/flow/speaker',
        name: 'flow_speaker',
        component: Flow_speaker,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/help/download/resources',
        name: 'download',
        component: Download,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/offer_send',
        name: 'offer_send',
        component: Offer_Send,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/offer_over',
        name: 'offer_over',
        component: Offer_Over,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/certification/checked',
        name: 'Certification_checked',
        component: Certification_checked,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/certification/check',
        name: 'Certification_check',
        component: Certification_check,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/refused',
        name: 'Refused',
        component: Refused,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/refuse',
        name: 'Refuse',
        component: Refuse,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/done',
        name: 'Done',
        component: Done,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/underway',
        name: 'Underway',
        component: Underway,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/invite/send',
        name: 'invite_speaker',
        component: Invite_speaker,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/invite/all',
        name: 'invite_all',
        component: Invite_all,
        meta: {
            requireAuth: true,
        },
    }, {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: {
            requireAuth: true,
        },
    }]
})

// 拦截器
router.beforeEach((to, from, next) => {
    console.log(to.fullPath)
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        // 判断用户是否登陆
        if (+sessionStorage.isLogin > 0) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})

export default router;
