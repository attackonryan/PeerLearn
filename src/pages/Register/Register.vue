<template>
	<div class="reg">
		<mu-container class="head">
		  <mu-appbar style="width: 100%;padding:0;"  color="primary" title="即刻成为邻学一线er"></mu-appbar>
		</mu-container>
		<mu-container class="body">
		  <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
		    <mu-form-item prop="input" label="用户名">
		      <mu-text-field v-model="form.name"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item label="密码" prop="password" >
		        <mu-text-field type="password" v-model="form.psw1" prop="password"></mu-text-field>
		    </mu-form-item>
		     <mu-form-item label="确认密码" prop="password">
		        <mu-text-field type="password" v-model="form.psw2" prop="password"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item prop="input" label="电话">
		      <mu-text-field v-model="form.tel"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item prop="input" label="邮箱">
		      <mu-text-field v-model="form.email"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item prop="radio" label="性别">
		      <mu-radio v-model="form.sex" value="male" label="男"></mu-radio>
		      <mu-radio v-model="form.sex" value="female" label="女"></mu-radio>
		    </mu-form-item>
		    <mu-form-item>
		      <mu-button color="success" @click="submit" class="btn">注册</mu-button>
		    </mu-form-item>
		  </mu-form>
		</mu-container>
		<mu-snackbar position="top" color="success" :open.sync="regsuccess">
			<mu-icon left value="check_circle"></mu-icon>
		    注册成功
		    <mu-button flat slot="action" color="#fff" @click="regsuccess = false">Close</mu-button>	    
		</mu-snackbar>
		<mu-snackbar position="top" color="warning" :open.sync="regfail">
			<mu-icon left value="priority_high"></mu-icon>
		    两次密码不一致
		    <mu-button flat slot="action" color="#fff" @click="regfail = false">Close</mu-button>	    
		</mu-snackbar>
		<mu-snackbar position="top" color="warning" :open.sync="regfail2">
			<mu-icon left value="priority_high"></mu-icon>
		    密码长度应在6~14位
		    <mu-button flat slot="action" color="#fff" @click="regfail2 = false">Close</mu-button>	    
		</mu-snackbar>
		<mu-snackbar position="top" color="warning" :open.sync="regfail3">
			<mu-icon left value="priority_high"></mu-icon>
		    您可能漏了某项哟⊙０⊙
		    <mu-button flat slot="action" color="#fff" @click="regfail3 = false">Close</mu-button>	    
		</mu-snackbar>
		<mu-snackbar position="top" color="warning" :open.sync="regfail4">
			<mu-icon left value="priority_high"></mu-icon>
		    未知原因注册失败
		    <mu-button flat slot="action" color="#fff" @click="regfail4 = false">Close</mu-button>	    
		</mu-snackbar>
		<mu-snackbar position="top" color="warning" :open.sync="regfail5">
			<mu-icon left value="priority_high"></mu-icon>
		    此手机号已被注册过啦
		    <mu-button flat slot="action" color="#fff" @click="regfail5 = false">Close</mu-button>	    
		</mu-snackbar>
	</div>
</template>

<script>
	export default {
		name:"register",
		data () {
		    return {
	    	regsuccess:false,
	    	regfail:false,
	    	regfail2:false,
	    	regfail3:false,
	    	regfail4:false,
	    	regfail5:false,
		      labelPosition: 'top',
		      form: {
		        name: '',
		        tel: '',
		        email: '',
		        sex: '',
		        psw1:"",
		        psw2:""
		      }
		    }
		},
		methods:{
			submit(){
                if(this.check()){
                	this.$ajax.post("http://119.23.28.162:4040/register",{
                		name:this.form.name,
                		tel:this.form.tel,
                		email:this.form.email,
                		sex:this.form.sex,
                		psw:this.form.psw1,
                	}).then(res=>{
                		if(res.data === "alreadyhave"){
                			this.openfail5Snackbar();
                		}else if(res.data){
                			this.opensuccessSnackbar();
                			document.cookie = `login=true;`;
			        		document.cookie = `name=${res.data.name};`;
			        		document.cookie = `tel=${res.data.tel};`;
			        		document.cookie = `sex=${res.data.sex};`;
			        		document.cookie = `email=${res.data.email};`;
			        		let msg = {
                                name:res.data.name,
								tel:res.data.tel,
								sex:res.data.sex,
								email:res.data.email,
			        		}
			        		this.$store.dispatch("setNewmsg",msg);
			        		setTimeout(()=>{
				        		this.$router.replace('/user');
			        		},2000)
                		}else{
                			this.openfail4Snackbar();
                		}
                	})
                }
			},
		    check(){
		    	let state = true;
		    	if(this.form.psw1 !== this.form.psw2){
                     this.openfailSnackbar(); return false;
		    	}else if(this.form.psw1.length > 14 || this.form.psw1.length < 6){
                     this.openfail2Snackbar(); return false;
		    	}
		    	for(let str of Object.values(this.form)){
                	if(!str){
                	   state = false;
                	   this.openfail3Snackbar();
                	}
                }
                return state;
		    },
		    opensuccessSnackbar () {
		      this.regsuccess = true;
		      setTimeout(() => {
		        this.regsuccess = false;
		      }, 2000);
		    },
		    openfailSnackbar () {
		      this.regfail = true;
		      setTimeout(() => {
		        this.regfail = false;
		      }, 2000);
		    },
		    openfail2Snackbar () {
		      this.regfail2 = true;
		      setTimeout(() => {
		        this.regfail2 = false;
		      }, 2000);
		    },
		    openfail3Snackbar () {
		      this.regfail3 = true;
		      setTimeout(() => {
		        this.regfail3 = false;
		      }, 2000);
		    },
		    openfail4Snackbar () {
		      this.regfail4 = true;
		      setTimeout(() => {
		        this.regfail4 = false;
		      }, 2000);
		    },
		    openfail5Snackbar () {
		      this.regfail5 = true;
		      setTimeout(() => {
		        this.regfail5 = false;
		      }, 2000);
		    }
		}
	}
</script>

<style scoped>
.head{
	padding:0;
}
.btn{
	flex:1;
}
.body{
	margin-bottom:56px;
	margin-top:20px;
}

</style>