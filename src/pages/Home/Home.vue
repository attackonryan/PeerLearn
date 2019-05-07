<template>
	<div class="home">
		<search v-show="issearch" @changeSearch="changeSearch"></search>
		<SearchPanel v-show="!issearch" @changeSearch="changeSearch"></SearchPanel>
		<Carousel v-show="issearch"></Carousel>
		<Recommend v-show="issearch"></Recommend>
		<Recommend2 v-show="issearch"></Recommend2>
	</div>
</template>

<script>
    import Search from "./Search"
    import SearchPanel from "./SearchPanel"
    import Carousel from "./Carousel"
    import Recommend from "./Recommend"
    import Recommend2 from "./Recommend2"
	export default {
		name:"Home",
		data(){
			return{
				issearch:true
			}
		},
		components:{
			Search,
			SearchPanel,
			Carousel,
			Recommend,
			Recommend2,
		},
		methods:{
			changeSearch(){
				this.issearch = !this.issearch;
			}
		},
		mounted(){
			this.$store.commit('changecurrent',"/home");
		}
	}
</script>

<style scoped>
    .home{
    	overflow:scroll;
    }

</style>