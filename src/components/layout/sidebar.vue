<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu v-show="main" :default-active.sync="path" :default-openeds="['/invite']" class="admin-sider-menu" :collapse="sidebarState" >
            <router-link to="/invite/send" >
                <el-menu-item class="sider-menu-item" index="/invite/send">
                    <i class="el-icon-phone"></i>发起邀约
                </el-menu-item>
            </router-link>
            <el-submenu index="/invite">
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">邀约信息</span></template>
                <router-link to="/offer_send" >
                    <el-menu-item class="sider-menu-item" index="/offer_send">
                        已发起邀约
                    </el-menu-item>
                </router-link>
                <router-link to="/offer_over" >
                    <el-menu-item class="sider-menu-item" index="/offer_over">
                        收到的邀约
                    </el-menu-item>
                </router-link>
                <router-link to="/underway" >
                    <el-menu-item class="sider-menu-item" index="/underway">
                        进行中
                    </el-menu-item>
                </router-link>
                <router-link to="/done" >
                    <el-menu-item class="sider-menu-item" index="/done">
                        已完成
                    </el-menu-item>
                </router-link>
                <router-link to="/refused" >
                    <el-menu-item class="sider-menu-item" index="/refused">
                        被拒绝
                    </el-menu-item>
                </router-link>
                <router-link to="/refuse" >
                    <el-menu-item class="sider-menu-item" index="/refuse">
                        我拒绝
                    </el-menu-item>
                </router-link>
                <router-link to="/invite/all" >
                    <el-menu-item class="sider-menu-item" index="/invite/all">
                        全部邀约
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <router-link to="/setting" >
                <el-menu-item class="sider-menu-item" index="/setting">
                    <i class="el-icon-setting"></i>主页设置
                </el-menu-item>
            </router-link>
            <router-link v-show="checkState === 1" to="/certification/checked" >
                <el-menu-item class="sider-menu-item" index="/certification/checked">
                    <i class="el-icon-message"></i>学校资料(已审核)
                </el-menu-item>
            </router-link>
            <router-link v-show="checkState === 0" to="/certification/check" >
                <el-menu-item class="sider-menu-item" index="/certification/check">
                    <i class="el-icon-message"></i>学校资料(未审核)
                </el-menu-item>
            </router-link>
        </el-menu>

        <!-- help -->
        <el-menu v-show="help" :default-active.sync="path" :default-openeds="['/help/flow','/help/download']" class="admin-sider-menu" :collapse="sidebarState" >
            <el-submenu index="/help/flow">
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">流程指南</span></template>
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
                <template slot="title"><i class="el-icon-menu"></i><span slot="title">下载</span></template>
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
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            path: this.$route.path
        };
    },
    mounted() {
        this.changeSidebarView();
    },
    // 组件每次更新 都要做sidebar渲染处理
    updated() {
        // 每次更新都要确保path实时更新
        this.changeSidebarView();
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: mapState({
        help: state => state.common.help_sidebar,
        main: state => state.common.common_sidebar,
        sidebarState: state => state.common.sidebar_toggle,
        checkState: state => state.common.check_state
    }),
    methods: {
        ...mapMutations(['switchSidebarView']),
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
