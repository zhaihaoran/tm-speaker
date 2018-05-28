<template>
    <div>
        <el-alert
            v-show="!alertState[$route.path]"
            :type="pageInfo($route.path,'type')"
            :title="pageInfo($route.path,'title')"
            :description="pageInfo($route.path,'description')"
            @close="changeAlertState($route.path)"
            class="mb-20"
        >
        </el-alert>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" @keyup.native.enter="handleSearch" placeholder="搜索关键字" v-model="searchCfg.searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card center" v-show="data.length<1" >
            <img :src="emptyImage" class="img-fluid" alt="empty">
        </div>
        <div v-for="school in data" :key="school.$index" class="tm-card in-card">
            <a :href="handleHomePage(school.schoolId)" class="card-image">
                <img :src="handleAvatar(school.profilePhotoUrl)" class="min-images img-fluid" :alt="school.schoolName">
            </a>
            <div class="card-wrapper">
                <a :href="handleHomePage(school.schoolId)" class="no-margin title">
                    <span class="teacher-name" >{{school.name || "未填写名称"}}</span>
                    <el-tooltip effect="dark" content="重点关爱学校" placement="top-start">
                        <i v-show="+school.isPoor > 0" class="icon iconfont icon-gongyi tm-bage" ></i>
                    </el-tooltip>
                </a>
                <p class="mm" >{{school.schoolShortDesc}}</p>
                <p class="m-10" ><span class="num tm-text-color" >{{school.finishedClass}}</span> 开课数</p>
                <p class="no-margin text-overflow" >简介：{{school.schoolDesc || "未填写信息"}}</p>
            </div>
            <el-button icon="el-icon-phone-outline" @click="handleEdit(school)" class="tm-btn invite-btn"> 邀约</el-button>
        </div>
        <!-- edit -->
        <EditInvite title="发起邀约" ></EditInvite>
        <el-card class="pagi-card" >
            <Pagination classes="center offer-pagination" :cfg="searchCfg" :count="count" ></Pagination>
        </el-card>
    </div>
</template>
<script>
import { commonPageInit } from '@comp/lib/api_maps.js';
import common_mixin from '@comp/mixin/common';

import Pagination from '@layout/pagination.vue';
import EditInvite from '@layout/modal/send_invite.vue';
import Search from '@layout/invite_search.vue';

import school from '@image/school.png';
import emptyImage from '@image/empty.png';

export default {
    mixins: [common_mixin],
    data() {
        return {
            emptyImage,
            searchCfg: {
                act: 'getSchoolList',
                orderType: this.orderType,
                searchText: ''
            }
        };
    },
    components: {
        Search,
        EditInvite,
        Pagination
    },
    mounted() {
        this.clearSearchOps();
        this.getPageData({
            act: 'getSchoolList'
        });
    },
    methods: {
        handleEdit(row) {
            this.showModal({
                schoolId: row.schoolId,
                name: row.name,
                speakDuration: '',
                speakerTitle: '',
                speakTimestamp: 0,
                addTimestamp: 0
            });
        },
        handleHomePage(id) {
            return `/school/schoolId/${id}`;
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
        },
        handleAvatar(url) {
            return url || school;
        }
    }
};
</script>
<style lang="scss" scoped >
.offer-pagination {
    margin: 0;
}
.admin-step {
    height: 200px;
}
.in-card.tm-card {
    display: flex;
    flex-direction: row;
    .card-image {
        width: 160px;
        height: 160px;
        background: #d6d4d4;
        overflow: hidden;
    }
    .card-wrapper {
        flex: 1;
        color: #6e6e6e;
        padding-left: 20px;
        max-width: 740px;
        p {
            max-height: 66px;
            line-height: 22px;
            .num {
                font-size: 20px;
                font-weight: bold;
                margin-right: 10px;
            }
        }
        .teacher-name {
            font-size: 22px;
            font-weight: bold;
            color: #000;
        }
    }
    .invite-btn {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 12px 20px;
    }
}
.min-images {
    min-height: 150px;
    min-width: 100%;
    background: #ececec;
}
.tm-bage {
    color: #bb2133;
    position: absolute;
    font-size: 26px;
    margin-left: 10px;
    display: inline-block;
    text-align: center;
}
.mm {
    margin: 0;
    margin-top: 8px;
}
.m-10 {
    margin: 6px 0;
}
.el-card__body {
    padding: 0;
}
</style>
