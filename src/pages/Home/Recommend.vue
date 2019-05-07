<template>
	<div class="recommend">
		<div class="wrapper">
			<div class="item">
				<div class="round">
			        <mu-icon value="directions_bike" size="30" color="#7986cb"></mu-icon>	
				</div>
				<span>运动</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="music_note" size="30" color="#9575cd"></mu-icon>	
				</div>
				<span>音乐</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="color_lens" size="30" color="#64b5f6"></mu-icon>
				</div>
				<span>艺术</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="code" size="30" color="#ba68c8"></mu-icon>
				</div>
				<span>编程</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="language" size="30" color="#f06292"></mu-icon>
				</div>
				<span>语言</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="group" size="30" color="#e57373"></mu-icon>
				</div>
				<span>学习辅导</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="desktop_windows" size="30" color="#4fc3f7"></mu-icon>
				</div>
				<span>软件教学</span>
			</div>
			<div class="item">
				<div class="round">
					<mu-icon value="motorcycle" size="30" color="#4dd0e1"></mu-icon>
				</div>
				<span>潮能力</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"Recommend",
		data(){
			return {

			}
		},
		methods:{

		}
	}
</script>

<style scoped>
    .recommend{
    	padding:10px;
	   	background-color:#fff;
    }
    .wrapper{
	   	display:flex;
	   	flex-wrap:wrap;
	   	justify-content:center;
	   	align-items:center;
	   	font-size:12px;
	   	font-weight:lighter;
    }
    .item{
    	display:flex;
    	flex-direction:column;
    	flex:25%;
		justify-content:center;
	   	align-items:center;
    }
    .round{
    	display:flex;
    	justify-content:center;
	   	align-items:center;
    	width:50px;
    	height:50px;
    	background-color:white;
    	border-radius:50%;
    	border:1px solid #AEEEEE;
    }
</style>