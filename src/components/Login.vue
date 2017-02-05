<template>
	<div class="page">
		<div class="container">
			<div class="title">
				<h2>sign in now</h2>
			</div>
			<div class="wrap">
			    <input type="text" placeholder="User ID" autofocus v-model="useId">
			    <input type="password" placeholder="Password" v-model="passWord">
		        <p class="right" @click="visitorIn">as a visitor?</p>
		        <button @click="signIn()"><i class="fa fa-lock"></i> SIGN IN</button>
		        <hr>
		        <div class="registration">
		        	Don't have an account yet?<br/>
		            <a href="#" @click="createId">
		                Create an account
		            </a>
		        </div>
			</div>	
		</div>	 	
	</div>
</template>

<script>
	export default {
		name : 'login',
		data () {
			return {
				useId : '',
				passWord : ''
			}
		},
		methods: {
			signIn : function() {
				console.log(this.useId + ' ' + this.passWord);
			},
			visitorIn : function() {
				console.log('游客登陆');
			},
			createId : function() {
				console.log('申请新账号');
			}
		}
	}
</script>

<style>
	@import url("../css/font-awesome.min.css");
	@import url("../css/login.css");
</style>
