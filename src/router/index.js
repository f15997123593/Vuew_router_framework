import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import login from '@/vue/Login'
import Home from '@/vue/Home'
import Page1 from '../vue/page1'
import Page2 from '../vue/page2'
import Page3 from '../vue/page3'
import Page4 from '../vue/page4'
import Page5 from '../vue/page5'
import Page6 from '../vue/page6'
import Page7 from '../vue/page7'
import Page8 from '../vue/page8'
import Page9 from '../vue/page9'
import userInfo from '../vue/userInfo'
import admissionList from '../vue/admission/admissionList'
import admissionOperation from '../vue/admission/admissionOperation'
import admissionOperationPage1 from '../vue/admission/admissionOperationPage1'
import admissionOperationPage2 from '../vue/admission/admissionOperationPage2'
import admissionOperationPage3 from '../vue/admission/admissionOperationPage3'


Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/Page1',
        component:Page1,
        name:'Page1'  
      },
      {
        path:'/Page2',
        component:Page2,
        name:'Page2'
      },
      {
        path:'/Page3',
        component:Page3,
        name:'Page3'
      },
      {
        path:'/Page4',
        component:Page4,
        name:'Page4'
      },
      {
        path:'/Page5',
        component:Page5,
        name:'Page5'
      },
      {
        path:'/Page6',
        component:Page6,
        name:'Page6'
      },
      {
        path:'/Page7',
        component:Page7,
        name:'Page7'
      },
      {
        path:'/Page8',
        component:Page8,
        name:'Page8'
      },
      {
        path:'/Page9',
        component:Page9,
        name:'Page9'
      },
      {
        path:'/userInfo',
        component:userInfo,
        name:'userInfo'
      },
      {
        path:'/admissionList',
        component:admissionList,
        name:'admissionList'
      },
      {
        path:'/admissionOperation',
        component:admissionOperation,
        name:'admissionOperation',
        children:[
          {
            path:'/admissionOperationPage1',
            component:admissionOperationPage1,
            name:'admissionOperationPage1'
          },
          {
            path:'/admissionOperationPage2',
            component:admissionOperationPage2,
            name:'admissionOperationPage2'
          },
          {
            path:'/admissionOperationPage3',
            component:admissionOperationPage3,
            name:'admissionOperationPage3'
          }
        ]
      },
    ]
  },
]

const router = new Router({
  routes
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit('login', window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
      //如果存在Token,则可以进入需要token的页面
      if (store.state.token) {
          next();
      }
      else {
          next({
              path: '/login'
          })
      }
  }
  else {
      next();
  }
})

export default router;
