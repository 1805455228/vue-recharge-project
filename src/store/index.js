import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userName:'你好新用户',
    userHeadImg:'',
}

export default new Vuex.Store({
    state,
    mutations:{
        // 保存用户名
        updateUserName(state,name){
            state.userName = name;
        },
        // 保存用户头像
        updateUserImg(state,img){
            state.userHeadImg = img;
        }
    }
})