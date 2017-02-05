<template>
	<div id="description">
		<span>{{ mes }}</span>
		<button @click="change">倒序</button>
	</div>
</template>

<script>
	export default {
		name : 'description',
		data () {
			return {
				mes : 'qweqwewe'
			};
		},
		methods : {
			change : function() {
				this.mes = this.mes.split('').reverse().join('');
			}
		}
	}
</script>

<style>
	#description {
		font-family : 'Microsoft Yahei';
		font-size : 14px;
		font-weight : bold;
		text-align : center;
	}
</style>