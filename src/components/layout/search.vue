<template>
    <div class="tm-card">
        <el-radio-group  v-model="orderType" class="radio-group" >
            <el-radio-button label="0">综合排序</el-radio-button>
            <el-radio-button label="1">最近演讲</el-radio-button>
            <el-radio-button label="2">最近邀约</el-radio-button>
        </el-radio-group>
        <slot></slot>
        <el-button type="primary" @click="search" class="search-btn" >检索</el-button>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import qs from 'qs';

export default {
    name: 'Search',
    props: ['search'],
    computed: {
        orderType: {
            set(value) {
                this.$store.commit('updateValue', {
                    orderType: value
                });
            },
            get() {
                return this.$store.state.search.orderType;
            }
        }
    }
};
</script>

<style>
.radio-group {
    color: fff;
}

.search-input {
    display: inline-block;
    margin-left: 5px;
}

.search-btn {
    position: absolute;
    right: 20px;
    top: 20px;
}
</style>
