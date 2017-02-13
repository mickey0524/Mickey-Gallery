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
		props : ['personName', 'personMotto', 'personSex', 'personBirth'],
		data () {
			return {
				name : this.personName,
				motto : this.personMotto,
				sex : this.personSex,
				birthday : this.personBirth
			};
		},
		methods : {
			save : function() {
				var resource = this.$resource('http://localhost:3000/changePerson');
				var params = { userName : this.name, userMotto : this.motto, userSex : this.sex, userBirth : this.birthday, userId : this.$route.params.userId };
				resource.save(params);
				this.$emit('close', params);
			},
			cancel : function() {
				this.$emit('close', '');
			}
		}
	}
</script>

<style>
	@import url("../css/editperson.css");
</style>