<template>
    <div>
        <el-dialog
            :visible.sync="modal"
            :title="title"
            width="500px"
            :close-on-click-modal="false"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="学校名称" >
                    <span>{{form.name}}</span>
                </el-form-item>
                <el-form-item label="演讲主题" >
                    <el-input placeholder="演讲主题" v-model="form.speakTitle" ></el-input>
                </el-form-item>
                <el-form-item label="演讲时间" >
                    <el-date-picker
                        v-model="timestamp"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        :picker-options="pickerOptions"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="演讲时长" >
                    <el-input type="number" v-model="d_duration" >
                        <template slot="append">分钟</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn" type="primary" @click="handleSubmitForm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 邀约成功 dialog -->
        <el-dialog
            :visible.sync="isSuccess"
            class="invite-success"
            width="30%"
            center
        >
            <div class="title">
                <h3>邀约已发出，等待学校同意</h3>
                <p>您可以关闭窗口继续邀约或查看发出的邀约信息</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isSuccess=false">关闭</el-button>
                <el-button type="primary" @click="$router.push({
                    path: '/invite/over'
                })">查看邀约</el-button>
            </span>
        </el-dialog>
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

export default {
    data() {
        return {
            // 可选择范围 一周后
            pickerOptions: {
                disabledDate(time) {
                    return (
                        time.getTime() <
                        Date.now() + 3600 * 1000 * 24 * 7 - 8.64e6
                    );
                }
            },
            isSuccess: false,
            timestamp: '',
            d_duration: ''
        };
    },
    watch: {
        speakTimestamp(val) {
            this.timestamp = !!val ? new Date(+val * 1000) : '';
        },
        duration(val = 0) {
            this.d_duration = val / 60;
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            form: state => state.modal.form,
            modal: state => state.modal.modal,
            duration: state => state.modal.duration
        })
    },
    methods: {
        ...mapMutations(['formSubmit', 'setDateValue', 'closeModal']),
        dateformat,
        handleSubmitForm() {
            /* 必须全部填满值才可以提交 */
            if (this.form.speakTitle && this.timestamp && this.d_duration) {
                if (this.form.speakTitle.length > 25) {
                    this.$message({
                        showClose: true,
                        message: '演讲标题长度不能超过25个字',
                        type: 'warning'
                    });
                    return false;
                }
                this.formSubmit({
                    act: 'createAppointment',
                    schoolId: this.form.schoolId,
                    speakTitle: this.form.speakTitle,
                    speakTimestamp: Math.floor(
                        new Date(this.timestamp).getTime() / 1000
                    ),
                    speakDuration: this.d_duration * 60,
                    isMessage: false,
                    onSuccess: res => {
                        this.isSuccess = true;
                        this.handleClose();
                    },
                    onError: res => {
                        this.$message({
                            showClose: true,
                            message: codes[res.data.code],
                            type: 'warning'
                        });
                    }
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '请填写相关信息，不可空缺',
                    type: 'warning'
                });
            }
        },
        handleClose() {
            this.closeModal();
        }
    }
};
</script>
<style lang="scss" >
.invite-success .el-dialog__body {
    text-align: center;
    padding: 10px;
}
</style>


