import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

import getters from './getters'
import actions from './actions'
import mutations from './mutation'
import home from './modules/home'
import productDetails from './modules/productDetails'
import flashDealsNow from './modules/flashDealsNow'

const state={
    userdata: {},//用户数据
    token: null,//token
    title: '',
    shopingcarnum: 0//购物车数量
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        home,
        productDetails,
        flashDealsNow
    },
})