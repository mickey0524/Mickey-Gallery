<template>
	<div class="gallery-container">
		<div class="nav">
			<h2>Mickey Gallery</h2>
			<div class="avatar" v-if="isLogin">
				<router-link to="/introduction/1"><img src="../assets/avatar01.jpg" width="40px" height="40px"></router-link>
			</div>
			<div class="mes" v-if="isLogin"> 
				<i class="fa fa-envelope-o" @click="openMesBox"></i>
			</div>
			<div class="mes-box" v-show="mesBox">	
				<div class="mes-title">
					<h4>You have {{ mesNum }} new messages</h4>
				</div>
				<div v-for="item in message" class="mes-item">
					<div class="mes-avatar">
						<img :src="item.avatar" width="40px" height="40px">
					</div>
					<div class="mes-content">
						<span><strong>{{ item.useName }}</strong></span>
						<span class="mes-time"><strong>{{ item.time }}<strong></span>
						<p>{{ item.content }}</p>
					</div>
				</div>
				<div class="mes-more">
					See more messages
				</div>
			</div>
			<span class="badge" @click="openMesBox" v-if="isLogin">{{ mesNum }}</span>
			<div class="front-back">
				<i class="fa fa-arrow-left" @click="$router.go(-1)"></i>
				<i class="fa fa-arrow-right" @click="$router.go(1)"></i>
			</div>
			<router-link to="/login"><button v-if="isLogin">Login</button></router-link>
			<button v-if="!isLogin">Unlogin</button>
		</div>
		<div class="gallery-wrap">
			<transition mode="out-in" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import Photo from './Photo.vue'
	import Introduction from './Introduction.vue'
	export default {
		components : {
			Photo,
			Introduction
		},
		data () {
			return {
				isLogin : true,
				mesBox : false,
				mesNum : 5,
				message: [
					{
						useName : 'Zac Snider',
						time : 'Just now',
						content : 'Hi mate, how is everything.',
						avatar : require('../assets/avatar02.jpg')
					},
					{
						useName : 'Divya Manian',
						time : '40mins.',
						content : 'Hi, I need your help with this.',
						avatar : require('../assets/avatar03.jpg')
					},
					{
						useName : 'Dan Rogers',
						time : '2 hrs.',
						content : 'Love your new Dashboard.',
						avatar : require('../assets/avatar04.jpg')
					},
					{
						useName : 'Dj Sherman',
						time : '4 hrs',
						content : 'please, answer asap.',
						avatar : require('../assets/avatar05.jpg')
					}
				]		
			};
		},
		methods : {
			openMesBox : function() {
				this.mesBox = !this.mesBox;
			}
		}
	}
</script>

<style>
  @import url("../css/animate.css");
  @import url("../css/font-awesome.min.css");
  @import url("../css/gallery.css");
</style>