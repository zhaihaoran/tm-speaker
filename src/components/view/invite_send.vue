<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" placeholder="搜索关键字" v-model="searchCfg.searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card center" v-show="data.length<1" >
            <img :src="emptyImage" class="img-fluid" alt="empty">
        </div>
        <div v-for="school in data" :key="school.$index" class="tm-card in-card">
            <a :href="handleHomePage(school.schoolId)" class="card-image">
                <img :src="school.photoUrl" class="min-images img-fluid" :alt="school.schoolName">
            </a>
            <div class="card-wrapper">
                <p class="no-margin">
                    <span class="teacher-name" >{{school.name}}</span>
                    <span v-show="+isPoor>0" class="tm-bage">穷</span>
                </p>
                <p class="mm" >{{school.schoolShortDesc}}</p>
                <p class="m-10" ><span class="num tm-text-color" >{{school.finishedClass}}</span> 开课数</p>
                <p class="no-margin text-overflow" >简介：{{school.schoolDesc}}</p>
            </div>
            <el-button @click="handleEdit(school)" class="tm-btn invite-btn">邀约</el-button>
        </div>
        <!-- edit -->
        <EditInvite title="发起邀约" ></EditInvite>
        <el-card class="text-center" >
            <Pagination classes="center" :cfg="searchCfg" :count="count" ></Pagination>
        </el-card>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Pagination from '@layout/pagination.vue';
import EditInvite from '@layout/modal/Send_invite.vue';
import Search from '@layout/search.vue';

import emptyImage from '@image/empty.png';

export default {
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
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            data: state => state.search.data,
            count: state => state.search.count,
            loading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage
        })
    },
    components: {
        Search,
        EditInvite,
        Pagination
    },
    mounted() {
        this.getPageData({
            act: 'getSchoolList',
            onError: res => {},
            onSuccess: res => {
                console.log(res);
            }
        });
    },
    methods: {
        ...mapMutations(['getPageData', 'showModal', 'formSubmit']),
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
        overflow: hidden;
    }
    .card-wrapper {
        flex: 1;
        color: #6e6e6e;
        padding-left: 20px;
        max-width: 740px;
        p {
            max-height: 66px;
            line-height: 26px;
            .num {
                font-size: 20px;
                font-weight: bold;
                margin-right: 10px;
            }

            .teacher-name {
                font-size: 22px;
                font-weight: bold;
                color: #000;
                margin-right: 20px;
            }
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
    background: #bb2133;
    color: #fff;
    padding: 3px;
    width: 20px;
    margin-left: 5px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
}
.mm {
    margin: 0;
    margin-top: 5px;
}
.m-10 {
    margin: 5px 0;
}
</style>
