import Vue from 'vue'
import Vuex from 'vuex'
import count from '@store/module/count'
import common from '@store/module/common'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        count,
        common
    },
})
