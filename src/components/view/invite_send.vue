<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" placeholder="搜索关键字" v-model="searchCfg.searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div v-for="school in data" :key="school.$index" class="tm-card in-card">
            <a href="/home_lecturer.html" class="card-image">
                <img :src="school.photoUrl" class="img-fluid" :alt="school.schoolName">
            </a>
            <div class="card-wrapper">
                <p class="no-margin" >{{school.name}}</p>
                <p class="no-margin" >{{school.schoolShortDesc}}</p>
                <p class="no-margin" ><span class="num tm-text-color" >{{school.finishedClass}}</span> 演讲者开课数</p>
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

export default {
    data() {
        return {
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
            line-height: 22px;
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
        padding: 12px 26px;
    }
}
</style>
