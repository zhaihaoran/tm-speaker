<template>
    <div>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div @keyup.native.enter="handleSearch" class="search-input">
                    <TimeRange></TimeRange>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag
                        :type="handleRendorState(scope.row,'tags')"
                        close-transition>
                        {{handleRendorState(scope.row,'text')}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="发起者"
                >
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.fromSide == 1 ? 'primary' : 'success'"
                        close-transition>{{attrs["fromSide"][scope.row.fromSide]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="schoolName"
                    align="center"
                    label="学校">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.schoolName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    :show-overflow-tooltip="true"
                    label="演讲主题">
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
                    width="140px"

                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）" width="80"
                    >
                    <template slot-scope="scope">
                        {{secToMin(scope.row.speakDuration)}}
                    </template>
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
                    prop="schoolStatus"
                    align="center"
                    width="220px"
                    label="学校进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="popover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.schoolStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="待课后反馈提交"></el-step>
                                <el-step title="待课后反馈确认"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:popover >{{attrs["schoolStatus"][scope.row.schoolStatus]}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    min-width="120px"
                    label="梦享者进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="popovers" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.speakerStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:popovers >{{attrs["speakerStatus"][scope.row.speakerStatus]}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reason"
                    align="center"
                    label="拒绝原因">
                    <template slot-scope="scope">
                        <el-button  v-show="scope.row.status == 4" type="text" @click="showReason(scope.row)" >查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :canSend="+scope.row.status === 1" :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="180px"
                    label="操作">
                    <template slot-scope="scope" >
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
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    toSchoolHome,
    secToMin,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import Pagination from '@layout/pagination.vue';
import Operation from '@layout/operation.vue';
import EditInvite from '@layout/modal/editInvite.vue';
import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
import TimeRange from '@layout/timerange.vue';

export default {
    data() {
        return {
            attrs,
            currentId: '',
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            },
            form: {},
            modal: false
        };
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            perPage: state => state.search.perPage,
            status: state => state.search.status
        })
    },
    components: {
        Search,
        Operation,
        MessageBox,
        EditInvite,
        Table,
        TimeRange,
        Pagination
    },
    mounted() {
        commonPageInit(
            this,
            { status: 0 },
            {
                act: 'getAppointmentList',
                status: 0
            }
        );
    },
    methods: {
        formatAttr,
        toSchoolHome,
        secToMin,
        dateformat,
        ...mapMutations([
            'clearSearchOps',
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getRejectDesc'
        ]),

        /* 渲染状态 */
        handleRendorState(obj, type) {
            let state = obj.status + obj.fromSide || '11';
            return this.attrs['status'][state][type];
        },

        handleEdit(index, row) {
            this.showModal(row);
        },

        showReason(obj) {
            this.getRejectDesc({
                act: 'getRejectDescOfAppointment',
                appointmentId: obj.appointmentId,
                onSuccess: res => {
                    this.$alert(res.data.data.rejectDesc, '拒绝原因', {
                        confirmButtonText: '关闭'
                    }).catch(() => {});
                }
            });
        },
        // 学校预览照片，并可以上传
        handleShowImage(row) {
            this.modal = true;
            this.currentId = row.appointmentId;
            this.getFeedList({
                act: 'getFeedbackList',
                appointmentId: row.appointmentId
            });
        },

        handleClose() {
            this.modal = false;
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
        }
    }
};
</script>


