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
                    <TimeRange></TimeRange>
                </div>
            </template>
        </Search>
        <div class="tm-card" :loading="tableLoading" >
            <Table :data="data" >
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
                    prop="reason"
                    align="center"
                    label="拒绝原因">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showReason(scope.row)" >查看</el-button>
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
import { commonPageInit } from '@comp/lib/api_maps.js';
import common_mixin from '@comp/mixin/common';

import Search from '@layout/search.vue';
import Pagination from '@layout/pagination.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
import TimeRange from '@layout/timerange.vue';

export default {
    mixins: [common_mixin],
    data() {
        return {
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                status: 4,
                fromSide: 2,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
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
    components: { Search, MessageBox, Table, Pagination, TimeRange },
    methods: {
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
        }
    }
};
</script>

