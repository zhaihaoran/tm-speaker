<template>
    <el-tabs @tab-click="handleLoading" v-model="activeName" type="border-card">
        <el-tab-pane name="common" v-loading="loading.form" label="通用">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="setting-form" >
                <el-form-item label="头像">
                    <Cropper
                        classes="avatar"
                        v-on:update="handleUpdateCropperUrl"
                        filepathname="pathfilename"
                        previewname="photoUrl"
                        :previewUrl="form.profilePhotoUrl"
                        width="170"
                        height="170"
                    ></Cropper>
                </el-form-item>
                <el-form-item label="梦享家名称" prop="name" >
                    {{form.name}}
                </el-form-item>
                <el-form-item label="职业" prop="title" >
                   {{form.title}}
                </el-form-item>
                <el-form-item label="家乡" prop="hometown" >
                    <el-input v-model="form.hometown"></el-input>
                </el-form-item>
                <el-form-item label="常居地点" prop="live" >
                    <el-input v-model="form.live"></el-input>
                </el-form-item>
                <el-form-item label="简要介绍" prop="speakerShortDesc" >
                    <el-input v-model="form.speakerShortDesc"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="speakerDesc" >
                    <el-input type="textarea" class="tm-textarea" v-model="form.speakerDesc"></el-input>
                </el-form-item>

                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="photo" v-loading="loading.pictures" label="相册">
            <div class="upload-pic">
                <el-upload
                    action=""
                    :show-file-list="false"
                    :limit="10"
                    :on-change="handlePicChange"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                    :file-list="photoList"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip upload-tip">只能上传jpg/png文件，且不超过2MB</div>
                </el-upload>
            </div>
            <div class="individar"></div>
            <el-row :gutter="10">
                <div class="empty-box" v-show="photoList.length == 0" >
                    暂无图片
                </div>
                <el-col class="tm-col-5 pic-cube" :sm="12" :md="8" :lg="6" v-for="photo in photoList" :key="photo.speakerPhotoId" >
                    <img :src="photo.photoUrl" class="img-fluid" :time="photo.addTimestamp">
                    <div class="op_context">
                        <span class="photo-cube" @click="handleDeletePic(photo)">
                            <i class="el-icon-delete"></i>
                        </span>
                        <span class="photo-cube" @click="handleShowPic(photo)">
                            <i class="el-icon-view"></i>
                        </span>
                    </div>
                </el-col>
            </el-row>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-tab-pane>
        <el-tab-pane name="video" v-loading="loading.videos" label="视频">
            <el-row :gutter="10">
                <el-col class="tm-col-5" :sm="12" :md="8" :lg="6" v-for="video in videos" :key="video.videoId" >
                    <div :class="[videoClass,{active:videoIdOfRecommended == video.videoId}]" >
                        <a target="_blank" :href="video.linkUrl" class="card-image">
                            <img class="min-images" :src="video.previewUrl">
                            <span class="vd-times badge">
                                {{formatDuration(video.duration)}}
                            </span>
                        </a>
                        <div class="card-content">
                            <span class="card-title grey-333">
                                <a target="_blank" class="tm-inherit" :href="video.linkUrl">{{video.videoTitle}}</a></span>
                            <div class="vd-extra">
                                <span>梦享家：{{video.speakerName}}</span>
                                <span>{{dateformat(video.addTimestamp)}} <span class="text-right" >{{video.playTimes}} 次播放</span> </span>
                            </div>
                        </div>
                        <span @click="recommend(video,videoIdOfRecommended == video.videoId)" class="bages"><i class="el-icon-upload2"></i>个人主页置顶</span>
                    </div>
                </el-col>
            </el-row>
            <el-pagination
                :current-page.sync="current"
                :page-size="10"
                layout="total, prev, pager, next"
                @current-change="pageCurrentChange"
                :total="count"
                class="photo-pagination"
            >
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { dateformat, formatDuration } from '@comp/lib/api_maps';
import Cropper from '@layout/modal/Cropper.vue';

