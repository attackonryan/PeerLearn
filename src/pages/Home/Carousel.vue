<template>
	<div class="carousel">
		<mt-swipe :auto="4000">
		  <mt-swipe-item><img src="../../../static/img/advertisement1.jpg" alt=""></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/advertisement2.jpg" alt=""></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/advertisement3.jpg" alt=""></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/advertisement4.jpg" alt=""></mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		name:"Carousel",
		data(){
			return { 

			}
		},
		methods:{

		}
	}
</script>

<style scoped>
    .carousel{
    	height:180px;
    	overflow:hidden;
    }
    img{
    	height:100%;
    	width:100%;
    }
</style>