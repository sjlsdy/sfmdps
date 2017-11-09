<template>
	<div>
		<Row>
			<Col span="4">
			<Button type="primary">new issues</Button>
			</Col>
		</Row>
		<Tabs value="name1" :animated="false">
			<TabPane label="标签一" name="name1">标签一的内容</TabPane>
			<TabPane label="标签二" name="name2">标签二的内容</TabPane>
			<TabPane label="标签三" name="name3">标签三的内容</TabPane>
		</Tabs>
		<Table border :columns="columns" :data="data" :loading="loading"></Table>
	</div>
</template>

<script>
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	export default {
		name: 'issuesList',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				loading: false,
				page: {
					status: '',
					total: 0,
					page: 1,
					size: 20
				},
				columns: [{
						title: 'status',
						key: 'status'
					},
					{
						title: 'type',
						key: 'type'
					},
					{
						title: 'issueDate',
						key: 'issueDate'
					},
					{
						title: 'qsensor',
						key: 'qsensor'
					},
					{
						title: 'prio',
						key: 'prio'
					},
					{
						title: 'description',
						key: 'description'
					},
					{
						title: 'picture',
						key: 'picture'
					}
				],
				data: []
			}
		},
		methods: {
			initData() {
				this.loading = true;
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_list', {
					'status': 'SFM',
					'page': this.page.page,
					'size': this.page.size
				}).then((res) => {
					if(res.status == 0) {
						//this.page.total = res.count;
						this.data = res.data;
						this.$Message.success(res.msg);
					} else {
						this.$Message.error(res.msg);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style scoped>

</style>