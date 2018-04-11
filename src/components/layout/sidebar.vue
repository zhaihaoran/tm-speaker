<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu router v-show="main" :default-active.sync="path" :default-openeds="['/invite']" class="admin-sider-menu" :collapse="sidebarState" >
            <router-link v-for="menu in menuList" :key="menu.$index" :to="sidebarRender(menu,'path')" >
                <el-menu-item class="sider-menu-item"
                    :index="sidebarRender(menu,'path')" >
                    <i :class="sidebarRender(menu,'icon')"></i>
                    {{sidebarRender(menu,'name')}}
                    <span v-if="sidebarRender(menu,'status')" >(
                        {{sidebarRender(menu,'status')[menu.status]}}
                    )</span>
                </el-menu-item>
                <div class="dividar" v-show="sidebarRender(menu,'dividar')" ></div>
            </router-link>
        </el-menu>
        <!-- help -->
        <el-menu v-show="help" :default-active.sync="path" :default-openeds="['/help/flow','/help/download']" class="admin-sider-menu" :collapse="sidebarState" >
            <el-submenu index="/help/flow">
                <template slot="title"><i class="el-icon-tickets"></i><span slot="title">流程指南</span></template>
                <router-link to="/help/flow/school" >
                    <el-menu-item class="sider-menu-item" index="/help/flow/school">
                        学校上课流程
                    </el-menu-item>
                </router-link>
                <router-link to="/help/flow/speaker" >
                    <el-menu-item class="sider-menu-item" index="/help/flow/speaker">
                        演讲者上课流程
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="/help/download">
                <template slot="title"><i class="el-icon-download"></i><span slot="title">下载</span></template>
                <router-link to="/help/download/resources" >
                    <el-menu-item class="sider-menu-item" index="/help/download/resources">
                        演讲者上课流程
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { attrs, sidebarRender } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            attrs,
            menuList: {},
            path: this.$route.path
        };
    },
    mounted() {
        axios({
            data: qs.stringify({
                act: 'getMenuList'
            })
        }).then(res => {
            const menus = res.data.data.menuList;
            this.menuList = menus;
            const checkState = +menus.find(el => el.menuId == 20401).status;
            console.log(checkState);
            this.setValue({ checkState });
        });
        this.changeSidebarView();
    },
    updated() {
        this.changeSidebarView();
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: mapState({
        help: state => state.common.help_sidebar,
        main: state => state.common.common_sidebar,
        sidebarState: state => state.common.sidebar_toggle
    }),
    methods: {
        sidebarRender,
        ...mapMutations(['setValue', 'switchSidebarView']),
        changeSidebarView() {
            this.path = this.$route.path;
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
</style>

