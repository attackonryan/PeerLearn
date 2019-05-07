<template>
	<div class="login">
		<mu-container class="head">
		  <mu-appbar style="width: 100%;padding:0;"  color="primary" title="欢迎登陆——邻学一线"></mu-appbar>
		</mu-container>
		<mu-container style="padding: 16px 0;">
		  <mu-row justify-content="center">
		    <mu-avatar size="70">
		      <img :src="head">
		    </mu-avatar>
		  </mu-row>
		</mu-container>
		  <mu-container>
		  <mu-form ref="form" :model="validateForm" class="mu-demo-form">
		    <mu-form-item label="手机号" help-text="您的注册电话" prop="username" :rules="usernameRules">
		      <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item label="密码" prop="password" :rules="passwordRules">
		        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item  prop="isAgree" :rules="argeeRules">
		      <mu-checkbox  label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
		    </mu-form-item>
		    <mu-form-item>
		      <mu-button color="primary" @click="submit" class="btn">登陆</mu-button>
		      <mu-button @click="reg" class="btn">注册新用户</mu-button>
		    </mu-form-item>
		  </mu-form>
		</mu-container>
		<mu-snackbar position="top" color="success" :open.sync="loginsuccess">
			<mu-icon left value="check_circle"></mu-icon>
		    登陆成功
		    <mu-button flat slot="action" color="#fff" @click="loginsuccess = false">Close</mu-button>	    
		</mu-snackbar>
		<mu-snackbar position="top" color="warning" :open.sync="loginfail">
			<mu-icon left value="priority_high"></mu-icon>
		    账号或密码有误
		    <mu-button flat slot="action" color="#fff" @click="loginfail = false">Close</mu-button>	    
		</mu-snackbar>
	</div>
</template>

<script>
	export default {
		name:"login",
		data () {
		    return {
			head:"../../../static/img/favicon.ico",
			loginsuccess:false,
			loginfail:false,
			usernameRules: [
				{ validate: (val) => !!val, message: '必须填写手机号'},
				{ validate: (val) => val.length == 11, message: '请填入正确的手机号'}
			],
			passwordRules: [
				{ validate: (val) => !!val, message: '必须填写密码'},
				{ validate: (val) => val.length >= 6 && val.length <= 14, message: '密码长度应在6~14'}
			],
			argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
			validateForm: {
				username: '',
				password: '',
				isAgree: false
				}
			}
		  },
		  methods: {
		  	opensuccessSnackbar () {
		      this.loginsuccess = true;
		      setTimeout(() => {
		        this.loginsuccess = false;
		      }, 2000);
		    },
		    openfailSnackbar () {
		      this.loginfail = true;
		      setTimeout(() => {
		        this.loginfail = false;
		      }, 2000);
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
		    submit () {
		      this.$refs.form.validate().then((result) => {
		      	if(!this.validateForm.isAgree){return false;}
		        this.$ajax.post("http://119.23.28.162:4040/login",{
		        	tel:this.validateForm.username,
		        	email:this.validateForm.username,
		        	psw:this.validateForm.password,
		        }).then((res)=>{
		        	if(res.data[0]){
		        		this.$store.dispatch("setNewmsg",res.data[0]);//存在密码
		        		this.$store.state.login = true;
		        		this.opensuccessSnackbar();	
		        		document.cookie = `login=true;`;
		        		document.cookie = `name=${res.data[0].name};`;
		        		document.cookie = `tel=${res.data[0].tel};`;
		        		document.cookie = `sex=${res.data[0].sex};`;
		        		document.cookie = `email=${res.data[0].email};`;
		        		this.$store.commit("setfriends",res.data[0].friends);
		        		this.$ajax.post("http://119.23.28.162:4040/setonline",{
							name:this.getcookie('name'),
						});
		        		setTimeout(()=>{
			        		this.$router.replace(this.$store.state.current);
		        		},2000)
		        	}else{
						this.openfailSnackbar();
		        	}
		        }).catch(err=>{
		        	console.log(err);
		        })
		      });
		    },
		    reg(){
		    	this.$router.replace("./register");
		    }
		  },
		mounted(){
		}

	}
</script>

<style scoped>
.mu-demo-form {
  width: 100%;
  margin-top:5%;
}
.container.head{
	padding:0;
}
.btn{
    flex:1;
}
</style>