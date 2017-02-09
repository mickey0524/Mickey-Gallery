<template>
	<transition name="detail" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div class="detail-mask">
			<div class="detail-wrapper">
				<div class="detail-container">
					<div class="detail-header">
						图片详情
					</div>
					<div class="detail-body">
						<div class="detail-img">
							<img src="../assets/port1.jpg" width="150px" height="150px" v-bind:style="{ transform: 'rotate(' + rotateAngle + 'deg)' }">
						</div>
						<hr>
						<div class="detail-comments">
							<div v-for="comment in comments" class="detail-item">
								<div class="comment-avatar">
									<img :src="comment.avatar" width="40px" height="40px" @click="$emit('routeToIntroduction')">
								</div>
								<div class="comment-content">
									<span>{{ comment.name }}</span>
									<span>{{ comment.time }}</span>
									<p>{{ comment.content }}</p>
								<div>
							</div>
						</div>
					</div>
					<div class="detail-footer">
						<button class="detail-button" @click="$emit('close')">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name : 'detail',
		mounted : function() {
			var _this = this;
			setInterval(function() {
				_this.rotateAngle += 1;
			}, 100);
		},
		data () {
			return {
				rotateAngle : 0,
				comments : [
					{
						avatar : require("../assets/avatar1.jpg"),
						name : '飒然风影',
						time : '2 MINUTES AGO',
						content : '我喜欢你'
					}
				]
			}
		}
	}
</script>

<style>
	@import url("../css/detail.css");
	@import url("../css/animate.css");
</style>