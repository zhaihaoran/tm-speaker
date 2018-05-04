<template>
  <div class="tm-card flow">
        <el-steps direction="vertical" class="flow-step" >
            <el-step title="注册账号"></el-step>
            <el-step title="填写申请表，等待审核"></el-step>
            <el-step title="邀约梦享家"></el-step>
            <el-step title="登录管理中心与梦享家处理邀约事宜"></el-step>
            <el-step class="step-click" title="下载ClassIn教学工具（点击下载）" @click.native="redirect('http://www.eeo.cn/download.html')" ></el-step>
            <el-step title="等待途梦联系处理上课流程"></el-step>
            <el-step title="上课"></el-step>
            <el-step class="step-click" title="提交调查问卷（点击下载模板）" @click.native="redirect('https://www.sina.com')" ></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
  </div>
</template>
<script>
export default {
    methods: {
        redirect(url) {
            window.open(url);
        }
    }
};
</script>
