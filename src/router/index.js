import Vue from 'vue'
import Router from 'vue-router'
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


Vue.use(Router)

export default new Router({
  routes: [
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
        }
      ]
    },
    
  ]
})
