<template>
	<div>
		<div class="introduction-container">
			<div class="big-avatar">
				<img src="../assets/avatar01.jpg" width="160px" height="160px">
			</div>
			<div class="introduction-mes">
				<span class="name">飒然风影</span>
				<span><i class="fa fa-male"></i></span>
				<button class="edit-introduction" @click="showPerson = true">编辑个人信息</button>
				<hr>
				<div class="attention-fans">
					<div class="attention-fans-block" @click="openAttention">
						<p><strong>17</strong></p>
						<p>关注</p>
					</div>
					<div class="attention-fans-block" @click="openFans">
						<p><strong>9</strong></p>
						<p>粉丝</p>
					</div>					
				</div>
				<div class="other-mes">
					<div class="other-mes-block">
						<label>个人介绍</label>
						<span>半世浮萍随逝水, 一宵冷雨藏名花~</span>
					</div>
					<div class="other-mes-block">
						<label>出生年月</label>
						<span>1996-05-24</span>
					</div>
				</div>
				<div class="like-photo">
					<photo :img-width="imgWidth" :img-height="imgHeight"></photo>
				</div>
			</div>
		</div>
		<div class="notifications">
			<h3>NOTIFICATIONS</h3>
			<div class="notification-item" v-for="item in notifications">
				<div class="notification-avatar">
					<img :src="item.avatar" width="40px" height="40px">
				</div>
				<div class="notification-mes">
					<p>{{ item.time }}</p>
					<p>{{ item.content }}</p>
				</div>
			</div>
		</div>
		<socialrelations v-if="showModal" @close="showModal = false" :title="modalTitle" :body="modalBody"></socialrelations>
		<editperson v-if="showPerson" @close="showPerson = false"></editperson> 
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
		data () {
			return {
				imgWidth : '360px',
				imgHeight : '250px',
				showModal : false,
				showPerson : false,
				modalTitle : '飒然风影的关注',
				modalBody : [
					{
						avatar : require("../assets/avatar01.jpg"),
						name: 'Roger',
						signature : '奇怪的感觉asdasda',
						attentionNum : 9,
						fansNum : 6,
						isAttention : false
					},
					{
						avatar : require("../assets/avatar02.jpg"),
						name: 'Baihao',
						signature : '半世浮萍随逝水~',
						attentionNum : 5,
						fansNum : 8,
						isAttention : false						
					},
					{
						avatar : require("../assets/avatar03.jpg"),
						name: 'Roger',
						signature : '奇怪的感觉asdasdasdasdasdasdasaasdasaasasdasdasdda',
						attentionNum : 9,
						fansNum : 6,
						isAttention : false
					},
					{
						avatar : require("../assets/avatar04.jpg"),
						name: 'Baihao',
						signature : '半世浮萍随逝水~',
						attentionNum : 5,
						fansNum : 8,
						isAttention : false						
					}
				],
				notifications : [
					{
						avatar : require('../assets/avatar01.jpg'),
						time : '2 MINUTES AGO',
						content : 'James Brown subscribed to your newsletter.'
					},
					{
						avatar : require('../assets/avatar02.jpg'),
						time : '3 HOURS AGO',
						content : 'Diana Kennedy purchased a year subscription.'						
					},
					{
						avatar : require('../assets/avatar03.jpg'),
						time : '7 HOURS AGO',
						content : 'Brandon Page purchased a year subscription.'						
					},
					{
						avatar : require('../assets/avatar04.jpg'),
						time : '11 HOURS AGO',
						content : 'Mark Twain commented your post.'						
					},
					{
						avatar : require('../assets/avatar05.jpg'),
						time : '18 HOURS AGO',
						content : 'Daniel Pratt purchased a wallet in your store.'							
					}
				]
			}
		},
		methods : {
			openFans : function() {
				this.modalTitle = '飒然风影的粉丝';
				this.showModal = true;
			},
			openAttention : function() {
				this.modalTitle = '飒然风影的关注';
				this.showModal = true;
			}
		}
	}
</script>

<style>
	@import url("../css/font-awesome.min.css");
	@import url("../css/introduction.css");
</style>