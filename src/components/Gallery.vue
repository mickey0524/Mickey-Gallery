<template>
	<div class="gallery-container">
		<div class="nav">
			<h2>Mickey Gallery</h2>
			<div class="avatar" v-if="isLogin">
				<img :src="userAvatar" width="40px" height="40px" @click="topToIntroduction">
			</div>
			<div class="mes" v-if="isLogin"> 
				<i class="fa fa-envelope-o" @click="openMesBox"></i>
			</div>
			<div class="mes-box" v-show="mesBox">	
				<div class="mes-title">
					<h4>You have {{ mesNum }} new messages</h4>
				</div>
				<div v-for="(item, index) in message" class="mes-item">
					<div class="mes-avatar">
						<img :src="item.messageAvatar" width="40px" height="40px" @click="mesToIntroduction(index)">
					</div>
					<div class="mes-content">
						<span><strong>{{ item.messageName }}</strong></span>
						<span class="mes-time"><strong>{{ item.messageTime }}<strong></span>
						<p>{{ item.messageContent }}</p>
					</div>
				</div>
				<div class="mes-more" @click="topToIntroduction">
					See more messages
				</div>
			</div>
			<span class="badge" @click="openMesBox" v-if="isLogin">{{ mesNum }}</span>
			<div class="front-back">
				<i class="fa fa-arrow-left" @click="$router.go(-1)"></i>
				<i class="fa fa-arrow-right" @click="$router.go(1)"></i>
			</div>
			<router-link to="/login"><button v-if="!isLogin">Login</button></router-link>
			<button v-if="isLogin" @click="unLogin">Unlogin</button>
			<button @click="backToGallery">Gallery</button>
			<button @click="uploadPhoto">upLoad</button>
			<input type="file" id="photo" @change="photoUpload" style="display:none;">
		</div>
		<div class="gallery-wrap">
			<transition mode="out-in" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
				<router-view @routeToIntroduction="toIntroduction" @closeMesBox="mesBox=false"></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import Photo from './Photo.vue'
	import Introduction from './Introduction.vue'
	export default {
		mounted : function() {
			if(this.$route.params.userId != 'visitor') {
				var _this = this;
				var resource = this.$resource('http://localhost:3000/getUserAvatar');
				var params = {userId : this.$route.params.userId};
				resource.save(params).then((response) => {
					_this.userAvatar = require('../assets/avatar' + response.body.avatar + '.jpg');
				})
				.catch((response) => {
					console.log('err ' + response);
				})				
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(sessionStorage.getItem('userId') == null) {
					next('/gallery/visitor');
				}
				else {
					if(sessionStorage.getItem('userId') != vm.$route.params.userId) {
						next('/gallery/' + sessionStorage.getItem('userId'));
					}
				}
			})
		},
		created : function() {
			var _this = this;
			_this.getMessage();
			setInterval(function() {
				_this.getMessage();
			}, 60000 * 5);
		},
		components : {
			Photo,
			Introduction
		},
		computed : {
			isLogin : function() {
				return !(this.$route.params.userId == 'visitor');
			}
		},
		data () {
			return {
				userAvatar : '',
				mesBox : false,
				mesNum : 0,
				lastPull : this.getNowFormatDate(1),
				message: [
					// {
					// 	useName : 'Zac Snider',
					// 	time : '2017-02-12 21:14:40',
					// 	content : 'Hi mate, how is everything.',
					// 	avatar : require('../assets/avatar2.jpg')
					// },
				]		
			};
		},
		methods : {
			unLogin : function() {
				this.$router.push('/gallery/visitor');
				sessionStorage.removeItem('userId');
			},
			openMesBox : function() {
				this.mesBox = !this.mesBox;
				if(!this.mesBox) {
					this.message = [];
					this.mesNum = 0;
				}
			},
			mesToIntroduction : function(index) {
				this.mesBox = false;
				this.message = [];
				this.mesNum = 0;
				var route = '/gallery/' + this.$route.params.userId + '/introduction/' + this.message[index].messageId;
				this.$router.push(route);
			},
			toIntroduction : function(userId) {
				this.mesBox = false;
				var route = '/gallery/' + this.$route.params.userId + '/introduction/' + userId;
				this.$router.push(route);
			},
			topToIntroduction : function() {	
				this.mesBox = false;
				var route = '/gallery/' + this.$route.params.userId + '/introduction/' + this.$route.params.userId;
				this.$router.push(route);
			},
			getMessage : function() {
				var _this = this;
				var resource = this.$resource('http://localhost:3000/getMessages');
				resource.save({ userId : this.$route.params.userId, lastPull : this.lastPull, variety : 'gallery'}).then((response) => {
					_this.message = response.body.message;
					_this.message.reverse();
					if(_this.message.length > 4) {
						_this.message.splice(4, _this.message.length - 4);
					}
					for(var i in _this.message) {
						_this.message[i].messageAvatar = require('../assets/avatar' + _this.message[i].messageAvatar + '.jpg');
					}
					_this.mesNum = _this.message.length;
					_this.lastPull = _this.getNowFormatDate();
				})
				.catch((response) => {
					console.log('err ' + response);
				})				
			},
			backToGallery : function() {
				this.$router.push('/gallery/' + this.$route.params.userId);
			},
			getNowFormatDate : function(variety) {
			    var date = new Date();
			    var seperator1 = "-";
			    var seperator2 = ":";
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    if(variety == 1) {
			    	return date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " 0:0:0";
			    }
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes()
			            + seperator2 + date.getSeconds();
			    return currentdate;
			},
			uploadPhoto : function() {
				if(sessionStorage.getItem('userId') != undefined) {
					document.getElementById('photo').click();
				}
			},
			photoUpload : function(e) {
				var file = e.target.files || e.dataTransfer.files;
				var reader = new FileReader();
				var vm = this;
				reader.readAsDataURL(file[0]);
				reader.onload = function(e) {
					var resource = vm.$resource('http://localhost:3000/uploadPhoto');
					resource.save({ photoBase : e.target.result }).then((response) => {
						//console.log(vm.$children);
						//vm.avatar = require('../assets/' + response.body.imgAddress + vm.$route.params.userId + '.jpg');
						// vm.$children[1].start();
					})
				}
			}
		}
	}
</script>

<style>
  @import url("../css/animate.css");
  @import url("../css/font-awesome.min.css");
  @import url("../css/gallery.css");
</style>