// console.log("ok")
import Vue from 'vue'

import home from './app.vue'

//导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import router from './router.js'

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import axios from 'axios'; //导入axios
axios.defaults.baseURL = 'http://localhost:8080/';  //配置根域名
Vue.prototype.$ajax = axios;  //把axios挂载到Vue的原型上

// var car =JSON.parse(localStorage.getItem('car')||'[]')

import createPersistedState from 'vuex-persistedstate'

var store= new Vuex.Store({
    state:{//this.$store.state.***
        user:[]
    },
    mutations:{//this.$store.commit('方法名',参数)
       setUser(state,newval){
            state.user=newval;
       }
    },
    getters:{//this.$store.getters.***
       getUser(state){
           return state.user;
       }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})

//导入时间插件
import moment from 'moment'

//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//定义全局过滤器 过滤时间格式
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD"){
    return moment(dateStr).format(pattern);
})

// const role = '3';
// //当进入一个页面是会触发导航守卫 router.beforeEach 事件
// router.beforeEach((to,from,next)=>{
//     if(to.meta.roles!=undefined){
//         let a=to.meta.roles;
//         console.log("a:"+a)
//         if(a.includes(role)){
//             next(); //放行
//         }else{
//             console.log("11111111111111111")
//             // next({path:"/addShop"});//跳到404页面
//         }
//     }else{
//         next();
//     }
    
// })
 
var vm =new Vue({
    el:'#aaa',
    data:{},
    methods:{},
    render:function(CreateElements){
        return CreateElements(home)
    },
    router,
    store
})
