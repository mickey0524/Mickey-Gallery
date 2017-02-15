<template>
	<transition name="person">
		<div class="person-mask">
			<div class="person-wrapper">
				<div class="person-container">
					<div class="person-header">
						编辑个人信息
					</div>
					<hr>
					<div class="person-body">
						<div class="person-item">
							<label>头像 </label>
							<img :src="avatar" width="40px" height="40px" @click="changeAvatar">
							<input type="file" style="display:none;" id="fileInput" @change="onFileChange">
						</div>
						<div class="person-item">
							<label>昵称 <label>
							<input type="text" v-model="name" autofocus>
						</div>
						<div class="person-item">
							<label>介绍 </label>
							<input type="text" v-model="motto">
						</div>
						<div class="person-item">
							<label>性别 </label>
							<input type="text" v-model="sex">
						</div>
						<div class="person-item">
							<label>生日 </label>
							<input type="date" v-model="birthday">
						</div>
					</div>
					<div class="person-footer">
						<button class="person-button" @click="cancel">关闭</button>
						<button class="person-button" @click="save">保存</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name : 'person',
		props : ['personName', 'personMotto', 'personSex', 'personBirth', 'personAvatar'],
		// mounted : function() {
		// 	console.log('asda');
		// },
		data () {
			return {
				name : this.personName,
				motto : this.personMotto,
				sex : this.personSex,
				birthday : this.personBirth,
				avatar : require('../assets/avatar' + this.personAvatar + '.jpg')
			};
		},
		methods : {
			save : function() {
				var resource = this.$resource('http://localhost:3000/changePerson');
				var params = { userAvatar : this.personAvatar, userName : this.name, userMotto : this.motto, userSex : this.sex, userBirth : this.birthday, userId : this.$route.params.userId };
				resource.save(params);
				this.$emit('close', params);
			},
			cancel : function() {
				if(this.avatar != this.personAvatar) {
					var resource = this.$resource('http://localhost:3000/deleteZanshi');
					resource.save({ userId : this.$route.params.userId });
				}
				this.$emit('close', '');
			},
			changeAvatar : function() {
				document.getElementById('fileInput').click();
			},
			onFileChange : function(e) {
				var files = e.target.files || e.dataTransfer.files;
				this.createImage(files);
			},
			createImage(file) {
				if(typeof FileReader === 'undefined') {
					alert('您的浏览器不支持图片上传，请升级您的浏览器');
				}
				else {
					var vm = this;
					var reader = new FileReader();
					reader.readAsDataURL(file[0]);
					reader.onload = function(e) {
						var resource = vm.$resource('http://localhost:3000/changePhoto');
						resource.save({ photoBase : e.target.result, variety : 'zanshi', userId : vm.$route.params.userId });
					}
				}
			},
		}
	}
</script>

<style>
	@import url("../css/editperson.css");
</style>