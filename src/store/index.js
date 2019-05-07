import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    foundlist:[],
    usermsg:{
        name:" ",
        tel:" ",
        email:"",
        sex:"",
    },
    foundview:0,
    allmsg:[],//对方聊天的记录
    roomName:"",
    Tabbar:true,
    chatf:{},
    friends:[],
    login:false,
    current:"/home",
    hotcourses:[],
    likecourses:[],
    shopcourse:{},
    video:{},
};

const getters = {   
};

const mutations = {
    foundview(state,arr){
        state.foundview = 1;
    },
    setfoundlist(state,arr){
        state.foundlist = arr;
    },
    setvideo(state,json){
        state.video = json;
    },
    pushallmsg(state,json){
        state.allmsg.push(json);
    },
    setroomName(state,roomName){
        state.roomName = roomName;
    },
    hideTabbar(state){
        state.Tabbar = false;
    },
    showTabbar(state){
        state.Tabbar = true;
    },
    setChatf(state,f){
        state.chatf = f;
    },
	setshopcourse(state,msg){
		state.shopcourse = msg;
	},
	setlikecourses(state,courses){
		let arr = [];
		for(let i = 0;i < courses.course.length;i ++){
			let json = {
				image:courses.course[i].image,
				title:courses.course[i].title,
				author:courses.name,
		    }
		    arr[i] = json;
		}
		state.likecourses = arr;
	},
	sethotcourse(state,courses){
		state.hotcourses = courses;
	},
    setusermsg(state,msg){
        state.usermsg = msg;
    },
    setfriends(state,array){
        state.friends = array;
    },
    changecurrent(state,place){
        state.current = place;
    },
    quit(state,msg){
        state.usermsg = {
	        name:" ",
	        tel:" ",
	        email:"",
	        sex:"",
        };
        state.login = false;
    },
}
const actions = {
	sethotcourse(context,json){
		context.commit('sethotcourse',json);
	},
    setNewmsg(context,msg){
        context.commit('setusermsg',msg)
    }
};
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
});
 




export default store;