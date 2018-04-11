<template>
    <div>
        <div class="tm-card">
            <Table :loading="loading" :data="data" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    width="120px"
                    :formatter="formatAttr"
                    label="邀约发起者"
                    :filters="[{text: '演讲者', value: '演讲者'}, {text: '学校', value: '学校'}]"
                    :filter-method="filterFromSide"
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
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题">
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
                    prop="speakDuration"
                    align="center"
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
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';

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
            attrs
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
    components: { MessageBox, Table },
    computed: {
        ...mapState({
            data: state => state.search.data,
            loading: state => state.search.tableLoading
        })
    },
    methods: {
        dateformat,
        formatAttr,
        ...mapMutations(['updateValue', 'getPageData', 'formSubmit']),
        filterFromSide(value, row, column) {
            const property = column['property'];
            return attrs[property][row[property]] === value;
        }
    }
};
</script>


