<template>
	<div class="page">
		<div class="container register">
			<div class="title">
				<h2>Register here</h2>
			</div>
			<div class="wrap">
			    <input type="text" placeholder="User ID" autofocus v-model="useId">
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
		            <a href="#" @click="signIn">
		                sign in here
		            </a>
		        </div>
			</div>	
		</div>	 	
	</div>
</template>

<script>
	export default {
		name : 'register',
		data () {
			return {
				useId : '',
				passWord : '',
				name : '',
				birthday : '',
				sex : '',
				signature : ''
			}
		},
		methods : {
			visitorIn : function() {
				console.log('游客登陆');
			},
			register : function() {
				console.log(birthday);
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