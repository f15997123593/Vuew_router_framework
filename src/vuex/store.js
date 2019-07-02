/**
 * 引入Vuex需要添加vuex文件夹,然后在添加本文件
 * 然后再在main.js里面引入store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        count:'',//测试使用的
        token: null,//储存Token
    },
    //计算方法
    getters:{
        //用于返回值
        getStateCount:function(state){
            if(state.count <5){
                return 'xiao';
            }else{
                return "da";
            }
        },

    },
    //修改状态
    mutations:{
        add(state){
            state.count++;
        },
        reduction(state){
            state.count--;
        },
        //登录功能的路由拦截实现
        login(state,data) {
            localStorage.token = data;
            state.token = data;
        },
        logout(state){
            localStorage.removeItem('token');
            state.token = null
        }

    }
})

export default store