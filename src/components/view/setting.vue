<template>
    <el-tabs type="border-card">
        <el-tab-pane label="通用">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="setting-form" >
                <el-form-item label="头像">
                    <Cropper
                        v-on:update="handleUpdateCropperUrl"
                        filepathname="pathfilename"
                        previewname="photoUrl"
                        :previewUrl="form.profilePhotoUrl"
                        :action='Api.upload'
                        aspectRatio.number=0.5
                    ></Cropper>
                </el-form-item>
                <el-form-item label="学校名称" prop="name" >
                    {{form.name}}
                </el-form-item>
                <el-form-item label="学校地址" prop="address" >
                   {{form.address}}
                </el-form-item>
                <el-form-item label="简要介绍" prop="schoolShortDesc" >
                    <el-input v-model="form.schoolShortDesc"></el-input>
                </el-form-item>
                <el-form-item label="学校简介" prop="schoolDesc" >
                    <el-input type="textarea" class="tm-textarea" v-model="form.schoolDesc"></el-input>
                </el-form-item>
                <el-form-item label="办学理念" prop="philosophy" >
                    <el-input  type="textarea" class="tm-textarea" v-model="form.philosophy"></el-input>
                </el-form-item>
                <el-form-item label="校园文化" prop="culture" >
                    <el-input  type="textarea" class="tm-textarea" v-model="form.culture"></el-input>
                </el-form-item>
                <el-form-item label="发展历程" prop="growth" >
                    <el-input type="textarea" class="tm-textarea" v-model="form.growth"></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="相册">
            <div class="upload-pic">
                <el-upload
                    :action="Api.upload"
                    :show-file-list="false"
                    :limit="10"
                    :on-change="handlePicChange"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                    :file-list="photoList"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip upload-tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <div class="individar"></div>
            <el-row :gutter="10">
                <div class="empty-box" v-show="photoList.length == 0" >
                    暂无图片
                </div>
                <el-col class="tm-col-5 pic-cube" :sm="12" :md="8" :lg="6" v-for="photo in photoList" :key="photo.schoolPhotoId" v-dragging="{ item: photo, list: photoList, group: 'photo' }" >
                    <img @click="handleDeletePic(photo)" ref="photo" :src="photo.photoUrl" class="img-fluid" :time="photo.addTimestamp">
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="视频">
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.videoId" >
                    <div :class="[videoClass,{active:videoIdOfRecommended == video.videoId}]" >
                        <div class="card-image">
                            <img class="img-fluid" :src="video.previewUrl">
                            <span class="vd-times badge">{{video.duration}}</span>
                        </div>
                        <div :href="video.linkUrl" class="card-content">
                            <span class="card-title grey-333">{{video.videoTitle}}</span>
                            <div class="vd-extra">
                                <span>演讲者：{{video.speakerName}}</span>
                                <span>学校：{{video.schoolName}}</span>
                                <span>{{video.addTimestamp}} <span class="text-right" >{{video.playTimes}} 次播放</span> </span>
                            </div>
                        </div>
                        <span @click="recommend(video,videoIdOfRecommended == video.videoId)" class="bages"><i class="el-icon-upload2"></i>推荐</span>
                        <div class="recommend-box">
                            <span>点亮按钮可设置为推荐视频</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-pagination
                :current-page.sync="current"
                :page-size="8"
                layout="total, prev, pager, next"
                :total="count"
                class="photo-pagination"
            >
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import Cropper from '@layout/modal/cropper.vue';
import jQuery from 'jquery';
import '@comp/lib/velocity.min.js';
import '@comp/lib/materialbox.js';
import { mapState, mapMutations } from 'vuex';

import { Api } from '@comp/lib/api_maps';

