<template>
	<div class="wraper">
		<Row>
			<Col span="8" offset="8">
			<div class="login-box">
				<h3>issue list</h3>
				<Form ref="loginFormData" :model="loginFormData" :rules="ruleInline" :label-width="80">
					<FormItem label="账号" prop="username">
						<Input v-model="loginFormData.username" placeholder="请输入" @on-enter="login('loginFormData')">
						<Icon type="android-phone-portrait" slot="prepend"></Icon>
						</Input>
					</FormItem>
					<FormItem label="密码" prop="password">
						<Row>
							<!--<Col span="11">-->
							<Input type="password" v-model="loginFormData.password" placeholder="请输入密码" @on-enter="login('loginFormData')">
							<Icon type="lock-combination" slot="prepend"></Icon>
							</Input>
						</Row>
					</FormItem>
					<FormItem>
						<Row>
							<Col span="24">
							<Button type="primary" long @click="login('loginFormData')">登录</Button>
							</Col>
						</Row>
					</FormItem>
				</Form>
			</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { md5 } from '../utils/common.js'
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	export default {
		data() {
			return {
				loginFormData: {
					username: 'sjl',
					password: '111'
				},
				ruleInline: {
					username: [{
						required: true,
						message: '请填写账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请填写密码',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 3,
						message: '验证码长度不能小于3位',
						trigger: 'blur'
					}]
				},
				countdown: 0
			}
		},
		methods: {
			sendVerificationCode() {
				if(this.countdown == 0) {
					this.countdown = 10;
					this.$Message.success('发送成功');
					this.countdownFun();
				}
			},
			countdownFun() {
				var _self = this;
				setTimeout(function() {
					_self.countdown -= 1;
					if(_self.countdown > 0) {
						_self.countdownFun();
					}
				}, 1000);
			},
			login(name) {
				var _self = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$http({
							method: 'get',
							url: '/www/?m=user&c=user&a=login&username='+ this.loginFormData.username +'&password=' + md5(this.loginFormData.password),
						}).then(res => {
							if(res.data.status == 0) {
								this.$Message.success('登录成功!');
								var userInfo = {
									username: res.data.data.username,
									token: res.data.data.token,
								}
								localStorage.setItem("userInfo", JSON.stringify(userInfo));
								_self.$router.push({
									path: '/main/issuesList'
								});
							} else {
								this.$Message.error(res.data.message);
							}
						})
					} else {
						this.$Message.error('请填写登录信息!');
					}
				})
			}
		}
	}
</script>

<style>
	.login-box {
		position: relative;
		top: 50px;
		background: #fff;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 20px rgba(0, 0, 0, .1);
	}
	
	.login-box h3 {
		text-align: center;
		font-size: 20px;
		line-height: 2em;
		margin-bottom: 20px;
	}
</style>