<template>
    <div class="bottom-tab" v-show="$store.state.Tabbar">
    	<mu-container style="width:100%;position:fixed;bottom:0;left:0;margin:0;height:52px;">
          <mu-bottom-nav :value.sync="shift" shift ripple>
            <mu-bottom-nav-item value="home" title="首页" icon="domain" @touchend.native="switchTo('/home')"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="found" title="发现" icon="stars" @touchend.native="switchTo('/found')"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="message" title="消息" icon="forum" @touchend.native="switchTo('/message')"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="user" title="账号" icon="accessibility_new" @touchend.native="switchTo('/user')"></mu-bottom-nav-item>
          </mu-bottom-nav>
        </mu-container>
    </div>
</template>

<script>
    export default{
    	name:"TabBar",
        data(){
            return{
                shift:'home',
                on:1,
                onpick:{
                    '/home':1,
                    '/found':2,
                    '/message':3,
                    '/user':4
                },
                onname:{
                    '/home':'home',
                    '/found':'found',
                    '/message':'message',
                    '/user':'user'
                }
            }
        },
        methods:{
            switchTo(path){
                this.on = this.onpick[path];
                this.$router.replace(path);

            },
            reseton(path){
                this.on = this.onpick[path];
            }
        },
        mounted(){
            this.reseton(this.$router.currentRoute.fullPath);
            this.shift = this.onname[this.$router.currentRoute.path];
        }
    }
</script>

<style scoped>
    .container{
        margin:0;
        padding:0;   
        box-shadow:0 -2px 6px white; 
        z-index:10;
        align-items:center;
    }
    @media (min-width: 1200px){
       .container {
        max-width: 2000px;
    }
    }
    .mu-bottom-nav{
        height:52px;
    }
    .mu-bottom-item,
    .mu-bottom-item-active {
        padding:4px;
        padding-top:2px;
    }

</style>