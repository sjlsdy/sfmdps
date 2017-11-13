<template>
	<div class="mainBox">
		<Modal v-model="loginOutModal" title="提示" @on-ok="loginoutOk">
			<p>确定退出吗？</p>
		</Modal>
		<div class="mainTop">
			<div class="userInfo">
				<Button type="ghost" @click="loginOut">退出</Button>
			</div>
		</div>
		<div class="mainRight">
			<div class="mainCont">
				<router-view></router-view>
			</div>
		</div>
		<div class="mainLeft">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginOutModal: false,
			}
		},
		methods: {
			loginOut: function() {
				this.loginOutModal = true;
			},
			loginoutOk() {
				this.$router.push({
					path: '/login'
				});
				//localStorage.removeItem("userInfo");
				this.$Message.success('退出成功');
			},
		},
		mounted() {}
	}
</script>

<style>

</style>