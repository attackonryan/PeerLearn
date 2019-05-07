<template>
	<div id="app">
		<router-view @chat="chat" @sendmsg="sendmsg" ref="child"></router-view>
		<TabBar></TabBar>
	</div>
</template>

<script>
import TabBar from "./components/TabBar/TabBar"

export default {
	name:"App",
	data(){
		return{
			socket:{},
			name1:'',
			name2:'',
		}
	},
	components:{
		TabBar,
	},
	methods:{
		getcookie(str){
                let data;
                document.cookie.split("; ").forEach((v,i)=>{
                    if(v.split('=')[0] === str){
                        data = v.split('=')[1];
                    }
                })
                return data;
        },
        chat(name1,name2){
        	this.name1 = name1;
        	this.name2 = name2;
            let roomName = name1>name2?name1+name2:name2+name1;
            this.socket.emit("chat",roomName);
            this.$store.commit("setroomName",roomName);
            
            let json = {};
            function pushmsg(obj){
                obj.$store.commit('pushallmsg',json);
            }
            this.socket.on("receiveMsg",(data)=>{
            	json = {};
                json.headimg = `../../../static/img/${data.name}.jpg`;
                json.msg = data.msg;
                json.self = false;
                pushmsg(this);
				setTimeout(()=>{
						this.$refs.child.tobottom();
				})
                ;
            })
        },
        sendmsg(msg){
        	let data = {
        		roomName:this.$store.state.roomName,
        		msg,
        		name:this.name2,
        	}
        	this.socket.emit("sendMsg",data);
        }
	},
	mounted(){
		this.socket = io.connect("http://119.23.28.162:4040");
		if(this.getcookie('name')){
			this.$ajax.post("http://119.23.28.162:4040/setonline",{
				name:this.getcookie('name'),
			})
		}
	},
}
	
</script>

<style scoped>
	#app{
		width:100%;
		height:100%;
		background-color:#f5f5f5;
	}
	
</style>