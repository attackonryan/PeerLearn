<template>
	<div class="carousel">
		<ul class="items" ref="items">
			<li class="item "><img src="../../../static/img/advertisement1.jpg" width="100%" height="100%"alt="1"></li>
			<li class="item "><img src="../../../static/img/advertisement2.jpg" width="100%" height="100%"alt="2"></li>
			<li class="item "><img src="../../../static/img/advertisement3.jpg" width="100%" height="100%"alt="3"></li>
			<li class="item "><img src="../../../static/img/advertisement4.jpg" width="100%" height="100%"alt="4"></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:"Carousel",
		data(){
			return { 
				classarr : ["item1","item2","item3","item4"],
				itemsarr : [],
			}
		},
		methods:{
			initcarousel(){
				let length = this.itemsarr.length;
				for(let i = 0 ; i < length ; i++){
					this.itemsarr[i].className = "item" + " " + this.classarr[i];
				}
			},
			updatecarousel(direction){
				if(direction < 0){                             //负数向左滑动
					let classname = this.classarr.pop();
					this.classarr.unshift(classname);
				}else{
					let classname = this.classarr.shift();
					this.classarr.push(classname); 
				}
				this.initcarousel();
			}	
		},
		mounted(){
            this.itemsarr = this.$refs.items.children;
            this.initcarousel();
            let timeid = setInterval(()=>{
		    	this.updatecarousel(-1);                             //向右滑动
		    },4000);
            let content = document.getElementsByClassName("items")[0];
		    content.onclick = (e)=>{
			    clearInterval(timeid);
		    	let direction = "";
			    if(e.target.parentNode.className.includes("item3")){
			    	this.updatecarousel(-1);
			    	direction = -1;
			    }else if(e.target.parentNode.className.includes("item1")){
			    	this.updatecarousel(1);
			    	direction = 1;
			    }
			    setTimeout(()=>{
		            timeid = setInterval(()=>{
		            	this.updatecarousel(direction);
		            },4000);
			    },0);
		    }
		}
	}
</script>

<style scoped>
    .carousel{
	height: 200px;
	width:100%;
	}
	.items{
		position: relative;
	    top:20px;
		height: 160px;
	}
	.item{
		list-style: none;
	    width: 60%;
	    height: 160px;
	    position: absolute;
	}
	.item1{
		opacity: 0.5;
		left:-20%;
		transition: all 0.5s;
	}
	.item2{
		transition: all 0.5s;
		left:20%;
		z-index: 5;
		opacity: 1;
		transform-origin:50% 50%;
		transform: scale(1.25);
	}
	.item3{
		opacity: 0.5;
		transition: all 0.2s;
		left:60%;
		z-index: 1;
	}
	.item4{
		transition: all 0.2s;
		left:100%;
		opacity:0;
		z-index:-1;
	}
</style>