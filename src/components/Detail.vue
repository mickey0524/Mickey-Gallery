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
							<img :src="address" width="150px" height="150px" v-bind:style="{ transform: 'rotate(' + rotateAngle + 'deg)' }">
						</div>
						<p><strong>听友评论 </strong>(已有{{ commentNum }}条评论)</p>
						<input type="text" placeholder="发表评论" v-model="commentContent"><button class="send" @click="sendComment">发送</button>
						<p>精彩评论</p>
						
						<div class="detail-comments">
							<div v-for="(comment, index) in comments" class="detail-item">
								<div class="comment-avatar">
									<img :src="comment.userAvatar" width="40px" height="40px" @click="routeToIntroduction(index)">
								</div>
								<div class="comment-content">
									<span>{{ comment.userName }}</span>
									<span>{{ comment.commentTime }}</span>
									<p>{{ comment.commentContent }}</p>
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
		created : function() {
			this.getComments();
		},
		props : ['photoAddress'],
		data () {
			return {
				rotateAngle : 0,
				address : require("../assets/port" + this.photoAddress + '.jpg'),
				commentNum : '',
				commentContent : '',
				comments : [
					// {
					// 	avatar : require("../assets/avatar1.jpg"),
					// 	name : '飒然风影',
					// 	time : '2 MINUTES AGO',
					// 	content : '我喜欢你'
					// }
				]
			}
		},
		methods : {
			getComments : function() {
				//console.log('asda');
				var _this = this;
				var resource = this.$resource('http://localhost:3000/getComments');
				resource.save({ photoId : this.photoAddress }).then((response) => {
					_this.comments = response.body.photoComment;
					//console.log(response.body);
					for(var i in _this.comments) {
						_this.comments[i].userAvatar = require("../assets/avatar" + _this.comments[i].userAvatar + ".jpg");
					}
					_this.commentNum = _this.comments.length;
				})
				.catch((response) => {
					console.log('err ' + response);
				})				
			},
			sendComment : function() {
				var _this = this;
				var params = {};
				params.commentTime = this.getNowFormatDate();
				params.commentContent = this.commentContent;
				params.userId = this.$route.params.userId;
				params.photoId = this.photoAddress;
				var resource = this.$resource('http://localhost:3000/sendComment');
				resource.save(params).then((response) => {
					_this.getComments();
					console.log('adsadsasdad');
				})
				.catch((response) => {
					console.log('err ' + response);
				})
			},
			getNowFormatDate : function() {
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
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + date.getHours() + seperator2 + date.getMinutes()
			            + seperator2 + date.getSeconds();
			    return currentdate;
			},
			routeToIntroduction : function(index) {
				this.$emit('routeToIntroduction', this.comments[index].userId);
			}
		}
	}
</script>

<style>
	@import url("../css/detail.css");
	@import url("../css/animate.css");
</style>