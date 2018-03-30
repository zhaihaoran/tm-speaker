<template>
    <div class="tm-card info-box">
        <el-form ref="form" :status-icon="inline" :inline-message="inline" :model="form" label-width="100px">
            <h3>演讲者基本信息</h3>
            <el-form-item label="姓名" prop="name" >
                <el-input disabled v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="name" >
                <el-radio-group  disabled size="small" v-model="form.sex">
                    <el-radio-button label="2">男</el-radio-button>
                    <el-radio-button label="1">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="公司/机构名称" prop="company" >
                <el-input disabled v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="工作岗位" prop="title" >
                <el-input disabled v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wechat" >
                <el-input disabled v-model="form.wechat"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone" >
                <el-input disabled v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址" prop="address" >
                <el-input disabled v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="可分享时间段" prop="shareTime" >
                <el-input disabled class="info-textarea" type="textarea" v-model="form.idleTimeDesc"></el-input>
            </el-form-item>

            <el-form-item label="演讲内容公开">
                <el-switch disabled
                    v-model="form.showVideoOnSite"
                >
                </el-switch>
                <span class="left-info" >是否愿意将演讲视频在途梦平台上公开展示</span>
            </el-form-item>

            <el-form-item label="您的照片" props="schoolSrc" >
                <img :src="form.schoolSrc" class="img-fluid" alt="school">
            </el-form-item>

            <div class="individar"></div>
            <h3>附加信息</h3>
            <el-form-item label="教育背景" required >
                <el-input disabled type="textarea" class="info-textarea"  v-model="form.educationBackground"></el-input>
            </el-form-item>
            <el-form-item label="介绍人">
                <el-input disabled v-model="form.inviter"></el-input>
            </el-form-item>
            <el-form-item class="why-label" label="为什么申请途梦演讲者">
                <el-input disabled type="textarea" class="info-textarea" v-model="form.whyChooseUs"></el-input>
            </el-form-item>
            <el-form-item prop="radio" label-width="0" required >
                <el-checkbox disabled v-model="form.radio"> 我已阅读并同意途梦 <a class="tm-a" href="#">用户规约</a></el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inline: true,
            form: {
                radios: 3,
                name: 'zhaihaoran',
                region: 'zhaihaoran',
                teacher: 'zhaihaoran',
                telephone: 'zhaihaoran',
                delivery: false,
                type: [],
                resource: 'asdsad',
                freeinfo: 'asdasd',
                schoolSrc: '/static/image/admin/camera.png',
                classSrc: '/static/image/admin/camera.png',
                radio: true
            },
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style>
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
</style>


