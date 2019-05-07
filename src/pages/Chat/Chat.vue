<template>
	<div class="Chat">
		<mu-appbar color="lightBlue400"  style="height:46px;position:fixed;top:0;width:100%;">
		    <mu-button icon slot="left" @click="quit()">
		      <mu-icon value="chevron_left"></mu-icon>
		    </mu-button>
		    <div style="display:flex;justify-content:center;color:cyan">{{$store.state.chatf.name}}</div>
		    <mu-button icon slot="right" >
		      <mu-icon value="dehaze" ></mu-icon>
		    </mu-button>
		</mu-appbar>
		<div class="chatbox">
			<div class="onemsg" :class="{right:onemsg.self}" v-for="(onemsg,i) in $store.state.allmsg" :key="i+1">
				<span class="msg" v-if="onemsg.self">
					<span>{{onemsg.msg}}</span>
				</span>
				<div class="head" v-if="onemsg.self">
					<img :src="onemsg.headimg" alt="1">
				</div> 
				<div class="head" v-if="!onemsg.self">
					<img :src="onemsg.headimg" alt="1">
				</div>
				<span class="msg" v-if="!onemsg.self">
					<span>{{onemsg.msg}}</span>
				</span>
			</div>
		</div>
		<footer>
			<div class="inputbox">
			<div class="text">
				<input type="text" class="inputbox">
			</div>
			<div class="btn" >
				<button class="btn" :class="{cannotuse:!content}">发送</button>
			</div>
			</div>
			<div class="functions">
				<mu-icon value="settings_voice"></mu-icon>
				<mu-icon value="photo"></mu-icon>
				<mu-icon value="camera_alt"></mu-icon>
				<mu-icon value="tag_faces"></mu-icon>
				<mu-icon value="add_circle_outline"></mu-icon>
			</div>
		</footer>
	</div>
</template>

<script>
	export default {
		data(){
			return{
                content:false,
			}
		},
		methods:{
			checkmsg(){
                
			},
            quit(){
            	this.$store.commit("showTabbar");
                this.$router.replace(this.$store.state.current);
            },
            tobottom(){
				let chatbox = document.getElementsByClassName('chatbox')[0];
				setTimeout(()=>{
	            		chatbox.scrollTop  += chatbox.scrollHeight; 
            	})
            },
            init(){
				let msgbox = document.getElementsByClassName('inputbox')[1];
				let chatbox = document.getElementsByClassName('chatbox')[0];
	            msgbox.onkeyup = ()=>{
	            	msgbox.value?this.content = true:this.content = false;
	            }
	            let button = document.getElementsByClassName('btn')[0];
	            button.onclick = ()=>{
	            	let json ={
	            		msg:msgbox.value,
	            		self:true,
	            		headimg:`../../../static/img/${this.$store.state.usermsg.name}.jpg`,
	            	}
	            	this.$store.commit('pushallmsg',json);
	            	this.$emit('sendmsg',msgbox.value);
	            	msgbox.value = '';
	            	this.content = false;
	            	this.tobottom();
	            }
            
            }
		},
		mounted(){		
			this.$store.commit("hideTabbar");
			setTimeout(()=>{
				this.init();
			})
		},
	}
</script>


<style scoped>
.Chat{
	height:100%;
}
.chatbox img{
    width:35px;
}
.inputbox{
	height: 50px;
	background-color: #EDEDED;
}
.inputbox{
	display: flex;
}
.text{
	height:50px;
	flex:5;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text input{
	padding: 0 15px;
	font-size:16px;
	outline: none;
	margin:0 10px;
	border:none;
	height: 30px;
	width: 100%;
	border-radius: 15px;
	background-color: white;
}
.btn{
	height: 50px;
	flex:1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn button{
    width: 100%;
    margin-right:10px;
    height: 35px;
    border:none;
    border-radius: 20px;
    background-color: #29b6f6;
    color: white;
}
button{
	outline: none;
}
.functions{
	padding-top:10px;
	padding-bottom:20px;
	height: 40px;
	display: flex;
	background-color: #EDEDED;
	justify-content: space-around;
	align-items: center;
}
footer{
	width:100%;
	position:fixed;
	bottom:0;
}
input{
    caret-color:#6495ED;
}


.chatbox{
	padding:0 5px;
	overflow: auto;
	padding-bottom: 90px;
	height: 100%;
	background-color: #F4F4F4;
	padding-top:50px;
}
.chatbox img{
	border-radius: 50%;
}
.onemsg{
	margin:8px 0;
	display: flex;
}
.msg{
	display: flex;
	align-items: center;
	padding: 0 15px;
	margin-bottom:10px;
	background-color: white;
	border-radius: 15px;
	max-width: 350px;
	flex-wrap: wrap;
}
.msg span{
	font-size: 16px;
	color: #333;
	max-width: 220px;
	word-wrap:break-word;
	padding:10px 0 ;
}
.onemsg.right{
	display: flex;
	justify-content: flex-end;
}
.onemsg.right .msg{
    margin-right:10px;
}
.onemsg .msg{
    margin-left:10px;
}
.btn button.cannotuse{
	background-color:lightblue;
	cursor: default;
}
</style>