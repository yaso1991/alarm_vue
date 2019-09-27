import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import AlarmInfo from '@/components/AlarmInfo'
import SumInfo from '@/components/SumInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path: '/alarmInfo', component: AlarmInfo},
        {path: '/sumInfo', component: SumInfo}
      ]
    }
  ]
})
