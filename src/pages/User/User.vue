<template>
	<div class="user">
        <div class="head">
            <div class="sign">
                <mu-icon value="assignment" size="30" color="white">
                </mu-icon>
                <span>课堂</span>
                <span>签到</span>
            </div>
            <div class="center">
                <mu-avatar size="60" color="white">
                    <img :src="imghead" alt="" v-if="!$store.state.login">
                    <img :src="img" alt="" v-if="$store.state.login">
                </mu-avatar>
                <div style="font-size:18px;">{{$store.state.usermsg.name}}</div>
                <mu-button flat color="white" style="font-size:12px;" v-if="$store.state.login">
                  <mu-icon left value="home" size="18"></mu-icon>
                  进入主页
                </mu-button>
                <mu-button flat color="white" style="font-size:12px;" v-if="!$store.state.login" @click="Login()">
                  <mu-icon left value="cloud_queue" size="18"></mu-icon>
                  立刻登陆
                </mu-button>
            </div>
            <div class="setting" @click="opensetting()">
                <mu-icon value="settings" size="30" color="white">
                    
                </mu-icon>
                <span>设置</span>
            </div>
        </div>
        <div class="body">
            <div class="item">
                <mu-icon value="star" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>我的收藏</div>
            </div>
            <div class="item">
                <mu-icon value="shopping_cart" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>购物车</div>
            </div>
            <div class="item">
                <mu-icon value="history" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>浏览历史</div>
            </div>
            <div class="item">
                <mu-icon value="person" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>会员</div>
            </div>
            <div class="item">
                <mu-icon value="date_range" size="30" color="#00bfa5"></mu-icon>
                <div>我的订单</div>
            </div>
            <div class="item">
                <mu-icon value="watch_later" size="30" color="#00bfa5"></mu-icon>
                <div>待上课</div>
            </div>
            <div class="item">
                <mu-icon value="assessment" size="30" color="#00bfa5"></mu-icon>
                <div>待评价</div>
            </div>
            <div class="item">
                <mu-icon value="person_pin" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>身份认证</div>
            </div>
            <div class="item">
                <mu-icon value="credit_card" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>我的卡券</div>
            </div>
            <div class="item">
                <mu-icon value="vpn_key" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>我的成就</div>
            </div>
            <div class="item" @click="openBotttomShareSheet()">
                <mu-icon value="share" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>分享</div>
            </div>
            <div class="item">
                <mu-icon value="face" size="30" color="#00bfa5">
                    
                </mu-icon>
                <div>我要当老师</div>
            </div>
            
            <div class="social-share" data-sites="weibo, qq, qzone,douban"></div>
        </div>
        <mu-drawer :open.sync="settingopen" :docked="docked" right style="width:100%;">
            <mu-container style="display:flex;justify-content:center;align-items:center;margin-top:15px;">
                <mu-avatar size="60" color="white" style="">
                    <img src="../../../static/img/favicon-big.png" alt="">
                </mu-avatar>
            </mu-container> 
            <mu-list>
              <mu-sub-header style="font-size:20px;text-align:center;padding:0">设置</mu-sub-header>
              <mu-list-item avatar button :ripple="false">
                <mu-list-item-title>个人信息</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon value="chevron_right"></mu-icon>
                </mu-list-item-action>
                </mu-list-item>
              <mu-list-item button>
                <mu-list-item-title >换绑手机</mu-list-item-title>
                <mu-list-item-sub-title>{{$store.state.usermsg.tel | telfilter}}</mu-list-item-sub-title>  
                <mu-list-item-action class="sp">
                  <mu-icon value="chevron_right" ></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-title >修改密码</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon value="chevron_right"></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-title >支付管理</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon value="chevron_right"></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
              <br/>
              <mu-list-item button>
                <mu-list-item-title >关于我们</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon value="chevron_right"></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
              <br/>
              <mu-container style="display:flex;align-items:center;justify-content:center;">
                <mu-button color="primary" style="flex:1" @click="quit()">退出登录</mu-button>
              </mu-container>
              <br/>
              <mu-container style="position:absolute;top:6px;">
                <mu-button fab small color="primary" @click="settingopen = false;">
                    <mu-icon value="chevron_left" size="25"></mu-icon>
                  </mu-button>
              </mu-container>
            </mu-list>
        </mu-drawer>
        <mu-bottom-sheet :open.sync="openshare">
            <mu-list @item-click="closeBottomShareSheet">
              <mu-sub-header>分享到</mu-sub-header>
              <mu-list-item button @click="share('qzone')">
                <mu-list-item-action>
                  <mu-icon value="grade" color="orange"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>QQ空间</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button @click="share('qq')">
                <mu-list-item-action>
                  <mu-icon value="grade" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>QQ</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button @click="share('douban')">
                <mu-list-item-action>
                  <mu-icon value="grade" color="green"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>豆瓣</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button @click="share('weibo')">
                <mu-list-item-action >
                  <mu-icon value="grade" color="cyan"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>微博</mu-list-item-title>
              </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        <mu-snackbar position="top" color="success" :open.sync="quitsuccess">
            <mu-icon left value="check_circle"></mu-icon>
            注销成功
            <mu-button flat slot="action" color="#fff" @click="quitsuccess = false">Close</mu-button>      
        </mu-snackbar>
        <mu-snackbar position="top" color="warning" :open.sync="isloginsnackbar">
            <mu-icon left value="priority_high"></mu-icon>
            您尚未登录
            <mu-button flat slot="action" color="#fff" @click="isloginsnackbar = false">Close</mu-button>      
        </mu-snackbar>
	</div>
