<template>
	<div>
		欢迎来到会员充值页面,携带参数id是{{id}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id:'0'
			};
		},
		created() {
			this.id = this.$route.params['id'];
			console.log(this.$store.state.userName);
		},
	}
</script>

<style>

</style>
