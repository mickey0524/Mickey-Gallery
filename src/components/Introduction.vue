<template>
	<div>
		<div class="introduction-container">
			<div class="big-avatar">
				<img :src="personAvatar" width="160px" height="160px">
			</div>
			<div class="introduction-mes">
				<span class="name">{{ personName }}</span>
				<span v-if="personSex == '男'"><i class="fa fa-male"></i></span>
				<span v-else><i class="fa fa-female"></i></span>
				<button class="edit-introduction" @click="showPerson = true" v-if="isSelf">编辑个人信息</button>
				<button class="edit-introduction" v-else @click="attent">{{ isAttent }}</button>
				<hr>
				<div class="attention-fans">
					<div class="attention-fans-block" @click="openSocial(0)">
						<p><strong>{{ personAttent }}</strong></p>
						<p>关注</p>
					</div>
					<div class="attention-fans-block" @click="openSocial(1)">
						<p><strong>{{ personFans }}</strong></p>
						<p>粉丝</p>
					</div>					
				</div>
				<div class="other-mes">
					<div class="other-mes-block">
						<label>个人介绍</label>
						<span>{{ personMotto }}</span>
					</div>
					<div class="other-mes-block">
						<label>出生年月</label>
						<span>{{ personBirth }}</span>
					</div>
				</div>
				<div class="like-photo">
					<photo :img-width="imgWidth" :img-height="imgHeight" @routeToIntroduction="toIntroduction"></photo>
				</div>
			</div>
		</div>
		<div class="notifications">
			<h3>NOTIFICATIONS</h3>
			<div class="notification-item" v-for="(item, index) in notifications">
				<div class="notification-avatar">
					<img :src="item.messageAvatar" width="40px" height="40px" @click="messageIntroduction(index)">
				</div>
				<div class="notification-mes">
					<span>{{ item.messageName }}</span>
					<span>{{ item.messageTime }}</span>
					<p>{{ item.messageContent }}</p>
				</div>
			</div>
		</div>
		<socialrelations v-if="showModal" @close="showModal = false" :title="modalTitle" :body="modalBody" @routeToIntroduction="toIntroduction"></socialrelations>
		<editperson v-if="showPerson" @close="changeperson" :person-name="personName" :person-motto="personMotto" :person-sex="personSex" :person-birth="personBirth"></editperson> 
	</div>
</template>

<script>
	import Photo from './Photo.vue'
	import Socialrelations from './Socialrelations.vue'
	import Editperson from './Editperson.vue'

	export default {
		name : 'introduction',
		components : {
			Photo,
			Socialrelations,
			Editperson
		},
		mounted : function() {
			this.startComponent();
		},
		computed: {
			isSelf : function() {
				return this.$route.params.userId == this.$route.params.introductionId;
			}
		},
		data () {
			return {
				imgWidth : '360px',
				imgHeight : '250px',
				showModal : false,
				showPerson : false,
				modalTitle : '飒然风影的关注',
				personAvatar : require('../assets/avatar2.jpg'),
				personName : '',
				personSex : '',
				personBirth : '',
				personMotto : '',
				personAttent : '',
				personFans : '',
				isAttent : '关注',
				modalBody : [],
				notifications : [
					// {
					// 	avatar : require('../assets/avatar1.jpg'),
					// 	name : 'asdasd',
					// 	time : '2 MINUTES AGO',
					// 	content : 'James Brown subscribed to your newsletter.'
					// },
				]
			}
		},
		methods : {
			startComponent : function() {
				var _this = this;
				var resource = this.$resource("http://localhost:3000/getPersonMes");
				resource.save({ userId : this.$route.params.introductionId }).then((response) => {
					_this.personName = response.body.userMes.userName;
					_this.personSex = response.body.userMes.userSex;
					_this.personBirth = response.body.userMes.userBirth;
					_this.personMotto = response.body.userMes.userMotto;
					_this.personAvatar = require('../assets/avatar' + response.body.userMes.userAvatar + '.jpg');
					_this.personAttent = response.body.userMes.userAttent;
					_this.personFans = response.body.userMes.userFans;
				})
				.catch((response) => {
					console.log('err ' + response);
				})
				var resource_1 = this.$resource("http://localhost:3000/judgeAttention");
				var params = { attentId : this.$route.params.userId, followedId : this.$route.params.introductionId };
				resource_1.save(params).then((response) => {
					if(response.body.result) {
						_this.isAttent = '已关注';
					}
					else {
						_this.isAttent = '关注';
					}
				})
				var resource_2 = this.$resource('http://localhost:3000/getMessages');
				resource_2.save({ userId : this.$route.params.introductionId, lastPull : '' }).then((response) => {
					//console.log(response.body.message);
					_this.notifications = response.body.message;
					_this.notifications.reverse();
					for(var i in _this.notifications) {
						_this.notifications[i].messageAvatar = require('../assets/avatar' + _this.notifications[i].messageAvatar + '.jpg');
					}
				})
				.catch((response) => {
					console.log('err ' + response);
				})	
				this.$children[0].start();
			},
			openSocial : function(index) {
				if(index == 0) {
					this.modalTitle = this.personName + '的关注';
					var server = 'http://localhost:3000/getAttent';
				}
				else {
					this.modalTitle = this.personName + '的粉丝';
					var server = 'http://localhost:3000/getFans';					
				}
				var _this = this;
				var resource = this.$resource(server);
				resource.save({ userId : this.$route.params.introductionId }).then((response) => {
					_this.modalBody = response.body.attention;
					for(var i in _this.modalBody) {
						_this.modalBody[i].userAvatar = require("../assets/avatar" + _this.modalBody[i].userAvatar + ".jpg");
					}
				})
				.catch((response) => {
					console.log('err ' + response);
				})
				this.showModal = true;
			},
			toIntroduction : function(userId) {
				var route = '/gallery/' + this.$route.params.userId + '/introduction/' + userId;
				this.$emit('closeMesBox');
				this.showModal = false;
				this.$router.push(route);
			},
			attent : function() {
				var params = { attentId : this.$route.params.userId, followedId : this.$route.params.introductionId };
				if(this.isAttent == '关注') {
					var resource = this.$resource('http://localhost:3000/setAttent');
					resource.save(params);	
					this.isAttent = '已关注';			
				}
				else {
					var resource = this.$resource('http://localhost:3000/cutAttent');
					resource.save(params);	
					this.isAttent = '关注';						
				}
			},
			messageIntroduction : function(index) {
				var route = '/gallery/' + this.$route.params.userId + '/introduction/' + this.notifications[index].messageId;
				this.$emit('closeMesBox');
				this.$router.push(route);				
			},
			changeperson : function(msg) {
				if(msg != '') {
					this.personName = msg.userName;
					this.personSex = msg.userSex;
					this.personBirth = msg.userBirth;
					this.personMotto = msg.userMotto;
				} 
				this.showPerson = false;
			}
		},
		watch : {
			'$route' : 'startComponent'
		}
	}
</script>

<style>
	@import url("../css/font-awesome.min.css");
	@import url("../css/introduction.css");
</style>