//router文件夹下 index.js
import Vue from 'vue'
import Router from 'vue-router'
// 探究一下vue-router
// import vueRouterPlay1 from '@/page/vueRouterPlay/vueRouterPlay1.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import parts_html from '@/components/parts_html.vue'
import particulars from '@/components/particulars.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      // 动态路径参数 以冒号开头
      path: '/HelloWorld/:id/:uuuu',//这里有变化
      name: 'HelloWorld', //不需要变
      component: HelloWorld //不需要变
    },
		{
			path:'/',
			 name: 'parts_html', //不需要变
			component: parts_html //不需要变
		},
		{
			path:'/particulars',
			 name: 'particulars', //不需要变
			component: particulars //不需要变
		}
  ]
})