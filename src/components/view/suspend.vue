<template>
    <div class="center" >
        <div>您已被冻结，请联系管理员</div>
        <div>冻结原因：{{suspendDesc}}</div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Suspend',
    computed: mapState({
        suspendDesc: state => state.common.suspendDesc
    })
};
</script>
<style lang="scss" scoped>
.center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>


