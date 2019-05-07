<template>
	<div class="found" style="height:100%;">
		<mu-container style="padding:0;height:100%;" >
			<mu-tabs :value.sync="active"indicator-color="#fff" text-color="rgba(0, 0, 0, .54)" color="rgb(41, 182, 246)" center >
				<mu-tab >最新</mu-tab>
				<mu-tab >热度</mu-tab>
				<mu-tab >关注</mu-tab>
			</mu-tabs>
		    <mu-flex justify-content="center" ref="wrapper" class="wrapper" >
			    <mu-paper :z-depth="1">
			      <mu-grid-list class="gridlist-demo"  v-loading="loading">
			        <mu-grid-tile v-for="tile, index in $store.state.foundlist" :key="index" :style="{height:innerheight}" 
			        @click.native="setvideo(tile)">
			          <img :src="tile.course.videoimg" width="100%" height="100%" alt="暂无封面">
			          <span slot="title">
				          <mu-avatar>
				          	   <img :src="tile.headimg" alt="">
				          </mu-avatar>
			          </span>
			          <span slot="subTitle"><b>{{tile.name}}</b></span>
			          <mu-button slot="action" icon style="font-size:12px;color:white;padding:0;width:60px;">
			            <mu-icon value="thumb_up" size="16"></mu-icon>
			            {{tile.course.thumb}}
			          </mu-button>
			        </mu-grid-tile>
			      </mu-grid-list>
			    </mu-paper>
			     <mu-alert color="info" class="topload":class="{appear:topappear}" style="position:absolute;justify-content:center;color:#42a5f5;background:white;height:40px;">
				    {{text}}
				  </mu-alert>
				  
			</mu-flex>
		</mu-container>
	</div>
</template> 

<script>
import BScroll from 'better-scroll'

	export default {
		name:"Found",
		data(){
			return{
				innerheight:'0px',
				text:"松开加载更多",
				loading:false,
				bottomappear:false,
				topappear:false,
				listscroll:{},
				active:0,
				list: [],
			}
		},
		methods:{
			setvideo(msg){
				this.$store.commit('setvideo',msg);
				this.$store.commit('hideTabbar');
				this.$router.replace('/video');
			},
			checklogin(){
                return this.getcookie('login');
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
            getrandomlist(){
            	this.$ajax.post('http://119.23.28.162:4040/randomlist',{}).then((res)=>{
                    this.$store.commit('setfoundlist',res.data);
                    this.loading = false;
					this.topappear = false;
					this.text = "松开加载更多"
            	})
            }
		},
		mounted(){
			this.$store.commit("changecurrent",'/found');
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
			}
			this.innerheight = (parseInt(window.innerHeight) - 100)/2 + 'px';
			if(this.$store.state.foundview == 0){this.getrandomlist();this.$store.commit('foundview')}
		},
		created(){
            this.$nextTick(()=>{
            	this.$refs.wrapper.style.height = (parseInt(window.innerHeight) - 108) + 'px';
            	this.listscroll = new BScroll(this.$refs.wrapper,{
            		 probeType: 2,
            		 click: true,
            	});
            	this.listscroll.on('scroll', (pos) => {
		            if(pos.y > 40){
                        this.topappear = true;
		            }/*else if(pos.y < -880){
	                    this.bottomappear = true;
		            }*/else{
		            	this.topappear = false;
		            	this.bottomappear = false;
		            }
	            });
	            this.listscroll.on("touchEnd",(pos)=>{
	            	if(pos.y > 40){
                        this.topappear = true;
		            	this.loading = true;
                        this.text = "正在加载";
                        this.getrandomlist();
		            }
		     //        if(pos.y < -880){
	         //         this.bottomappear = true;
		     //        	this.loading = true;
		     //        	this.text = "正在加载";
		     //        	setTimeout(()=>{
							// this.loading = false;
							// this.bottomappear = false;
							// this.text = "松开加载更多"
		     //        	},2000)
		     //        }
	            })
	            this.listscroll.on("scrollEnd",()=>{
	            	 this.listscroll.refresh();
	            })
			})
		}
	}
</script>

<style scoped>
.demo-text {
  background: #fff;
}
.mu-tab{
	height:48px;
}
.mu-grid-tile-wrapper{
	height:200px;
}
.wrapper{

}
.topload{
	visibility:hidden;
}
.topload.appear{
	visibility:visible;
}
.bottomload{
	visibility:hidden;
}
.bottomload.appear{
	visibility:visible;
}
.mu-alert{
	min-height:40px;
}
</style>