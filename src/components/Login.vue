<template>
	<div class="page">
		<div class="container">
			<div class="title">
				<h2>sign in now</h2>
			</div>
			<div class="wrap" @keyup.enter="signIn">
			    <input type="text" placeholder="User ID" autofocus v-model="userId">
			    <input type="password" placeholder="Password" v-model="passWord">
		        <router-link to="/gallery/visitor"><p class="right" @click="visitorIn">as a visitor?</p></router-link>
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
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		// mounted () {
		// 	// var deepCopy = function clone(origin) {
		// 	//   let originProto = Object.getPrototypeOf(origin);
		// 	//   return Object.assign(Object.create(originProto), origin);
		// 	// }
		// 	// var prev = {a : 'ss', b : {c : 'sda'}};
		// 	// var now = deepCopy(prev);
		// 	// prev.b.c = 'asdasdasd';
		// 	// console.log(now.b.c);
		// 	// let obj = {'0' : 'a', '1' : 'b', '2' : 'c', length : 3};
		// 	// console.log(Array.prototype.slice.call(obj));
		// 	// console.log(Array.from(obj));
			
		// 	// var arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
		// 	// arr = Array.from(new Set(arr));
		// 	var arr = Array.of(...[1, 2, 3]);
		// 	console.log(arr);
		// },
		data () {
			return {
				userId : '',
				passWord : ''
			}
		},
		computed :
			mapGetters([
				'doneTodos',
				'doneTodosLength'
			]),
		methods: {
			signIn : function() {
				var _this = this;
				var param = {userId : this.userId, passWord : this.passWord};
				var resource = this.$resource('http://localhost:3000/judgeLanding');
				resource.save(param).then((response) => {
					if(response.body.code == 200) {
						sessionStorage.setItem('userId', _this.userId);
						this.$router.push('/gallery/' + _this.userId);
					}
					else {
						alert(response.body.description);
						_this.userId = '';
						_this.passWord = '';
					}
				})
				.catch(function(response) {
					console.log('err' + response)
				})
			},
			visitorIn : function() {
				console.log('游客登陆');
				console.log(this.doneTodos);
			},
			createId : function() {
				console.log('申请新账号');
				this.$store.commit('increment');
			},
			ss () {
				//this.id = 21;
				setTimeout(() => {
					console.log(this.id);
				}, 100);
			}
		}
	}
</script>

<style>
	@import url("../css/font-awesome.min.css");
	@import url("../css/login.css");
</style>
