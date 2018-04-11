<template>
    <div>
        <div class="tm-card">
            <Table :loading="loading" :data="data" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="邀约发起者"
                    width="120px"
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
                    prop="speakTimestamp"
                    align="center"
                    sortable
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
                    prop="schoolStatus"
                    align="center"
                    min-width="120px"
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
                        <!-- <el-button type="text" v-if="scope.row.schoolStatus === 3"  ><span v-popover:popover >待课后反馈提交</span><span  > </span></el-button> -->
                        <el-button type="text" v-popover:popover >{{attrs["schoolStatus"][scope.row.schoolStatus]}} <span class="normal-a" @click.stop.prevent='handleShowImage(scope.row)' v-if="scope.row.schoolStatus == 3" >(立即上传）</span> </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    min-width="120px"
                    label="演讲者进展">
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
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
            </Table>
            <!-- 反馈 -->
            <el-dialog :visible.sync="modal.upload" title="查看反馈" >
                <el-dialog append-to-body :visible.sync="modal.image" >
                    <img width="100%" :src="modal.imageUrl" alt="">
                </el-dialog>
                <el-upload
                    class="upload-box"
                    action=""
                    :on-change="handleChange"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    :limit="3"
                    list-type="picture-card"
                    :on-exceed="handleExceed"
                    :file-list="feedList">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span slot="footer" class="dialog-footer center">
                    <el-button @click="handleSubmitFeedList" type="primary" >提交反馈</el-button>
                </span>
            </el-dialog>
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
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';

export default {
    components: {
        MessageBox,
        Table
    },
    data() {
        return {
            currentId: '',
            attrs,
            modal: {
                upload: false,
                imageUrl: '',
                image: false
            }
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 2 },
            {
                act: 'getAppointmentList',
                status: 2
            }
        );
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            loading: state => state.search.tableLoading,
            feedList: state => state.search.feedList
        })
    },
    methods: {
        dateformat,
        formatAttr,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'getFeedList',
            'photoUpload'
        ]),
        filterFromSide(value, row, column) {
            const property = column['property'];
            return attrs[property][row[property]] === value;
        },
        handleRemove(file, fileList) {
            console.log('remove');
            console.log(file, fileList);
        },
        /* 上传照片 */
        handleChange(file) {
            let formCfg = new FormData();
            formCfg.append('act', 'uploadFeedback');
            formCfg.append('appointmentId', this.currentId);
            formCfg.append('file', file.raw);
            this.photoUpload({
                formCfg,
                onSuccess: res => {
                    this.updateValue({
                        feedList: feedList.push(res.data.data)
                    });
                },
                onError: res => {
                    console.log('error', res);
                }
            });
        },
        // 学校预览照片，并可以上传
        handleShowImage(row) {
            this.modal.upload = true;
            this.currentId = row.appointmentId;
            this.getFeedList({
                act: 'getFeedbackList',
                appointmentId: row.appointmentId
            });
        },
        handlePreview(file) {
            this.ImageUrl = file.url;
            this.Visible = true;
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleSubmitFeedList() {
            this.formSubmit({
                act: 'submitFeedback',
                appointmentId: this.currentId
            });
        }
    }
};
</script>
<style>
.normal-a {
    color: #409eff;
}
.pic-cube {
    margin: 5px 0;
}
</style>


