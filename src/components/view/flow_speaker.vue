<template>
  <div class="tm-card flow">
        <el-steps direction="vertical" class="flow-step" >
            <el-step title="注册账号"></el-step>
            <el-step title="填写申请表，等待审核"></el-step>
            <el-step title="邀约学校/被学校邀约"></el-step>
            <el-step title="登录管理中心与学校处理邀约事宜"></el-step>
            <el-step class="step-click" title="下载ClassIn教学工具" @click.native="redirect('http://www.eeo.cn/download.html')" ></el-step>
            <el-step title="等待途梦联系处理上课流程"></el-step>
            <el-step title="上课"></el-step>
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

