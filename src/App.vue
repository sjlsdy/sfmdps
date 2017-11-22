<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			loginStatus() {
				if(this.$route.name == null) {
					this.$router.push({
						path: '/login'
					});
				} else if(localStorage.getItem("userInfo") == null) {
					this.$router.push({
						path: '/login'
					});
				} else if(this.$route.name == 'login') {
					// 判断存在localStorage里的token是否失效
					this.$Message.success('您已经登录系统了!');
					this.$router.push({
						path: 'main/issuesList'
					});
					/*
					this.$http({
						method: 'GET',
						url: '/dsg-data/region/regionList'
					}).then(response => {
						this.$Message.success('您已经登录系统了!');
						this.$router.push({
							path: 'home'
						});
					})
					*/
				}
			}
		},
		mounted() {
			this.loginStatus();
		},
		watch: {
			'$route' (to, from) {
				// 判断是不是来自login的路由切换
				if(from.name == "login" || to.name == "login") {
					this.loginStatus();
				}
				// 判断是不是去向login的路由切换
				// 这种判断方式则意味首每次除了不是去往login的路由都要进行判断，但意味着更安全
				/*
				if(to.name != "login") {
					if(localStorage.getItem("userInfo") == null) {
						this.$router.push({
							path: 'login'
						});
					}
				}
				*/
			}
		}
	}
</script>

<style>
	html,
	body,#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>