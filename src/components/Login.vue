<template>
	<div class="page">
		<div class="container">
			<div class="title">
				<h2>sign in now</h2>
			</div>
			<div class="wrap">
			    <input type="text" placeholder="User ID" autofocus v-model="useId">
			    <input type="password" placeholder="Password" v-model="passWord">
		        <router-link to="/"><p class="right" @click="visitorIn">as a visitor?</p></router-link>
		        <button @click="signIn"><i class="fa fa-lock"></i> SIGN IN</button>
		        <hr>
		        <div class="registration">
		        	Don't have an account yet?<br/>
		        	<router-link to="/register">
			            <a href="#" @click="createId">
			                Create an account
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
				useId : '',
				passWord : ''
			}
		},
		methods: {
			signIn : function() {
				//console.log(this.useId + ' ' + this.passWord);
				this.$router.push('/');
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
