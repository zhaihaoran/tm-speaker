<template>
    <div>
        <Search :search="handleSearch" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" placeholder="搜索关键字" v-model="searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div v-for="person in data" :key="person.$index" class="tm-card in-card">
            <a href="/home_lecturer.html" class="card-image">
                <img :src="person.image" class="img-fluid" alt="">
            </a>
            <div class="card-wrapper">
                <p class="no-margin" ><span class="teacher-name" >{{person.name}}</span>{{person.info}}</p>
                <p>
                    <span class="num tm-text-color" >{{person.invitenum}}</span>邀约数
                    <span class="num tm-text-color" style="margin-left:20px;" >{{person.contrinum}}</span>贡献人次
                </p>
                <p class="no-margin text-overflow" >简介：{{person.description}}</p>
            </div>
            <el-button @click="handleEdit(person)" class="tm-btn invite-btn">邀约</el-button>
        </div>
        <!-- edit -->
        <EditInvite title="发起邀约" ></EditInvite>
        <el-card class="text-center" >
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="perPage"
                layout="total, prev, pager, next"
                :total="count"
                class="offer-pagination"
            >
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import EditInvite from '@layout/modal/sendInvite.vue';
import Search from '@layout/search.vue';
export default {
    data() {
        return {
            searchText: ''
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
        EditInvite
    },
    mounted() {
        const data = {
            act: 'getSpeakerList',
            onError: res => {},
            onSuccess: res => {
                console.log(res);
            }
        };
        this.getPageData(data);
    },
    methods: {
        ...mapMutations(['getPageData', 'showModal', 'formSubmit']),
        handleEdit(row) {
            const obj = {
                speakerId: row.speakerId,
                speakerName: row.name,
                speakDuration: '',
                speakerTitle: '',
                speakTimestamp: 0,
                addTimestamp: 0
            };
            this.showModal(obj);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleInvite({ speakerId, speakTitle, speakTimestamp, speakDuration }) {
            // 发起邀约 --- 参数对不上？ 为什么要传其他东西，不只需要id
            const cfg = {
                act: 'createAppointment',
                speakerId,
                speakTitle,
                speakTimestamp,
                speakDuration
            };
            this.formSubmit(cfg);
        },
        handleSearch() {
            const data = {
                act: 'getSpeakerList',
                orderType: this.orderType,
                searchText: this.searchText,
                page: this.page,
                perPage: this.perPage,
                onError: res => {
                    console.log('success');
                },
                onSuccess: res => {}
            };
            this.getPageData(data);
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
