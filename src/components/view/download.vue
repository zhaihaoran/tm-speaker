<template>
    <div class="tm-card">
        <div class="download-box">
            <a href="##" class="cube color-1">
                <i class="con iconfont icon-wenjuan"></i>
                <span class="tm-a" >课前问卷（学校用）下载</span>
            </a>
            <a href="##" class="cube color-2">
                <i class="con iconfont icon-wenjuan"></i>
                <span class="tm-a" >课后问卷（学校用）下载</span>
            </a>
        </div>
        <div class="individar"></div>
        <div class="download-box">
            <a target="_blank" href="http://www.eeo.cn/download.html" class="cube color-2">
                <img :src="classin" class="img-fluid db-img" alt="">
                <span class="tm-a" >ClassIn 在线教学工具下载</span>
            </a>
        </div>
    </div>
</template>
<script>
import classin from 'assets/image/classin.png';
export default {
    data() {
        return {
            classin
        };
    }
};
</script>
<style lang="scss">
.download-box {
    display: flex;
    .cube {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px;
        i {
            font-size: 70px;
            margin-bottom: 20px;
        }
        img {
            width: 70px;
            margin-bottom: 20px;
        }
    }
    .color-1 {
        i {
            color: rgb(53, 98, 136);
        }
    }
    .color-2 {
        i {
            color: rgb(0, 174, 239);
        }
    }
}
</style>



