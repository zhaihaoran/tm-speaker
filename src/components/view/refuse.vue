<template>
    <div>
        <Search :cfg="searchCfg" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" placeholder="搜索关键字" v-model="searchCfg.searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :data="data" >
                <el-table-column
                    prop="schoolName"
                    align="center"
                    label="学校">
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    :show-overflow-tooltip="true"
                    align="center"
                    label="演讲主题">
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    width="140px"
                    align="center"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）" width="80">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    width="140px"
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
                        <MessageBox :canSend="false" :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
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
import Pagination from '@layout/pagination.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
export default {
    data() {
        return {
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                status: 4,
                fromSide: 2,
                searchText: ''
            }
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
    components: { Search, MessageBox, Table, Pagination },
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
        }
    }
};
</script>

