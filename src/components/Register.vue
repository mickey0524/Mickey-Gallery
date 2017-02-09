<template>
	<div class="page">
		<div class="container register">
			<div class="title">
				<h2>Register here</h2>
			</div>
			<div class="wrap">
			    <input type="text" placeholder="User ID" autofocus v-model="userId">
			    <input type="text" placeholder="Password" v-model="passWord">
			    <input type="text" placeholder="Name" v-model="name">
			    <input type="date" placeholder="Birthday" v-model="birthday">
			    <input type="text" placeholder="Sex" v-model="sex">
			    <input type="text" placeholder="Signature" v-model="signature">
		        <p class="right" @click="visitorIn">as a visitor?</p>
		        <button @click="register"><i class="fa fa-registered"></i> Register</button>
		        <hr>
		        <div class="signIn">
		        	have an account yet?<br/>
		        	<router-link to="/login">
			            <a href="#" @click="signIn">
			                sign in here
			            </a>
			        </router-link>
		        </div>
			</div>	
		</div>	 	
	</div>
</template>

<script>
	export default {
		data () {
			return {
				userId : '',
				passWord : '',
				name : '',
				birthday : '',
				sex : '',
				signature : ''
			}
		},
		methods : {
			visitorIn : function() {
				this.$router.push("/gallery/visitor");
				console.log('游客登陆');
			},
			register : function() {
				if(this.useId == '' || this.passWord == '' || this.name == '' || this.birthday == '' || this.sex == '' || this.signature == '') {
					alert('请填写所有字段!');
				}
				else {
					var _this = this;
					var params = { userId : this.userId, passWord : this.passWord, userName : this.name, userBirth : this.birthday, userSex : this.sex, userMotto : this.signature, avatar : Math.ceil(Math.random() * 5) };
					var resource = this.$resource('http://localhost:3000/register');
					resource.save(params).then((response) => {
						if(response.body.code == 200) {
							alert('注册成功，自动跳转到登陆界面~');
							_this.$router.push("/login");
						}
						else {
							alert(response.body.description);
						}
					})
					.catch((response) => {
						console.log('err ' + response);
					})
				}
			},
			signIn : function() {
				console.log('转去登录界面');
			}
		}
	}
</script>

<style scoped>
	@import url("../css/font-awesome.min.css");
	@import url("../css/login.css");
</style>