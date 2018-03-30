<template>
    <div class="tm-card">
        <el-radio-group v-model="searchConfig.category" class="radio-group" >
            <el-radio-button label="0">综合排序</el-radio-button>
            <el-radio-button label="1">最近演讲</el-radio-button>
            <el-radio-button label="2">最近邀约</el-radio-button>
        </el-radio-group>
        <div class="search-input">
            <el-date-picker
                v-model="searchConfig.input"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }
        };
    },
    name: 'Search',
    props: ['searchConfig']
};
</script>

<style scoped >
.radio-group {
    color: fff;
}

.search-input {
    display: inline-block;
    margin-left: 15px;
}
</style>
