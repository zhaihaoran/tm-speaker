<template>
    <div>
        <div v-show="checkState === 1" class="tm-card invite-send certifi-info">
            <div class="card-image">
                <img :src="cerrifi_check" class="img-fluid" alt="hi">
            </div>
            <div class="card-wrapper">
                <h2>欢迎申请途梦学校</h2>
                <p>完成认证信息，即可提交申请途梦学校，您的学校有机会获得各行各业志愿者的演讲分享服务，让孩子们提前了解他们梦想的世界</p>
            </div>
        </div>
        <el-alert
            v-show="checkState === 4"
            title="您提交的资料被驳回"
            show-icon
            :description="rejectDesc"
            class="mb-20"
            type="error">
        </el-alert>
        <div class="tm-card info-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <h3>梦享家基本信息</h3>
                <el-form-item label="姓名" prop="name" >
                    <el-input :disabled="isDisabled" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" >
                    <el-radio-group :disabled="isDisabled" size="small" v-model="form.sex">
                        <el-radio-button label="1">男</el-radio-button>
                        <el-radio-button label="2">女</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="公司/机构名称" prop="company" >
                    <el-input :disabled="isDisabled" v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="工作岗位" prop="title" >
                    <el-input :disabled="isDisabled" v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat" >
                    <el-input :disabled="isDisabled" v-model="form.wechat"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" >
                    <el-input :disabled="isDisabled" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" >
                    <el-input :disabled="isDisabled" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址" prop="address" >
                    <el-input :disabled="isDisabled" v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="可分享时间段描述" prop="idleTimeDesc" >
                    <el-input :rows="rows"  :disabled="isDisabled" class="info-textarea" type="textarea" v-model="form.idleTimeDesc"></el-input>
                </el-form-item>

                <el-form-item label="演讲内容是否公开">
                    <el-switch
                        :disabled="isDisabled"
                        v-model="form.showVideoOnSite"
                        active-value="1"
                        inactive-value="0"
                    >
                    </el-switch>
                    <span class="left-info" >是否愿意将演讲视频在途梦平台上公开展示</span>
                </el-form-item>
                <el-form-item label="您的图片" props="pic1" >
                    <Upload filepathname="photoShortPathFilename" previewname="photoUrl" :action="Api.upload" :preview="photoUrl" :disabled="isDisabled" ></Upload>
                    <div v-show="!isDisabled" class="pic-info">
                        <h3>请拍摄能够清晰的看到正脸的照片</h3>
                        <p class="info-p">图片类型：JPG、PNG</p>
                        <p class="info-p">图片大小：不超过5M</p>
                        <h3 class="mm">样例</h3>
                        <img :src="schoolDemo" class="img-fluid" alt="demo">
                    </div>
                </el-form-item>

                <div class="individar"></div>
                <h3>附加信息</h3>
                <el-form-item label="教育背景"  >
                    <el-input :disabled="isDisabled" type="textarea" :rows="rows" class="info-textarea"  v-model="form.educationBackground"></el-input>
                </el-form-item>
                <el-form-item label="介绍人">
                    <el-input :disabled="isDisabled" v-model="form.inviter"></el-input>
                </el-form-item>
                <el-form-item class="why-label" label="为什么申请途梦梦享家">
                    <el-input :disabled="isDisabled" type="textarea" :rows="rows" class="info-textarea" v-model="form.whyChooseUs"></el-input>
                </el-form-item>
                <el-form-item label-width="0"  >
                    <el-checkbox :disabled="isDisabled" v-model="isCheck" >我已阅读并同意途梦 </el-checkbox><a class="tm-a" @click="modal.rules=true" > 用户规约</a>
                </el-form-item>
                <div v-if="!isDisabled">
                    <el-button class="tm-border" @click="onSave('form')">保存文件</el-button>
                    <el-button type="primary" @click="onSubmit('form')">提交审核</el-button>
                </div>
            </el-form>
            <!-- modal -->
            <el-dialog v-if="!isDisabled" width="30%" class="certi-submit-modal" :visible.sync="modal.submit" >
                <span class="submit-modal"><i class="icon iconfont icon-submit"></i></span>
                <h3>梦享家申请提交成功</h3>
                <p>感谢您申请加入途梦梦享家</p>
                <p>我们将会尽快审核您的资料</p>
                <p>通过审核后您将可以进行演讲分享</p>
                <p>您可以随时登陆个人中心查看审核进展</p>
                <span slot="footer" class="tm-modal-footer">
                    <a href="/" class="tm-btn" >去首页看看</a>
                </span>
            </el-dialog>
            <!-- 用户规约 -->
            <el-dialog width="50%" center :visible.sync="modal.rules" title="用户规约" >
                <div class="rules-context">
                    hahaha
                </div>
                <span slot="footer">
                    <el-button class="tm-btn-border" @click="modal.rules=false">关闭</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { Api } from '@comp/lib/api_maps';

import cerrifi_check from '@image/admin/cerrifi_check.png';
import schoolDemo from '@image/admin/class.png';

