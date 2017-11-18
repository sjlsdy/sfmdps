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
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
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
				fetchPostUrlencoded('/www/?m=user&c=user&a=login_out', {}).then((res) => {
					if(res.status == 0) {
						this.$router.push({
							path: '/login'
						});
						localStorage.removeItem("userInfo");
						this.$Message.success('退出成功');
					} else {
						this.$Message.error(res.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
		},
		mounted() {}
	}
</script>

<style>

</style>