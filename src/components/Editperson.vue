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
		data () {
			return {
				name : '飒然风影',
				motto : '半世浮萍随逝水，一宵冷雨葬名花',
				sex : '男',
				birthday : '1996-05-24'	
			};
		},
		methods : {
			save : function() {
				this.$emit('close');
			},
			cancel : function() {
				this.$emit('close');
			}
		}
	}
</script>

<style>
	@import url("../css/editperson.css");
</style>