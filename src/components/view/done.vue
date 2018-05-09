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
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    width="120px"
                    :formatter="formatAttr"
                    label="邀约发起者"
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
                    :show-overflow-tooltip="true"
                    align="center"
                    label="演讲主题">
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
                    prop="speakDuration"
                    align="center"
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
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';
import Pagination from '@layout/pagination.vue';
import Search from '@layout/search.vue';
import TimeRange from '@layout/timerange.vue';

import { commonPageInit } from '@comp/lib/api_maps.js';
import common_mixin from '@comp/mixin/common';

export default {
    mixins: [common_mixin],
    data() {
        return {
            searchCfg: {
                act: 'getAppointmentList',
                status: 3,
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            }
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 3 },
            {
                act: 'getAppointmentList',
                status: 3
            }
        );
    },
    components: {
        MessageBox,
        Table,
        Pagination,
        Search,
        TimeRange
    }
};
</script>