export default {
    data() {
        return {
            photoList: [],
            videoClass: {
                video: true,
                'card-hover': true,
                hoverable: true
            },
            current: 1,
            videoIdOfRecommended: '',
            count: 0,
            rules: {},
            videos: [],
            Api,
            form: {}
        };
    },
    mounted() {
        this.$dragging.$on('dragged', ({ value }) => {
            console.log('hahaha');
        });
        $(this.$refs.photo).materialbox();

        this.getFormData({
            act: 'getPersonalPageGeneral',
            onSuccess: res => {
                this.form = res.data.data;
            }
        });

        /* 相册数据 */
        this.getArrayData({
            act: 'getPersonalPagePhotoList',
            onSuccess: res => {
                this.photoList = res.data.data.photoList;
            }
        });

        /* 视频信息 */
        this.getArrayData({
            act: 'getPersonalPageVideoList',
            onSuccess: res => {
                this.videos = res.data.data.data;
                this.count = +res.data.data.count;
                this.videoIdOfRecommended = res.data.data.videoIdOfRecommended;
            }
        });
    },
    computed: {
        ...mapState({
            pathfilename: state => state.upload.pathfilename,
            photoUrl: state => state.search.photoUrl
        })
    },
    methods: {
        ...mapMutations([
            'update',
            'getFormData',
            'formSubmit',
            'getArrayData',
            'photoUpload'
        ]),
        /* 设置cropperUrl */
        handleUpdateCropperUrl(obj) {
            this.form.profilePhotoUrl = obj.fileUrl;
            this.form.profilePhotoShortPathFilename = obj.shortPathFilename;
        },
        recommend(video, state) {
            if (!state) {
                this.formSubmit({
                    act: 'setPersonalPageVideoRecommend',
                    videoId: video.videoId,
                    onSuccess: res => {
                        this.videoIdOfRecommended = video.videoId;
                    }
                });
            }
        },
        handleSetPathFileName(res) {
            console.log(res);
        },
        onSubmit(form) {
            const cfg = Object.assign(this.form, {
                profilePhotoShortPathFilename: this.pathfilename,
                profilePhotoUrl: this.photoUrl
            });

            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formSubmit({
                        act: 'modifyPersonalPageGeneral',
                        ...cfg,
                        onSuccess: res => {
                            console.log('修改成功');
                        },
                        onError: res => {
                            console.log('失败');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 10 个文件，共选择了 ${files.length +
                    fileList.length} 个文件`
            );
        },
        /* 添加图片 */
        handlePicChange(file) {
            let formCfg = new FormData();
            formCfg.append('file', file.raw);
            formCfg.append('act', 'addPersonalPagePhoto');
            this.photoUpload({
                formCfg,
                onSuccess: res => {
                    console.log(res);
                    this.photoList.push(res.data.data);
                },
                onError: res => {
                    console.log('error', res);
                }
            });
        },
        /* 删除照片 */
        handleDeletePic(row) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.formSubmit({
                        act: 'removePersonalPagePhoto',
                        schoolPhotoId: row.schoolPhotoId,
                        onSuccess: res => {
                            const index = this.photoList.findIndex(
                                el => el.schoolPhotoId === row.schoolPhotoId
                            );
                            this.photoList.splice(index, 1);
                        }
                    });
                })
                .catch(() => {});
        }
    },
    components: {
        Cropper
    }
};
</script>
<style lang="scss" >
.avatar {
    .el-upload--picture-card {
        width: 200px;
        height: 200px;
        line-height: 200px;
    }
}
.setting-form {
    max-width: 500px;
    padding: 30px;
}
.photo-pagination {
    float: right;
}
.el-upload__tip.upload-tip {
    padding-left: 20px;
    display: inline-block;
}
.el-upload-list {
    display: flex;
    flex-wrap: wrap;
}
.el-upload-list--picture .el-upload-list__item {
    max-width: 300px;
    margin-right: 10px;
}
.pic-cube {
    margin: 5px 0;
}

.video {
    position: relative;
}

.hoverable.card-hover.active {
    .bages {
        opacity: 1;
        background: #bb2133;
    }
}

.recommend-box {
    opacity: 0;
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    width: calc(100% - 86px);
    height: 26px;
    line-height: 26px;
    color: #fff;
    padding: 8px;
    font-size: 12px;
    padding-left: 78px;
}
.bages {
    opacity: 0;
    position: absolute;
    top: 8px;
    left: 10px;
    color: #fff;
    z-index: 50;
    height: 26px;
    line-height: 26px;
    width: 60px;
    background: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
    z-index: 50;
    i {
        margin: 0 5px;
    }
}

.admin-cropper {
    width: 500px;
    height: 500px;
}
.picture-card {
    display: none;
}
</style>


