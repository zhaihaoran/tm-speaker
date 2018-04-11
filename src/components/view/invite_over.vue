<template>
    <div>
        <div class="tm-card">
            <Table :loading="loading"  :data="data" >
                <el-table-column
                    align="center"
                    prop="schoolName"
                    label="学校姓名"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTitle"
                    label="演讲主题"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTimestamp"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakDuration"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addTimestamp"
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
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            attrs,
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
    computed: {
        ...mapState({
            data: state => state.search.data,
            loading: state => state.search.tableLoading
        })
    },
    methods: {
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal'
        ]),
        handleEdit(index, row) {
            this.showModal(row);
        }
    },
    components: {
        Operation,
        MessageBox,
        Table,
        EditInvite
    }
};
</script>


