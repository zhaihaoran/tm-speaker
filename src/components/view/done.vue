<template>
    <div>
        <Search :searchConfig="searchConfig" ></Search>
        <div class="tm-card">
            <el-table :data="listData" border class="tm-table" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    label="邀约发起者">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.fromSide === '学校' ? 'primary' : 'success'"
                        close-transition>{{scope.row.fromSide}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    label="演讲者">
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
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    prop="ct"
                    align="center"
                    label="发起邀约时间">
                </el-table-column>
                <el-table-column
                    prop="reason"
                    align="center"
                    label="拒絕原因">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showReason(scope.row.reason)" >查看原因</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Search from '@layout/search.vue';
import MessageBox from '@layout/modal/message.vue';
import mapsAttr from '@comp/lib/api_maps.js';

export default {
    data() {
        return {
            searchConfig: {
                input: [973822200000, 973908600000],
                category: 'right'
            },
            listData: [
                {
                    fromSide: mapsAttr['fromSide'][2],
                    speakerName: 'zhaiharoan',
                    speakTitle: '电影人的梦想',
                    speakTimestamp: '2017-12-12 12:12',
                    speakDuration: 60,
                    ct: '2015-12-12 12:12',
                    chatUnreadQuantity: 5, // 对话信息数
                    reason: '不开心'
                },
                {
                    fromSide: mapsAttr['fromSide'][1],
                    speakerName: 'zhaiharoan',
                    speakTitle: '电影人的梦想',
                    speakTimestamp: '2017-12-12 12:12',
                    speakDuration: 60,
                    ct: '2015-12-12 12:12',
                    chatUnreadQuantity: 5, // 对话信息数
                    reason: '不开心'
                }
            ]
        };
    },
    components: { Search, MessageBox },
    methods: {
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        }
    }
};
</script>


