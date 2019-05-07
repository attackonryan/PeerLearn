<template>
		<div class="search">
			<a href="" class="search-nav-icon" @click.prevent="$emit('changeSearch')">
				<img src="/static/img/search.png" width="16px" height="16px" alt="">
				<span>搜你所想</span>
			</a>
		</div>
</template>

<script>
    
	export default {
		name:"Home",
		data(){
			return{

			}
		},
		methods:{
	
		}
	}
</script>

<style scoped>
    a{
    	color:#888;
    	opacity:1;
    	text-decoration:none;
    	font-weight:light;
    }
    .search{
        z-index:200;
    	display:flex;
    	justify-content:center;
	    align-items:center;
    	width:100%;
    	height:40px;
    	background:linear-gradient(to right,#2196f3,#64b5f6,#2196f3);
    }
    .search > .search-nav-icon{
		display:flex;
		border:1px solid white;
		width:100%;
		margin:0 10px;
		height:30px;
	    justify-content:center;
	    align-items:center;
	    color:white;
    }

    

</style>