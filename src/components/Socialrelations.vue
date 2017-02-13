<template>
  	<transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    	<div class="modal-mask">
      		<div class="modal-wrapper">
        		<div class="modal-container">

          			<div class="modal-header">
          				{{ title }}
          			</div>

          			<div class="modal-body">
          				<div class="social-item" v-for="(item, index) in body">
          					<div class="social-avatar">
          						<img :src="item.userAvatar" width="40px" height="40px" @click="routeToInstruction(index)">
          					</div>
          					<div class="social-content">
          						<p>{{ item.userName }}</p>
	          					<p>{{ item.userMotto }}</p>
	          					<div class="attention-fans">
	          						<div class="attention-fans-item">
	          							<label>关注: </label>
	          							<span>{{ item.userAttent }}</span>
	          						</div>
	          						<div class="attention-fans-item">
	          							<label>粉丝: </label>
	          							<span>{{ item.userFans }}</span>
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
</template>

<script>
	export default {
		name : 'socialrelations',
		props : ['title', 'body'],
    methods : {
      routeToInstruction : function(index) {
        this.$emit('routeToIntroduction', this.body[index].userId);
      }
    }
	}
</script>

<style>
	@import url("../css/animate.css");
	@import url("../css/socialrelations.css");
</style>