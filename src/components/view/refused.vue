<template>
    <div>
        <Search :search="handleSearch" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" placeholder="搜索关键字" v-model="searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :is-pagination="false" :data="data" >
                <el-table-column
                    prop="school"
                    align="center"
                    label="学校">
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题">
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    align="center"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reason"
                    align="center"
                    label="拒绝原因">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showReason(scope.row)" >查看原因</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
            </Table>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
export default {
    data() {
        return {
            searchText: ''
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 4, fromSide: 1 },
            {
                act: 'getAppointmentList',
                status: 4,
                fromSide: 1
            }
        );
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
    components: { Search, MessageBox, Table },
    methods: {
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'getRejectDesc'
        ]),
        showReason(obj) {
            this.getRejectDesc({
                act: 'getRejectDescOfAppointment',
                appointmentId: obj.appointmentId,
                onSuccess: res => {
                    console.log('success', res);
                    this.$alert(res.data.data.rejectDesc, '拒绝原因').catch(
                        () => {}
                    );
                }
            });
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

