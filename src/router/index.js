import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/page/home'
import VideoPage from '@/page/video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta:{
        title:'首页'
      }
      
    },
		{
		  path: '/video',
		  name: 'video',
		  component: VideoPage,
		  meta:{
		    title:'会员充值'
		  }
		},
  ]
})
