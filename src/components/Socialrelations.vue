<template>
	<div class="social-modal">
	  	<transition name="modal">
	    	<div class="modal-mask">
	      		<div class="modal-wrapper">
	        		<div class="modal-container">

	          			<div class="modal-header">
	          				{{ title }}
	          			</div>

	          			<div class="modal-body">
	          				<div class="social-item" v-for="item in body">
	          					<div class="social-avatar">
	          						<img :src="item.avatar" width="40px" height="40px">
	          					</div>
	          					<div class="social-content">
	          						<p>{{ item.name }}</p>
		          					<p>{{ item.signature }}</p>
		          					<div class="attention-fans">
		          						<div class="attention-fans-item">
		          							<label>关注: </label>
		          							<span>{{ item.attentionNum }}</span>
		          						</div>
		          						<div class="attention-fans-item">
		          							<label>粉丝: </label>
		          							<span>{{ item.fansNum }}</span>
		          						</div>
		          					</div>
		          				</div>
	          				</div>
	          			</div>

	          			<div class="modal-footer">
	          				<button class="modal-button" @click="$emit('close')">
	            				关闭
	          				</button>
	          			</div>
	        		</div>
	      		</div>
	    	</div>
	  	</transition>
	</div>
</template>

<script>
	export default {
		name : 'socialrelations',
		props : ['title', 'body']
	}
</script>

<style>
	@import url("../css/socialrelations.css");
</style>