<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu router v-show="main" :default-active.sync="$route.path" :default-openeds="['/invite']" class="admin-sider-menu" :collapse="sidebarState" >
            <router-link v-for="menu in menuList" :key="menu.$index" :to="sidebarRender(menu,'path')" >
                <el-menu-item class="sider-menu-item"
                    :index="sidebarRender(menu,'path')" >
                    <i :class="[iconfont,sidebarRender(menu,'icon')]"></i>
                    {{sidebarRender(menu,'name')}}
                    <span v-if="sidebarRender(menu,'status')" >(
                        {{sidebarRender(menu,'status')[menu.status]}}
                    )</span>
                </el-menu-item>
                <div class="dividar" v-show="sidebarRender(menu,'dividar')" ></div>
            </router-link>
        </el-menu>
        <!-- help -->
        <el-menu v-show="help" :default-active.sync="$route.path" :default-openeds="['/help/flow','/help/download']" class="admin-sider-menu" :collapse="sidebarState" >
            <el-submenu index="/help/flow">
                <template slot="title"><i class="el-icon-tickets"></i><span slot="title">流程指南</span></template>
                <router-link to="/help/flow/school" >
                    <el-menu-item class="sider-menu-item" index="/help/flow/school">
                        学校上课流程
                    </el-menu-item>
                </router-link>
                <router-link to="/help/flow/speaker" >
                    <el-menu-item class="sider-menu-item" index="/help/flow/speaker">
                        梦享家上课流程
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="/help/download">
                <template slot="title"><i class="el-icon-download"></i><span slot="title">下载</span></template>
                <router-link to=" /help/download/resources" >
                    <el-menu-item class="sider-menu-item" index="/help/download/resources">
                        梦享家上课流程
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
import { sidebarRender } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            path: this.$route.path,
            iconfont: 'icon iconfont sd-icon'
        };
    },
    mounted() {
        this.getMenuList();
        this.changeSidebarView();
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: mapState({
        help: state => state.common.help_sidebar,
        main: state => state.common.common_sidebar,
        sidebarState: state => state.common.sidebar_toggle,
        menuList: state => state.common.menuList,
        users: state => state.common.users
    }),
    methods: {
        sidebarRender,
        ...mapMutations(['setValue', 'getMenuList', 'switchSidebarView']),
        changeSidebarView() {
            if (this.path.indexOf('help') > -1) {
                this.switchSidebarView('help');
            } else {
                this.switchSidebarView('main');
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.dividar {
    height: 2px;
    background: #4e4b4b;
}
.sd-icon {
    margin-right: 8px;
    font-size: 18px;
}
</style>

