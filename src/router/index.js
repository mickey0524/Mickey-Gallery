import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Gallery from '../components/Gallery.vue'
import Introduction from '../components/Introduction.vue'
import Photo from '../components/Photo.vue'

export default new VueRouter({
	mode : 'history',
	routes : [
		{ path : '/gallery/:userId', component: Gallery, 
		  children : [
		  	{ path : '', component : Photo },
		  	{ path : 'introduction/:introductionId', component : Introduction }
		  ]
		},
		{ path : '/login', component : Login },
		{ path : '/register', component : Register },
		{ path : '*', redirect : '/gallery/visitor' }
	],
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
})