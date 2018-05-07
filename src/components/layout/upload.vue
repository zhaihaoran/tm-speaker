<template>
<div>
    <el-upload
        :class="classes"
        :action="action"
        :disabled="disabled"
        list-type="picture-card"
        accept="image/jpeg,image/png"
        :show-file-list="false"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :on-change="handlePicChange"
        >
        <img v-if="preview" :src="preview" class="img-fluid avatar">
        <i v-else class="el-icon-plus"></i>
    </el-upload>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        action: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        classes: {
            type: String,
            default: 'avatar-uploader'
        },
        preview: {
            type: String,
            default: ''
        },
        filepathname: {
            type: String,
            default: ''
        },
        previewname: {
            type: String,
            default: ''
        }
    },
    methods: {
        ...mapMutations(['update', 'commonUpload']),
        // 限制上传类型
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message({
                    message: '上传图片必须是JPG/PNG 格式!',
                    type: 'error'
                });
            }
            if (!isLt2M) {
                this.$message({
                    message: '上传图片大小不能超过 2MB!',
                    type: 'error'
                });
            }
            return (isJPG || isPNG) && isLt2M;
        },

        handlePicChange(file, fileList) {
            let formCfg = new FormData();
            // 创建formData
            // 这里记住一定要是file的源文件，本身传过来的file是被element ui包了一层
            formCfg.append('file', file.raw);
            // append的值在控制台里是看不到的（formData原型），但是可以通过formCfg.get('file')来取

            // 上传
            this.commonUpload({
                formCfg,
                filepathname: this.filepathname,
                previewname: this.previewname
            });
        }
    }
};
</script>


