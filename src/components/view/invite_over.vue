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
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    align="center"
                    prop="schoolName"
                    label="学校姓名"
                    fixed
                    >
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="toSchoolHome(scope.row.schoolId)">{{scope.row.schoolName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTitle"
                    fixed
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
                <el-table-column align="center" width="180px" label="操作">
                    <template slot-scope="scope">
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>
            <!-- edit -->
            <EditInvite></EditInvite>
        </div>
    </div>
</template>
<script>
import { commonPageInit } from '@comp/lib/api_maps.js';
import common_mixin from '@comp/mixin/common';

import Operation from '@layout/operation.vue';
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';
import EditInvite from '@layout/modal/editInvite.vue';

export default {
    mixins: [common_mixin],
    data() {
        return {
            form: {},
            modal_edit: false
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 1, fromSide: 2 },
            {
                act: 'getAppointmentList',
                status: 1,
                fromSide: 2
            }
        );
    },
    components: {
        Operation,
        MessageBox,
        Table,
        EditInvite
    }
};
</script>


