<template>
	<div class="Classblock" >
		<mu-container >
		  <mu-flex justify-content="center">
		    <mu-paper :z-depth="1">
		      <mu-appbar color="#F5DEB3" style="background:#A4D3EE;">
                <span style="font-size:14px;padding:0;color:#ffe">课程推荐</span>
		        <mu-button icon slot="right" style="color:#FFFFFF;height:35px;"> 
		          more
		        </mu-button>
		      </mu-appbar>
		      <mu-grid-list class="gridlist-demo" style="margin:0;height:1200px;">
		        <mu-grid-tile v-for="tile, index in $store.state.hotcourses" :key="index" style="padding:2px 0;height:150px" :title="tile.title" :cols="cols" @click="tocourse(tile.title,tile.author)">
		          <img :src="tile.image" width="100%" height="100%">
		          <span slot="subTitle">by <b>{{tile.author}}</b></span>
		          <mu-button slot="action" icon>
		            <mu-icon value="star_border"></mu-icon>
		          </mu-button>
		        </mu-grid-tile>
		      </mu-grid-list>
		    </mu-paper>
		  </mu-flex>
		</mu-container>
		<mu-container>
		  <mu-flex justify-content="center">
		    <mu-paper :z-depth="1">
		    	<mu-appbar color="#F5DEB3" style="margin-top:2px;margin-bottom:4px;background:#87CEFA;box-shadow:0 -2px 5px #79CDCD,0 2px 5px #6495ED">	
		    			<mu-icon slot="left" style="padding-left:10px;" color="blue" value="all_inclusive"></mu-icon>
                <span style="font-size:14px;padding:0;color:#333;vertical-align:4px">猜你喜欢</span>
		        <mu-button icon slot="right" @click="reloadinterest()" style="color:#555;padding-bottom:15px;width:70px;height:35px">
		          换一批
		        </mu-button>
		      </mu-appbar>
		      <mu-grid-list ref="test" class="gridlist-demo" :class="{overlay:isonreloadinterest}" style="margin:0;margin-bottom:52px;height:310px;">
		      	<mt-spinner type="double-bounce" :class="{
		      	loading:isonreloadinterest,
		      	loadingdefault:!isonreloadinterest
		        }"  ></mt-spinner>
		        <mu-grid-tile v-for="tile, index in $store.state.likecourses" :key="index" style="padding:0px 0px;height:150px;" :title="tile.title"
		        :cols="cols" @click="tocourse(tile.title,tile.author)">
		          <img :src="tile.image" width="100%" height="100%">
		          <span slot="subTitle">by <b>{{tile.author}}</b></span>
		          <mu-button slot="action" icon>
		            <mu-icon value="star_border"></mu-icon>
		          </mu-button>
		        </mu-grid-tile>
		      </mu-grid-list>
		    </mu-paper>
		  </mu-flex>
		</mu-container>
		<mu-snackbar position="bottom" color="yellow" :open.sync="reloadmsgopen">
			<mu-icon left value="priority_high"></mu-icon>
		    暂无新数据
		    <mu-button flat slot="action" color="#fff" @click="reloadmsgopen = false">Close</mu-button>	    
		</mu-snackbar>
	</div>
</template>




<script>
	export default{
		data(){
			return{
				reloadmsgopen:false,
				cols:2,
				isonreloadinterest:false,
			}
		},
		methods:{
			tocourse(title,author){
				this.$router.replace('/shop');
				this.$ajax.post("http://119.23.28.162:4040/getcoursemsg",{
					title,
					author,
				}).then(res=>{
					this.$store.commit('setshopcourse',res.data);
				})
			},
			reloadlikecourses(){
				this.$ajax.post("http://119.23.28.162:4040/getnewlikecourses",{}).then(res=>{
					if(res.data.length === 0){
						this.openNormalSnackbar();
					}
					this.isonreloadinterest = false;
					this.$store.commit('setlikecourses',res.data);

				})
			},
			reloadhotcourses(){
				this.$ajax.post("http://119.23.28.162:4040/gethotcourses",{}).then(res=>{
					this.$store.dispatch('sethotcourse',res.data);
				})
			},
			openNormalSnackbar () {
		      this.reloadmsgopen = true;
		      setTimeout(() => {
		        this.reloadmsgopen  = false;
		      }, 2000);
		    },
			reloadinterest(){
				this.isonreloadinterest = true;
	            this.reloadlikecourses();
			}
		},
		mounted(){
			this.reloadhotcourses();
			this.reloadlikecourses();
		}
	}
</script>

<style scoped>
	.loadingdefault{
		display:none;
	}
	.loading{
		position:absolute;
		z-index:6;
		right:0px;
        top:1622px;
	}
    .overlay:before{
    	content:"";
    	position:absolute;
    	width:100%;
    	height:450px;
    	background:rgba(135,206,250,0.8);
    	z-index:5;
    }
	.gridlist-demo{
	  width: 100%;
	  height: 450px;
	  overflow-y: auto;
	}
	.mu-paper{
		width:100%;
	}
	.mu-appbar{
	
		height:35px;

	}
	.container{
		box-shadow:0 -2px 4px -1px #64b5f6;
		max-width:1440px;
		padding:0;
	}
	.Classblock{
		margin-top:6px;
		margin-bottom:0px;
	}
	.mu-icon-button{
		font-size:14px;
		width:80px;
	}
	.mu-grid-tile-title{
		width:120px;
		font-size:12px;
	}
	.mu-grid-tile-titlebar{
		height:40px;
	}
	.demo-loading-wrap {
	  height: 300px;
	  position: relative;
	}
	.mu-button {
	    margin: 6px 8px;
	}
	.mu-grid-tile-title-container{
		width:150px;
	}

</style>