</template>

<script>
	export default {
		name:"User",
		data(){
			return {
                isloginsnackbar:false,
                quitsuccess:false,
                settingopen:false,
                docked:false,
                img:"",
                picBaseURl:"../../../static/img/",
                imghead:`../../../static/img/favicon.ico`,
				openshare :false,
			}
		},
        filters:{
            telfilter(str){
                return str.replace(/(^[\d]{3})[\d]{5}/,"$1*****");
            },
        },
		methods:{
            opensetting(){
                if(this.$store.state.login){
                    this.settingopen = true;
                }else{
                    this.isloginsnackbar = true;
                }
            },
            quit(){
                this.$ajax.post("http://119.23.28.162:4040/setoffline",{
                    name:this.getcookie('name'),
                })
                function clearAllCookie() {
                    var date=new Date();
                    date.setTime(date.getTime()-10000);
                    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (keys) {
                        for (var i =  keys.length; i--;)
                          document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
                    }
                }
                clearAllCookie();
                this.$store.commit('quit');
                this.quitsuccess = true;
                setTimeout(()=>{
                    this.$router.replace("/login");
                },2000);    
            },
            Login(){
                this.$router.replace("/login");
            },
            share(str){
                if(str === "qq"){
                    window.open("https://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2F119.23.28.162%2F%23%2Fuser&title=%E9%82%BB%E5%AD%A6%E4%B8%80%E7%BA%BF&source=http%3A%2F%2Fovertrue&desc=%E6%9C%8B%E8%BE%88%E5%AD%A6%E5%A8%B1%E5%B9%B3%E5%8F%B0%20%E9%82%BB%E5%AD%A6%E4%B8%80%E7%BA%BF%EF%BC%8C%E8%8B%B1%E6%96%87%E5%90%8D%20PeerLearn&pics=","_blank"); 
                }else if(str === "qzone"){
                    window.open("https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2F119.23.28.162%2F%23%2Fuser&title=%E9%82%BB%E5%AD%A6%E4%B8%80%E7%BA%BF&desc=%E6%9C%8B%E8%BE%88%E5%AD%A6%E5%A8%B1%E5%B9%B3%E5%8F%B0%20%E9%82%BB%E5%AD%A6%E4%B8%80%E7%BA%BF%EF%BC%8C%E8%8B%B1%E6%96%87%E5%90%8D%20PeerLearn&summary=%E6%9C%8B%E8%BE%88%E5%AD%A6%E5%A8%B1%E5%B9%B3%E5%8F%B0%20%E9%82%BB%E5%AD%A6%E4%B8%80%E7%BA%BF%EF%BC%8C%E8%8B%B1%E6%96%87%E5%90%8D%20PeerLearn&site=http%3A%2F%2Fovertrue","_blank");
                }else if(str === "weibo"){
                    window.open("http://service.weibo.com/share/share.php?url=http%3A%2F%2F119.23.28.162%2F%23%2Fuser&title=邻学一线&pic=&appkey=","_blank")
                }else if(str === "douban"){
                    window.open("https://www.douban.com/share/service?href=http%3A%2F%2F119.23.28.162%2F%23%2Fuser&name=邻学一线&text=朋辈学娱平台%20邻学一线，英文名%20PeerLearn&image=&starid=0&aid=0&style=11","_blank");
                }
            },
            closeBottomShareSheet () {
                this.openshare = false;
            },
            openBotttomShareSheet () {
                this.openshare = true;
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
            setimg(){
                this.img = `../../../static/img/${this.$store.state.usermsg.name}.jpg`
            }
		},
        mounted(){
            this.$store.commit("changecurrent",'/user');
            if(this.checklogin() == 'true'){
                let msg = {
                    name : `${this.getcookie('name')}`,
                    tel : `${this.getcookie('tel')}`,
                    email : `${this.getcookie('email')}`,
                    sex : `${this.getcookie('sex')}`,
                }
                this.$store.state.usermsg = msg
                this.$store.state.login = true;
                this.setimg();
            }
        }
	}
</script>

<style scoped>
    .social-share{
        visibility:hidden;
    }
    .user{
        height:100%;
        width:100%;
        background-image:url(../../../static/img/bg-user.jpg);
        background-size:100% 100%;
        font-size:12px;

    }
    .head{

        display:flex;
        height:20.5%;
        justify-content:space-between;
    }
    .sign,
    .setting{
        padding:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .center{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    .body{
        display:flex;
        flex-wrap:wrap;
    }
    .item i{
        opacity:0.8;
    }
    .body .item{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:25%;
        height:100px;
    }
    .item div{
        margin:5px 0;
    }
    .sp.mu-item-action{
        justify-content:flex-end;
    }
    .mu-item-sub-title{
        text-align:right;
    }
</style>