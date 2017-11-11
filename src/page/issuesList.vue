<template>
	<div>
		<div style="width: 200px;">
			<Button type="primary" long @click="modal1 = true"><Icon type="plus-round"></Icon> New issue</Button>
		</div>
		<br />
		<Tabs type="card" :animated="false" @on-click="changeTabs">
			<TabPane label="Meeting Topic" name="meetingTopic"></TabPane>
			<TabPane label="SFM" name="SFM"></TabPane>
			<TabPane label="DPS" name="DPS"></TabPane>
			<TabPane label="Q-circle" name="qCircle"></TabPane>
			<TabPane label="observation" name="Observation"></TabPane>
			<TabPane label="Closed" name="closed"></TabPane>
		</Tabs>
		<Tabs type="card" :animated="false" @on-click="changeTopic" v-if="page.issueType == 'meetingTopic'">
			<TabPane label="SFM" name="SFM"></TabPane>
			<TabPane label="DPS" name="DPS"></TabPane>
			<TabPane label="SFM(Old)" name="SFMOld"></TabPane>
			<TabPane label="DPS(Old)" name="DPSOld"></TabPane>
			<TabPane label="SFM→DPS" name="SDMDPS"></TabPane>
			<TabPane label="DPS→Q-circle" name="DPSQCircle"></TabPane>
		</Tabs>
		<Page :total="page.total" :current="page.current" :page-size="page.size" show-total @on-change="chnagePage" v-if="page.issueType != 'meetingTopic'"></Page>
		<br />
		<Table border :columns="columns" :data="data" :loading="loading"></Table>
		<br />
		<Page :total="page.total" :current="page.current" :page-size="page.size" show-total @on-change="chnagePage" v-if="page.issueType != 'meetingTopic'"></Page>
		<!--新建issues-->
		<Modal v-model="modal1" title="New issue" width="90%">
			<keep-alive>
				<addIssues v-on:closeNewIssues="closeNewIssues"></addIssues>
			</keep-alive>
			<div slot="footer">
				<Button type="ghost" size="large" long @click="modal1 = false">Close Modal</Button>
			</div>
		</Modal>
		<!--issues detail-->
		<Modal v-model="modal2" title="issues detail" width="90%">
			<keep-alive>
				<issuesDetail ref="issuesDetail" :id="issuesDetail.id" v-on:closeIssuesDetail="closeIssuesDetail"></issuesDetail>
			</keep-alive>
			<div slot="footer">
				<Button type="ghost" size="large" long @click="modal2 = false">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import addIssues from './addIssues'
	import issuesDetail from './issuesDetail'
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	export default {
		components: {
			addIssues,
			issuesDetail
		},
		name: 'issuesList',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				modal1: false,
				modal2: false,
				loading: false,
				page: {
					issueType: 'meetingTopic',
					topicType: 'SFM',
					total: 0,
					current: 1,
					size: 20
				},
				columns: [{
						title: 'issueType',
						key: 'issueType',
						width: 100
					}, {
						title: 'status',
						key: 'status',
						width: 100
					},
					{
						title: 'type',
						key: 'type',
						width: 80
					},
					{
						title: 'issueDate',
						key: 'issueDate',
						width: 120
					},
					{
						title: 'qsensor',
						key: 'qsensor',
						width: 100
					},
					{
						title: 'prio',
						key: 'prio',
						width: 80
					},
					{
						title: 'description',
						key: 'description'
					},
					{
						title: 'picture',
						key: 'picture',
						width: 120,
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.picture,
									width: '100%'
								}
							}, 'aaa');
						}
					},
					{
						title: 'ST Eff',
						key: 'stEff',
						align: 'center',
						width: 80,
						render: (h, params) => {
							if(params.row.stEff == 1) {
								return h('div', ['已验证']);
							} else {
								return h('Button', {
									props: {
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {
											this.eff(params.row.id, 'stEff')
										}
									}
								}, '验证');
							}
						}
					},
					{
						title: 'short term solution',
						key: 'shorttermSolution'
					}, {
						title: 'LT Eff',
						key: 'ltEff',
						align: 'center',
						width: 80,
						render: (h, params) => {
							if(params.row.ltEff == 1) {
								return h('div', ['已验证']);
							} else {
								return h('Button', {
									props: {
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {
											this.eff(params.row.id, 'ltEff')
										}
									}
								}, '验证');
							}
						}
					},
					{
						title: 'Long term solution',
						key: 'longtermSolution'
					}, {
						title: 'RC Eff',
						key: 'rcEff',
						align: 'center',
						width: 80,
						render: (h, params) => {
							if(params.row.rcEff == 1) {
								return h('div', ['已验证']);
							} else {
								return h('Button', {
									props: {
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {
											this.eff(params.row.id, 'rcEff')
										}
									}
								}, '验证');
							}
						}
					},
					{
						title: 'Root cause',
						key: 'rootCause'
					}, {
						title: '问题详细',
						key: 'picture',
						align: 'center',
						width: 120,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'ghost',
									size: 'small'
								},
								on: {
									click: () => {
										this.detail(params.row.id)
									}
								}
							}, '查看问题');
						}
					}
				],
				data: [],
				issuesDetail: {
					id: ''
				}
			}
		},
		methods: {
			initData() {
				this.loading = true;
				this.data = [];
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_list', {
					'type': this.page.issueType,
					'topicType': this.page.topicType,
					'current': this.page.current,
					'size': this.page.size
				}).then((res) => {
					if(res.status == 0) {
						this.page.total = parseInt(res.data.total);
						this.data = res.data.data;
						this.$Message.success(res.message);
					} else {
						this.page.total = 0;
						this.$Message.error(res.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
			changeTabs(e) {
				this.page.issueType = e;
				this.page.current = 1;
				this.initData();
			},
			changeTopic(e) {
				this.page.topicType = e;
				this.page.current = 1;
				this.initData();
			},
			chnagePage(e) {
				this.page.current = e;
				this.initData();
			},
			cancel() {

			},
			closeNewIssues() {
				this.modal1 = false;
				this.initData();
			},
			closeIssuesDetail() {
				this.modal2 = false;
				this.initData();
			},
			eff(id, e) {
				this.$Modal.confirm({
					title: '验证问题',
					content: '<p>确认已对 <span style="color:#FF0000">' + e + '</span> 进行了验证吗？</p>',
					scrollable: true,
					onOk: () => {
						fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_eff', {
							id: id,
							type: e
						}).then((res) => {
							if(res.status == 0) {
								this.$Message.success(res.message);
							} else {
								this.$Message.error(res.message);
							}
							this.initData();
						});
					},
					onCancel: () => {}
				});
			},
			detail(id) {
				this.issuesDetail.id = id;
				this.$refs.issuesDetail.initData();
				this.modal2 = true;
				/*
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_obs', {
					'id': id
				}).then((res) => {
					if(res.status == 0) {
						this.$Message.success(res.message);
					} else {
						this.$Message.error(res.message);
					}
					this.initData();
				});
				*/
			}
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style scoped>

</style>