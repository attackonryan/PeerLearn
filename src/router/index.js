import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../pages/Home/Home'
import Found from './../pages/Found/Found'
import Message from './../pages/Message/Message'
import User from './../pages/User/User'
import Login from './../pages/Login/Login'
import Register from './../pages/Register/Register'
import shop from './../pages/shop/shop'
import Rank from './../pages/Rank/Rank'
import Chat from './../pages/Chat/Chat'
import Video from './../pages/Video/Video'


Vue.use(VueRouter);

export default new VueRouter({
	//一级路由
	routes:[
	    {
	    	path:"/home",
	    	component:Home,
	    },
	    {
			path:"/video",
			component:Video,
	    },
	    {
	    	path:"/chat",
	    	component:Chat,
	    },
	    {
			path:"/rank",
			component:Rank,
	    },
	    {
	    	path:"/shop",
	    	component:shop,
	    },
	    {
	    	path:"/found",
	    	component:Found,
	    },
	    {
	    	path:"/message",
	    	component:Message
	    },
	    {
	    	path:"/user",
	    	component:User,
	    },
	    {
			path:"/login",
			component:Login
	    },
	    {
			path:"/register",
			component:Register
	    },
	    {
	    	path:'/',
	    	redirect:"/home"
	    }
	]
})
