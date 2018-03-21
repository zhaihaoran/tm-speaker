<template>
    <div>
        <div class="tm-card invite-send certifi-info">
            <div class="card-image">
                <img src="/static/image/admin/cerrifi_check.png" class="img-fluid" alt="hi">
            </div>
            <div class="card-wrapper">
                <h2>欢迎申请涂梦演讲者</h2>
                <p>完成认证信息，即可提交申请成为涂梦演讲者，分享您的知识和思考，让孩子们提前了解他们梦想的世界</p>
            </div>
        </div>
        <div class="tm-card">
            <el-form class="info-box" ref="form" :status-icon="inline" :inline-message="inline" :model="form" :rules="rules" label-width="100px">
                <h3>演讲者基本信息</h3>
                <el-form-item label="姓名" prop="name" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="name" >
                    <el-radio-group size="small" v-model="form.sex">
                        <el-radio-button label="2">男</el-radio-button>
                        <el-radio-button label="1">女</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="公司/机构名称" prop="company" >
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="工作岗位" prop="title" >
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat" >
                    <el-input v-model="form.wechat"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone" >
                    <el-input v-model="form.telephone"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址" prop="address" >
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="可分享时间段" prop="shareTime" >
                    <el-input class="info-textarea" type="textarea" v-model="form.idleTimeDesc"></el-input>
                </el-form-item>

                <el-form-item label="演讲内容公开">
                    <el-switch
                        v-model="form.showVideoOnSite"
                    >
                    </el-switch>
                    <span class="left-info" >是否愿意将演讲视频在涂梦平台上公开展示</span>
                </el-form-item>
                <el-form-item label="您的图片" props="pic1" >
                    <Upload action="/admin/act=upload#!method=POST" ></Upload>
                    <div class="pic-info">
                        <h3>请拍摄能够清晰的看到正脸的照片</h3>
                        <p class="info-p">图片类型：JPG、PNG</p>
                        <p class="info-p">图片大小：不超过5M</p>
                        <h3 class="mm">样例</h3>
                        <img src="/static/image/banner.png" class="img-fluid" alt="demo">
                    </div>
                </el-form-item>

                <div class="individar"></div>
                <h3>附加信息</h3>
                <el-form-item label="教育背景" required >
                    <el-input type="textarea" class="info-textarea"  v-model="form.educationBackground"></el-input>
                </el-form-item>
                <el-form-item label="介绍人">
                    <el-input v-model="form.inviter"></el-input>
                </el-form-item>
                <el-form-item class="why-label" label="为什么申请涂梦演讲者">
                    <el-input type="textarea" class="info-textarea" v-model="form.whyChooseUs"></el-input>
                </el-form-item>
                <el-form-item prop="radio" label-width="0" required >
                    <el-checkbox v-model="form.radio"> 我已阅读并同意涂梦 <a class="tm-a" href="#">用户规约</a></el-checkbox>
                </el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交审核</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form>
            <el-dialog width="30%" class="certi-submit-modal" :visible.sync="modal.submit" >
                <span class="submit-modal"><i class="icon iconfont icon-submit"></i></span>
                <h3>演讲者申请提交成功</h3>
                <p>感谢您申请加入涂梦演讲者</p>
                <p>我们将会尽快审核您的资料</p>
                <p>通过审核后您将可以进行演讲分享</p>
                <p>您可以随时登陆个人中心查看审核进展</p>
                <span slot="footer" class="tm-modal-footer">
                    <a href="/" class="tm-btn" >去首页看看</a>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Upload from '@layout/upload.vue';
export default {
    data() {
        return {
            modal: {
                submit: false
            },
            inline: true,
            form: {
                radios: 3,
                sex: '1',
                name: '',
                region: '',
                teacher: '',
                telephone: '',
                pic1: '',
                pic2: '',
                delivery: false,
                type: [],
                resource: '',
                freeinfo: '',
                radio: true
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入学校名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }
                ],
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }
                ],
                resource: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }
                ],
                freeinfo: [
                    {
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }
                ],
                radio: [
                    {
                        required: true,
                        message: '必须勾选',
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    methods: {
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.modal.submit = true;
                } else {
                    console.log('error submit! please try agin');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    components: {
        Upload
    }
};
</script>
<style lang="scss"  scoped>
.certi-submit-modal {
    text-align: center;
    p {
        margin: 0;
    }
    .submit-modal i {
        font-size: 55px;
        color: rgb(116, 189, 184);
    }
}

.pic-info {
    width: 150px;
    position: absolute;
    top: 0;
    left: 400px;
    h3 {
        margin: 0;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .mm {
        margin-top: 10px;
    }
}

.info-box .el-input {
    max-width: 575px;
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
    max-width: 575px;
}
.info-textarea textarea {
    min-height: 100px !important;
}

/* 欢迎加入涂梦 */
.invite-send.tm-card {
    display: flex;
    flex-direction: row;
    background: rgb(249, 242, 232);
    border: 1px solid #e97a50;
    .card-image {
        display: flex;
        padding: 10px;
        align-items: center;
        justify-content: center;
        width: 160px;
        overflow: hidden;
    }
    .card-wrapper {
        flex: 1;
        color: #6e6e6e;
        padding-left: 20px;
        p {
            max-width: 750px;
            line-height: 28px;
            margin-top: 10px;
            max-height: 66px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.why-label {
    label.el-form-item__label {
        line-height: 20px;
    }
}
</style>



