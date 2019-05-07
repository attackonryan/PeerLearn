<template>
	<div class="Message">
		<mu-paper :z-depth="1" class="demo-list-wrap" >
		  <mu-appbar color="lightBlue400" v-show="!issearch" style="height:46px;">
		    <mu-button icon slot="left" @click="open=true">
		      <mu-icon value="menu"></mu-icon>
		    </mu-button>
		    消息
		    <mu-button icon slot="right" @click.native="opensearchbox()">
		      <mu-icon value="search" ></mu-icon>
		    </mu-button>
		  </mu-appbar>
		  <mu-appbar color="lightBlue400" v-show="issearch">
		    <mu-button icon slot="left" @click="open=false">
		      <mu-icon value="menu"></mu-icon>
		    </mu-button>
		    <div>
		    	<input list="people"type="text" class="searchbox" placeholder="搜寻" style="font-size:16px;border:none;outline:none;height:100%;background-color:#29b6f6;color:white">
		    	<datalist id="people">
		    		<option v-for="(friend,index) of friends" :key="index" :value="friend.name"></option>
		    		<option value="邻学一线平台客服"></option>
		    	</datalist>
		    </div>
		    <mu-button icon slot="right" @click="issearch = false">
		      <mu-icon value="cancel"></mu-icon>
		    </mu-button>
		  </mu-appbar>
		  <mu-list>
		    <mu-sub-header>学生</mu-sub-header>
		    <mu-list-item avatar button :ripple="false" v-for="(friend,index) of friends" :key="index"@click="Chat(friend)">
		      <mu-list-item-action>
		        <mu-avatar>
		          <img :src="friend.imghead">
		        </mu-avatar>
		        </mu-list-item-action>
			 	  <mu-list-item-title>{{friend.name}}</mu-list-item-title>
		        <mu-list-item-action>
		        <mu-icon value="chat_bubble" :color="friend.online"></mu-icon>
		      </mu-list-item-action>
		    </mu-list-item>
		  </mu-list>
		  <mu-divider></mu-divider>
		  <mu-list textline="two-line">
		    <mu-sub-header>老师</mu-sub-header>
		    <mu-list-item avatar button :ripple="false">
		      <mu-list-item-action>
		        <mu-avatar>
		          <img src="../../../static/img/killerteacher.jpg">
		        </mu-avatar>
				</mu-list-item-action>
					<mu-list-item-title>s老师</mu-list-item-title>
				<mu-list-item-action>
		        <mu-icon value="chat_bubble"></mu-icon>
		      </mu-list-item-action>
		    </mu-list-item>
		  </mu-list>
		  <mu-list>
		    <mu-sub-header>客服</mu-sub-header>
		    <mu-list-item avatar button :ripple="false" @click="Chat({name:'领学娘'})">
		      <mu-list-item-action>
		        <mu-avatar>
		          <img src="../../../static/img/favicon-big.png">
		        </mu-avatar>
		      </mu-list-item-action>
		      <mu-list-item-title>邻学一线平台客服</mu-list-item-title>
		      <mu-list-item-action>
		        <mu-icon value="chat_bubble" color="lightblue"></mu-icon>
		      </mu-list-item-action>
		    </mu-list-item>
		  </mu-list>
		</mu-paper>
		<mu-drawer :open.sync="open" :docked="docked">
			<mu-container style="display:flex;justify-content:center;align-items:center;margin-top:15px;">
				<mu-avatar size="60" color="white" style="">
					<img src="../../../static/img/favicon-big.png" alt="">
				</mu-avatar>
			</mu-container>	
		    <mu-list>
		      <mu-list-item button>
		        <mu-list-item-title >添加好友</mu-list-item-title>
		      </mu-list-item>
		      <mu-list-item button>
		        <mu-list-item-title >删除好友</mu-list-item-title>
		      </mu-list-item>
		      <mu-list-item button>
		        <mu-list-item-title >好友请求</mu-list-item-title>
		      </mu-list-item>
		      <mu-list-item button>
		        <mu-list-item-title >黑名单</mu-list-item-title>
		      </mu-list-item>
		      <mu-list-item  @click="open = false" button>
		        <mu-list-item-title>关闭</mu-list-item-title>
		      </mu-list-item>
		    </mu-list>
		</mu-drawer>
	</div>
</template>

<script>
	export default {
		name:"Message",
		data(){
			return{
				searchinput:"",
				issearch:false,
				docked:false,
				open:false,
				friends:[],
			}
		},
		methods:{
			Chat(f){
				this.$store.commit("setChatf",f);
				this.$emit("chat",f.name,this.$store.state.usermsg.name);
                this.$router.replace('/chat');
                
			},
			opensearchbox(){
				this.issearch = true;
				setTimeout(()=>{
					document.getElementsByClassName("searchbox")[0].focus();
				},50)
			},
			getcookie(str){
                let data;
                document.cookie.split("; ").forEach((v,i)=>{
                    if(v.split('=')[0] === str){
                        data = v.split('=')[1];
                    }
                })
                return data;
            },
			checklogin(){
                return this.getcookie('login');
            },
            checkisonline(){
            	this.friends.forEach((v,i)=>{
            		this.$ajax.post("http://119.23.28.162:4040/checkonline",{
						name:v.name,
					}).then((res)=>{
						if(res.data == true){
		                    	v.online = "lightblue";
		                    }else{
		                    	v.online = "rgba(0,0,0,.54)";
		                }
					})
            	})
				
            },
            getfriends(){
            		this.$ajax.post('http://119.23.28.162:4040/getfriends',{
                	tel:this.$store.state.usermsg.tel,
                }).then((res)=>{
                	this.$store.commit("setfriends",res.data);
                    this.friends = res.data.map((v,i)=>{
	                    let json = {};
	                    json.name = v;
	                    json.imghead = `../../../static/img/${v}.jpg`;
                        if(this.checkisonline(v) === "true"){
	                    	json.online = "lightblue";
	                    }else{
	                    	json.online = "rgba(0,0,0,.54)";
	                    }
	                    return json;

                    })
                     this.checkisonline(); 
                })
                    	
            }
		},
		mounted(){
			this.$store.commit("changecurrent",'/message');
			if(this.checklogin() !== "true"){
                this.$router.replace('/login');
			}else{
				let msg = {
                    name : `${this.getcookie('name')}`,
                    tel : `${this.getcookie('tel')}`,
                    email : `${this.getcookie('email')}`,
                    sex : `${this.getcookie('sex')}`,
                }
                this.$store.state.usermsg = msg;
                //cookie保存
                this.getfriends();
			}
		}
	}
</script>

<style scoped>
.demo-list-wrap {
  width: 100%;
}
.Message{
	margin-bottom:56px;
}

input::-webkit-calendar-picker-indicator{
	display: none;
	-webkit-appearance: none;
}
</style>