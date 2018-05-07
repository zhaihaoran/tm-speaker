<template>
    <div>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <TimeRange></TimeRange>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    align="center"
                    prop="schoolName"
                    label="学校"
                    >
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.schoolName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTitle"
                    :show-overflow-tooltip="true"
                    label="演讲主题"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTimestamp"
                    width="140px"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakDuration"
                    label="演讲时长（分钟）" width="80">
                    <template slot-scope="scope">
                        {{secToMin(scope.row.speakDuration)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addTimestamp"
                    width="140px"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column label="消息" prop="messages"  align="center" >
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="学校进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="schoolpopover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.schoolStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="待课后反馈提交"></el-step>
                                <el-step title="待课后反馈确认"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:schoolpopover >
                            {{attrs['schoolStatus'][scope.row.schoolStatus]}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="180px" label="操作">
                    <template slot-scope="scope">
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
            <!-- edit -->
            <EditInvite></EditInvite>
        </div>
    </div>
</template>
<script>
import Operation from '@layout/operation.vue';
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';
import EditInvite from '@layout/modal/editInvite.vue';
import Pagination from '@layout/pagination.vue';
import Search from '@layout/search.vue';
import TimeRange from '@layout/timerange.vue';
import {
    attrs,
    formatAttr,
    toSchoolHome,
    secToMin,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            attrs,
            form: {},
            modal_edit: false,
            searchCfg: {
                act: 'getAppointmentList',
                status: 1,
                fromSide: 1,
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            }
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 1, fromSide: 1 },
            {
                act: 'getAppointmentList',
                status: 1,
                fromSide: 1
            }
        );
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            tableLoading: state => state.search.tableLoading,
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            count: state => state.search.count,
            status: state => state.search.status
        })
    },
    methods: {
        toSchoolHome,
        secToMin,
        dateformat,
        ...mapMutations([
            'clearSearchOps',
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal'
        ]),
        handleEdit(index, row) {
            this.showModal(row);
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
        }
    },
    components: {
        Operation,
        MessageBox,
        Table,
        EditInvite,
        Pagination,
        Search,
        TimeRange
    }
};
</script>


