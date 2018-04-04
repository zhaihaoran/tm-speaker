<template>
    <el-header height="70px" class="admin-header">
        <div class="logo">
            <router-link to="/" ><img :src="logo" @click="switchSidebarView('main')" alt="logo"></router-link>
        </div>
        <ul class="header-right">
            <!-- <li class="nav-header-item">
                <span @click="toggleState" >通过</span>
            </li> -->
            <li class="nav-header-item">
                <router-link to="/" > <span @click.capture="switchSidebarView('main')" >管理中心</span> </router-link>
            </li>
            <li class="nav-header-item">
                <a href="https://www.baidu.com">网站首页</a>
            </li>
            <li class="nav-header-item">
                <router-link to="/help" ><span @click="switchSidebarView('help')" >帮助</span> </router-link>
            </li>
            <!-- 已登录 -->
            <!-- <li v-show="loginState === 1" class="nav-header-item user-logo">
                <img :src="user_logo" alt="user">
            </li>
            <li v-show="loginState === 1" class="nav-header-item">
                <a href="##" @click="handleSignOut" >退出</a>
            </li>
            <li v-show="loginState === 0" class="nav-header-item"  >
                <router-link to="/login" >请登陆</router-link>
            </li> -->
        </ul>
    </el-header>
</template>

<script>
import logo from '@image/logo/logo_white.png';
import qinghua from '@image/logo/tsinghua.png';
import { mapState, mapMutations } from 'vuex';

export default {
    // data 在实例里可以用对象，但在组件中必须用函数形式
    data() {
        return {
            logo,
            user_logo: qinghua
        };
    },
    mounted() {},
    methods: {
        handleSignOut() {
            this.signout();
            this.$router.push({ path: '/login' });
        },
        ...mapMutations(['switchSidebarView', 'signout', 'toggleState'])
    },
    // 方便 属性使用 mapState
    computed: mapState({
        sidebar: state => state.common.sidebar_toggle,
        loginState: state => state.common.login_state
    })
};
</script>
