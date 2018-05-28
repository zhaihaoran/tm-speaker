<template>
    <div class="cell" >
        <div v-if="scope.row.status == 1 && scope.row.fromSide == 2" >
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
            <el-button size="mini" class="tm-btn-border" @click="handledelete(scope.row)" >删除</el-button>
        </div>
        <div v-if="scope.row.status == 1 && scope.row.fromSide == 1" >
            <el-button size="mini" type="danger" class="tm-btn" @click="modal.agree=true" >同意</el-button>
            <el-button size="mini" class="tm-btn-border" @click="modal.refuse=true" >拒绝</el-button>
        </div>

        <!-- modal -->
        <el-dialog
            :visible.sync="modal.agree"
            width="30%"
            >
            <h3 class="text-center modal-title" >你确定同意邀约吗？</h3>
            <span>同意邀约后，邀约信息将进入"进行中"列表，途梦平台工作人员将会联系您和梦享家处理进一步事宜</span>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.agree=false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleOk(scope.$index,scope.row)" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="modal.refuse"
            width="30%"
            class="refuse-dialog"
        >
            <h3 class="text-center modal-title" >确定拒绝邀约吗？</h3>
            <span class="r-title" >请填写拒绝原因，用于告知邀请者</span>
            <el-form ref="form" >
                <el-form-item class="no-margin" >
                    <el-input type="textarea" v-model="rejectDesc" class="tm-textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="tm-modal-footer">
                <el-button class="tm-btn-border" @click="modal.refuse = false">取 消</el-button>
                <el-button class="tm-btn" type="primary" @click="handleRefuse(scope.$index,scope.row)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            modal: {
                agree: false,
                delete: false,
                refuse: false
            },
            rejectDesc: ''
        };
    },
    props: ['scope', 'handleEdit'],
    methods: {
        ...mapMutations(['deleteSubmit', 'Ok', 'refuse']),
        handleOk(index, obj) {
            this.modal.agree = false;
            this.Ok({
                act: 'acceptAppointment',
                appointmentId: obj.appointmentId
            });
        },
        handleRefuse(index, obj) {
            this.modal.refuse = false;
            this.refuse({
                act: 'rejectAppointment',
                appointmentId: obj.appointmentId,
                rejectDesc: this.rejectDesc
            });
        },
        handledelete(obj) {
            this.$confirm('您确认要删除此次邀约?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteSubmit({
                        act: 'removeAppointment',
                        appointmentId: obj.appointmentId
                    });
                })
                .catch(() => {});
        }
    }
};
</script>
<style>
.refuse-dialog .el-dialog__body {
    padding: 10px 30px;
}
.refuse-dialog span.r-title {
    display: inline-block;
    margin-bottom: 10px;
}
</style>
