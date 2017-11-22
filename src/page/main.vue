<template>
	<div class="mainBox">
		<Modal v-model="loginOutModal" title="提示" @on-ok="loginoutOk">
			<p>确定退出吗？</p>
		</Modal>
		<div class="mainRight">
			<div class="mainCont">
				<router-view></router-view>
			</div>
		</div>
		<div class="mainLeft">
			<Menu active-name="1">
				<MenuGroup title="issue">
					<MenuItem name="1">
					<Icon type="document-text"></Icon>
					new issue
					</MenuItem>
					<MenuItem name="2">
					<Icon type="chatbubbles"></Icon>
					评论管理
					</MenuItem>
				</MenuGroup>
				<MenuGroup title="统计分析">
					<MenuItem name="3">
					<Icon type="heart"></Icon>
					用户留存
					</MenuItem>
					<MenuItem name="4">
					<Icon type="heart-broken"></Icon>
					流失用户
					</MenuItem>
				</MenuGroup>
			</Menu>
			<Button type="ghost" @click="loginOut">退出</Button>
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
	.mainBox {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #F9F9F9;
	}
	
	.mainBox .mainLeft {
		float: left;
		width: 240px;
		height: 100%;
		margin-left: -100%;
		background: #FFF;
		box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
	}
	
	.mainBox .mainRight {
		float: left;
		width: 100%;
		height: 100%;
	}
	
	.mainBox .mainRight .mainCont {
		padding-left: 240px;
		height: 100%;
		overflow: hidden;
	}
</style>