export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            form: {},
            activeName: 'common',
            loading: {
                form: false,
                pictures: false,
                videos: false
            },
            photoList: [],
            videoClass: {
                video: true,
                'card-hover': true,
                hoverable: true
            },
            /* 视频列表 */
            current: 1, //当前页
            perPage: 10, //每个视频数
            count: 1, //总数
            videoIdOfRecommended: '',
            rules: {
                hometown: [
                    {
                        required: true,
                        message: '请填写相关信息',
                        trigger: 'change'
                    }
                ],
                live: [
                    {
                        required: true,
                        message: '请填写相关信息',
                        trigger: 'change'
                    }
                ],
                speakerShortDesc: [
                    {
                        required: true,
                        message: '请填写相关信息',
                        trigger: 'change'
                    }
                ],
                speakerDesc: [
                    {
                        required: true,
                        message: '请填写相关信息',
                        trigger: 'change'
                    }
                ]
            },
            videos: []
        };
    },
    mounted() {
        this.handleForm();
    },
    computed: {
        ...mapState({
            pathfilename: state => state.upload.pathfilename,
            photoUrl: state => state.upload.photoUrl
        })
    },
    methods: {
        dateformat,
        formatDuration,
        ...mapMutations([
            'update',
            'getFormData',
            'formSubmit',
            'getArrayData',
            'photoUpload'
        ]),
        handleLoading(context) {
            switch (context.name) {
                case 'common':
                    this.handleForm();
                    break;
                case 'photo':
                    this.handlePics();
                    break;
                case 'video':
                    this.handleVideos();
                    break;
            }
        },
        /* 预览照片 */
        handleShowPic(photo) {
            this.dialogImageUrl = photo.photoUrl;
            this.dialogVisible = true;
        },
        /* 加载表单数据 */
        handleForm() {
            this.loading.form = true;
            this.getFormData({
                act: 'getPersonalPageGeneral',
                onSuccess: res => {
                    this.form = res.data.data;
                    this.loading.form = false;
                }
            });
        },
        /* 加载图片数据 */
        handlePics() {
            this.loading.pictures = true;
            /* 相册数据 */
            this.getArrayData({
                act: 'getPersonalPagePhotoList',
                onSuccess: res => {
                    this.photoList = res.data.data.photoList.sort((a, b) => {
                        return a.addTimestamp - b.addTimestamp;
                    });
                    this.loading.pictures = false;
                }
            });
        },
        /* 视频列表 -- 翻页 */
        pageCurrentChange(page) {
            this.handleVideos();
        },
        /* 加载视频数据 */
        handleVideos() {
            this.loading.videos = true;
            /* 视频信息 */
            this.getArrayData({
                act: 'getPersonalPageVideoList',
                page: this.current,
                perPage: this.perPage,
                onSuccess: res => {
                    this.videos = res.data.data.data;
                    this.count = +res.data.data.count;
                    this.videoIdOfRecommended =
                        res.data.data.videoIdOfRecommended;
                    this.loading.videos = false;
                }
            });
        },
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

        onSubmit(form) {
            const cfg = Object.assign(this.form, {
                profilePhotoShortPathFilename: this.pathfilename,
                profilePhotoUrl: this.photoUrl
            });

            this.$refs[form].validate(valid => {
                if (valid) {
                    this.formSubmit({
                        act: 'modifyPersonalPageGeneral',
                        ...cfg
                    });
                } else {
                    return false;
                }
            });
        },
        handleExceed(files, fileList) {
            this.$message.warning(`图片已满，请删除不需要的图片`);
        },
        /* 添加图片 */
        handlePicChange(file) {
            /* 是否符合标准 */
            if (this.beforeUpload(file.raw)) {
                let formCfg = new FormData();
                formCfg.append('file', file.raw);
                formCfg.append('act', 'addPersonalPagePhoto');
                this.photoUpload({
                    formCfg,
                    onSuccess: res => {
                        this.photoList.push(res.data.data);
                    }
                });
            }
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
                        speakerPhotoId: row.speakerPhotoId,
                        successText: '删除成功',
                        errorText: '删除失败',
                        onSuccess: res => {
                            const index = this.photoList.findIndex(
                                el => el.speakerPhotoId === row.speakerPhotoId
                            );
                            this.photoList.splice(index, 1);
                        }
                    });
                })
                .catch(() => {});
        },

        // 限制上传类型
        beforeUpload(file) {
            debugger;
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
        }
    },
    components: {
        Cropper
    }
};
</script>
<style lang="scss" >
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
    margin: 5px;
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
    background: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    cursor: pointer;
    z-index: 50;
    padding: 0 5px;
}

.admin-cropper {
    width: 500px;
    height: 500px;
}

.card-wrapper {
    max-width: 240px;
}

.min-images {
    min-height: 150px;
    min-width: 100%;
    background: #ececec;
}

.pic-cube {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: #dedcdc;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    &:hover {
        .op_context {
            visibility: visible;
            .photo-cube {
            }
        }
    }
    .op_context {
        font-size: 24px;
        color: #fff;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        visibility: hidden;
        top: 0;
        left: 0;
        .photo-cube {
            margin: 5px 10px;
            cursor: pointer;
        }
    }
}
.empty-box {
    text-align: center;
    padding: 20px;
    font-size: 18px;
}
</style>


