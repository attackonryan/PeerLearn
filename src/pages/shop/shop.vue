<template>
	<div class="shop">
		<mu-appbar color="rgb(41, 182, 246)" class="shoptop" style="position:fixed;top:0;width: 100%;z-index:999;">
		  <mu-button icon slot="left" @click="goback">
		    <mu-icon value="keyboard_arrow_left"></mu-icon>
		  </mu-button>
		  课程详情
		  <mu-button flat slot="right">
		  	<mu-icon value="share"></mu-icon>
		  </mu-button>
		</mu-appbar>
		<div class="video" style="width:100%;height:200px;margin-top:40px;">
		  	<img :src="$store.state.shopcourse.image" alt="" width="100%" height="100%">
	    </div>
	    <div class="body">
	    	<mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  full-width>
			    <mu-tab>介绍</mu-tab>
			    <mu-tab>评价</mu-tab>
			</mu-tabs>
			<div class="main" style="margin-bottom:60px;" v-show="active === 0">
				<mu-paper :z-depth="2">
				    <mu-sub-header style="font-size:20px;font-weight:bolder;">{{$store.state.shopcourse.title}}</mu-sub-header>
				    <mu-sub-header>{{$store.state.shopcourse.collection}}人收藏，0人学过</mu-sub-header>
				    <mu-divider></mu-divider>
				    <mu-sub-header>￥{{$store.state.shopcourse.price}}</mu-sub-header>
				</mu-paper>
				<br>
				<mu-paper :z-depth="2">
					<mu-sub-header style="font-size:20px;font-weight:bolder;">课程简介</mu-sub-header>
					<mu-sub-header style="word-wrap:break-word;width:90%;text-indent:2em">
						{{$store.state.shopcourse.intro}}
					</mu-sub-header>
					<mu-divider></mu-divider>
					<mu-sub-header style="word-wrap:break-word;width:90%;">
						时间：{{$store.state.shopcourse.time}}
					</mu-sub-header>
					<mu-divider></mu-divider>
					<mu-sub-header style="word-wrap:break-word;width:90%;">
						地点：{{$store.state.shopcourse.place}}
					</mu-sub-header>
					<mu-divider></mu-divider>
					<mu-sub-header style="word-wrap:break-word;width:90%;">
						老师想说：{{$store.state.shopcourse.say}}
					</mu-sub-header>
				</mu-paper>
				<br>
				<mu-paper :z-depth="2">
						<mu-sub-header style="color:black;font-size:16px;">主讲老师</mu-sub-header>	
						<mu-sub-header style="color:black;padding-bottom:5px;">
							<mu-avatar style="vertical-align:middle;">
								<img :src="head" alt="">
							</mu-avatar>
							{{$store.state.shopcourse.author}}
						</mu-sub-header>
				</mu-paper>
				<br>
                <mu-container class="button-wrapper" style="display:flex;padding:0;background:white;margin-top:2px;">
				  <mu-button color="#f40" style="flex:8;margin-right:1px;border-radius:0;min-width:120px">立即购买</mu-button>
				 
				</mu-container>
				<mu-container class="button-wrapper" style="display:flex;padding:0;background:white;margin-top:2px;">
					 <mu-button color="#ff9800" style="flex:2;margin-right:1px;min-width:105px;border-radius:0;">加入购物车</mu-button>
				 <mu-button  color="#ff9800" style="flex:1;min-width:60px;border-radius:0;margin-right:1px">收藏</mu-button>
				  <mu-button  color="#ff9800" style="flex:1;min-width:60px;border-radius:0;">咨询</mu-button>    
				</mu-container>

			</div>
			<div class="assess" style="margin-bottom:56px;" v-show="active === 1">
				<mu-paper :z-depth="2">
					<mu-sub-header style="height:40px">评价该课程</mu-sub-header>
					<mu-sub-header style="display:flex;justify-content:center;align-items:center;height:40px;padding-bottom:30px;"><mu-icon value="star" color="#b0bec5"></mu-icon><mu-icon value="star" color="#b0bec5"></mu-icon><mu-icon value="star" color="#b0bec5"></mu-icon><mu-icon value="star" color="#b0bec5"></mu-icon><mu-icon value="star" color="#b0bec5"></mu-icon></mu-sub-header>
				</mu-paper>
				<br>
				<mu-paper :z-depth="2">
					<mu-sub-header>全部评价<span style="position:absolute;right:0;margin-right:12px;">5.0分</span></mu-sub-header>
                    <mu-container>
                    	 <mu-list textline="two-line" v-for="(tile,i) in $store.state.shopcourse.access" :key="i">
						    <mu-list-item avatar button :ripple="false">
						      <mu-list-item-action>
						        <mu-avatar>
						          <img :src="tile.headimg" alt="">
						        </mu-avatar>
						      </mu-list-item-action>
						      <mu-list-item-content>
						        <mu-list-item-title>{{tile.writer}}</mu-list-item-title>
						        <span style="word-wrap:break-word">{{tile.content}}</span>
						      </mu-list-item-content>
						     </mu-list-item>
						     <mu-divider></mu-divider>
						  </mu-list>
                    </mu-container>
				</mu-paper>
			</div>
	    </div> 
		  
	</div>
</template>

<script>
	
export default {
	name:"shop",
	data(){
		return {
            active:0,
            window:window,
		}
	},
	methods:{
		ready(callback,window){
		  // 如果jsbridge已经注入则直接调用
		  if (window.AlipayJSBridge) {
		    callback && callback();
		  } else {
		    // 如果没有注入则监听注入的事件
		    document.addEventListener('AlipayJSBridgeReady', callback, false);
		  }
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
        goback(){
        	this.$router.replace(this.$store.state.current);
        }
	},
	computed:{
		head(){
			return `../../../static/img/${this.$store.state.shopcourse.author}.jpg`
		}
	},
	mounted(){
		if(this.checklogin() !== "true"){
            this.$router.replace('/login');
		}else{
			
		}
		// this.ready(function(){console.log('ok')},this.window);
	}
}
</script>

<style scoped>
.shoptop{
	height:40px;
}
</style>