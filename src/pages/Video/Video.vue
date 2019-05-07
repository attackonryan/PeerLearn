<template>
	<div class="video">
		<video :src="$store.state.video.course.video"loop controls autoplay></video>
		<div class="topbar">
			<mu-icon value="keyboard_arrow_left" size="40" color="secondary" @click="quit"></mu-icon>
		</div>
		<div class="toprightbar">
			<mu-icon value="exit_to_app" size="40" color="#EE8262"></mu-icon>
		</div>
		<mu-avatar  size="50" class="head">
			<img :src="$store.state.video.headimg" alt="">
		</mu-avatar>
		<mu-icon value="thumb_up_alt" class="star" size="32" color="rgb(41, 182, 246)"></mu-icon>
		<mu-icon value="forum" class="comment" size="32" color="rgb(41, 182, 246)"></mu-icon>
		<mu-icon value="share" class="share" size="32" color="rgb(41, 182, 246)"></mu-icon>
	</div>	
</template>

<script>
export default {
	name:'plvideo',
	data(){
		return{
		}
	},
	methods:{
		quit(){
			this.$router.replace(this.$store.state.current);
			this.$store.commit('showTabbar');
		},
	},
	mounted(){
		setTimeout(()=>{
			let screen = document.getElementsByClassName('video')[0];
            screen.ontouchmove = (e)=>{
            	e.preventDefault();
            };
		})
		console.log(this.$store.state.video);
	}
}

</script>

<style scoped>
.video{
	width:100%;
	height:100%;
}
video{
	width:100%;
	height:100%;	
	object-fit:fill;
}
.topbar{
	position:absolute;
	top:10px;
	left:10px;
}
.toprightbar{
	position:absolute;
	top:10px;
	right:30px;
}
.head{
	position:absolute;
	right:25px;
	bottom:300px;
}
.star{
	position:absolute;
	right:34px;
	bottom:240px;
}
.comment{
	position:absolute;
	right:34px;
	bottom:170px;
}
.share{
	position:absolute;
	right:34px;
	bottom:110px;
}
</style>