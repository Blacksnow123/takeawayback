import VueRouter from 'vue-router'

import home from './app.vue'
import login from './login.vue'
import manage from './main/pages/manage.vue'
import homepage from '../src/main/pages/home.vue'
import addShop from '../src/main/pages/addShop.vue'
import addGoods from '../src/main/pages/addGoods.vue'

import adminList from '../src/main/pages/adminList.vue' 
import userList from '../src/main/pages/userList.vue'
import shopList from '../src/main/pages/shopList.vue'
import foodList from '../src/main/pages/foodList.vue'
import orderList from '../src/main/pages/orderList.vue'


import adminSet from '../src/main/pages/adminSet.vue'

import explain from '../src/main/pages/explain.vue'
import register from './register.vue'

//商家
import shoperManage from '../src/main/pages/shoperManage.vue'
import shoperFoodlist from '../src/main/pages/shoperFoodlist.vue'
import shoperOrderlist from '../src/main/pages/shoperOrderlist.vue'
import shoperAddfood from '../src/main/pages/shoperAddfood.vue'
import shoperAddshop from '../src/main/pages/shoperAddshop.vue'
import shoperSet from '../src/main/pages/shoperSet.vue'
var router=new VueRouter({

    routes:[
        {path:'/',redirect:'/login'},
        {path:'/home',component:home,name:'home'},
        {path:'/login',
        component:login,
        name:'login',
        },
        {path:'/register',component:register,name:'register'},
        {
            path:'/manage',
            component:manage,
            name:'manage',
            children: [{
                path: '',
                component: homepage,
                meta: [ ],
                         
            },{
                path: '/addShop',
                component: addShop,
                // title:['添加数据', '添加商铺'],
                meta: ['添加数据', '添加商铺'],
            },{
                path: '/addGoods',
                component: addGoods,
                meta: ['添加数据', '添加商品'],
            },{
                path: '/userList',
                component: userList,
                meta: ['数据管理', '用户列表'],
            },
            {
                path: '/shopList',
                component: shopList,
                meta: ['数据管理', '商家列表'],
            },{
                path: '/foodList',
                component: foodList,
                meta: ['数据管理', '食品列表'],
            },{
                path: '/orderList',
                component: orderList,
                meta: ['数据管理', '订单列表'],
            },{
                path: '/adminList',
                component: adminList,
                meta: ['数据管理', '管理员列表'],
            }
            ,{
                path: '/adminSet',
                component: adminSet,
                meta: ['设置', '管理员设置'],
            }
            ,{
                path: '/explain',
                component: explain,
                meta: ['说明', '说明'],
            }
        ]
        },
        //商家路由
        {
            path:'/shoperManage',
            component:shoperManage,
            name:'shoperManage',
            children:[
            {
                path:'/shoperFoodlist',
                component:shoperFoodlist,
                meta:['数据管理','食品列表']
            },
            {
                path:'/shoperOrderlist',
                component:shoperOrderlist,
                meta:['数据管理','订单列表']
            },
            {
                path:'/shoperAddfood',
                component:shoperAddfood,
                meta:['数据添加','添加食品']
            },
            {
                path:'/shoperAddshop',
                component:shoperAddshop,
                meta:['数据添加','添加商铺']
            },
            {
                path:'/shoperSet',
                component:shoperSet,
                meta:['设置','商家设置']
            }
            ]
        }
    ],
    linkActiveClass:'mui-active'
})
//暴露路由对象
export default router