import Upload from '@layout/upload.vue';
export default {
    data() {
        return {
            Api,
            rejectDesc: '',
            modal: {
                submit: false,
                rules: false
            },
            rows: 8,
            form: {
                sex: 1
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入梦享家名称',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'blur'
                    }
                ],
                company: [
                    {
                        required: true,
                        message: '请输入机构名称',
                        trigger: 'blur'
                    }
                ],
                title: [
                    {
                        required: true,
                        message: '请填写您的岗位',
                        trigger: 'blur'
                    }
                ],
                wechat: [
                    {
                        required: true,
                        message: '请填写您的微信号',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入联系方式',
                        trigger: 'blur'
                    }
                ],
                idleTimeDesc: [
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: '必须勾选',
                        trigger: 'change'
                    }
                ]
            },
            cerrifi_check,
            schoolDemo,
            isOk: false
        };
    },
    computed: {
        ...mapState({
            checkState: state => state.common.checkState,
            photoUrl: state => state.upload.photoUrl,
            photoShortPathFilename: state =>
                state.upload.photoShortPathFilename,
            // 动态绑定disabled
            isDisabled() {
                return this.checkState === 3;
            }
        }),
        isCheck: {
            set(value) {
                this.isOk = !this.isOk;
            },
            get() {
                return this.isDisabled ? !this.isOk : this.isOk;
            }
        }
    },
    mounted() {
        this.getFormData({
            act: 'getApplication',
            onSuccess: res => {
                /* sex 传回来应该为1 */
                this.form = res.data.data;
                this.rejectDesc = `您提交的资料被驳回，原因：${
                    this.form.rejectDesc
                }`;

                const { photoShortPathFilename, photoUrl } = this.form;

                this.update({
                    photoShortPathFilename,
                    photoUrl
                });
            },
            onError: res => {
                if (res.data.code === 212) {
                    this.form = {};
                }
            }
        });
    },
    methods: {
        ...mapMutations(['getFormData', 'formSubmit', 'update']),
        handleForm(form, action, onSuccess, onError) {
            const cfg = Object.assign(this.form, {
                photoShortPathFilename: this.photoShortPathFilename
            });

            delete cfg.photoUrl;
            delete cfg.rejectDesc;

            this.$refs[form].validate(valid => {
                if (valid && this.isCheck) {
                    const data = {
                        act: action,
                        ...cfg,
                        isMessage: false,
                        onSuccess,
                        onError
                    };
                    this.formSubmit(data);
                } else {
                    this.$message({
                        showClose: true,
                        message: '格式有问题，请重试',
                        type: 'error'
                    });
                    return false;
                }
            });

            return cfg;
        },
        onSubmit(form) {
            this.handleForm(
                form,
                'submitApplication',
                res => {
                    this.modal.submit = true;
                },
                res => {}
            );
        },
        onSave(form) {
            this.handleForm(form, 'modifyApplication');
        }
    },
    components: {
        Upload
    }
};
</script>
<style lang="scss" scoped >
.el-dialog__wrapper.certi-submit-modal {
    p {
        margin: 0;
        text-align: center;
    }
    h3 {
        text-align: center;
    }
    .submit-modal {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        i {
            font-size: 55px;
            color: rgb(116, 189, 184);
        }
    }
}

.pic-info {
    width: 150px;
    position: absolute;
    top: 0;
    left: 400px;
}
.pic-info > h3 {
    margin: 0;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 10px;
}
.pic-info > .mm {
    margin-top: 10px;
}

.info-box {
    .el-input {
        max-width: 600px;
    }
    .el-form {
        padding: 10px 30px;
    }
    .info-p {
        margin: 0;
        font-size: 14px;
        line-height: 25px;
        color: #606266;
    }

    .info-h3 {
        font-weight: bold;
    }

    .info-h5 {
        font-weight: bold;
        font-size: 16px;
        line-height: 25px;
        margin: 0;
    }

    .info-textarea {
        max-width: 600px;
    }
}

.info-table {
    display: flex;
    margin: 25px 0;
    max-width: 800px;
    .info-table-col {
        display: flex;
        flex-direction: column;
        flex: 1;
        > div {
            justify-content: center;
            align-items: center;
            display: flex;
            border: 1px solid #e2e2e2;
            flex-direction: column;
        }
        .cube {
            flex: 1;
            height: 110px;
            p,
            .el-radio-group {
                width: 100%;
                padding-left: 60px;
            }
        }
        .cube-big {
            flex: 2;
            height: 220px;
        }
    }
}

.certifi-info.invite-send {
    background: rgb(249, 242, 232);
    border: 1px solid #e97a50;
}

.certifi-info.invite-send .card-image {
    display: flex;
    width: auto;
    padding: 10px;
    align-items: center;
    justify-content: center;
}

.certifi-info.invite-send .card-wrapper p {
    max-width: 750px;
    line-height: 28px;
    margin-top: 10px;
}
.certifi-info.invite-send .card-wrapper h2 {
    margin-bottom: 10px;
}
.invite-send.tm-card {
    display: flex;
    flex-direction: row;
}
.invite-send .card-image {
    width: 160px;
    overflow: hidden;
}
.invite-send .card-wrapper {
    flex: 1;
    color: #6e6e6e;
    padding-left: 20px;
}
.invite-send .card-wrapper p {
    max-height: 66px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.invite-send .card-wrapper p .num {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
}

.invite-send .card-wrapper p .teacher-name {
    font-size: 22px;
    font-weight: bold;
    color: #000;
    margin-right: 20px;
}

.rules-context {
    padding: 20px;
    background: #f5f7fa;
    overflow-x: hidden;
    overflow-y: auto;
    height: 400px;
}
</style>


