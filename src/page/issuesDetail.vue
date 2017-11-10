<template>
	<div>
		<Form ref="formData" :model="formData.formItem" :label-width="80">
			<FormItem label="status" prop="status">
				{{formData.formItem.status}}
			</FormItem>
			<FormItem label="type" prop="type">
				{{formData.formItem.type}}
			</FormItem>
			<FormItem label="issueDate">
				{{formData.formItem.issueDate}}
			</FormItem>
			<FormItem label="qsensor">
				{{formData.formItem.qsensor}}
			</FormItem>
			<FormItem label="prio">
				{{formData.formItem.prio}}
			</FormItem>
			<FormItem label="description">
				{{formData.formItem.description}}
			</FormItem>
			<FormItem label="picture">
				{{formData.formItem.picture}}
			</FormItem>
			<FormItem>
				<Button type="primary" @click="obsIssues">完成issues</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	export default {
		props: ['id'],
		data() {
			return {
				data: '',
				formData: {
					formItem: {
						id: '',
						status: '',
						statusArr: [{
							value: 'SFM',
							label: 'SFM'
						}, {
							value: 'DPS',
							label: 'DPS'
						}],
						type: '',
						typeArr: [{
							value: 'x253',
							label: 'x253'
						}, {
							value: 'V213',
							label: 'V213'
						}, {
							value: 'W213',
							label: 'W213'
						}],
						issueDate: '',
						qsensor: '',
						qsensorArr: [{
							value: 'Q Gate',
							label: 'Q Gate'
						}, {
							value: 'PAB',
							label: 'PAB'
						}, {
							value: 'PAF',
							label: 'PAF'
						}, {
							value: 'GFP',
							label: 'GFP'
						}, {
							value: 'VOCA',
							label: 'VOCA'
						}, {
							value: 'DT',
							label: 'DT'
						}],
						prio: '',
						description: '',
						picture: ''
					}
				}
			}
		},
		methods: {
			initData() {
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_detail', {
					'id': this.id
				}).then((res) => {
					if(res.status == 0) {
						this.$Message.success(res.message);
						this.formData.formItem = res.data;
					} else {
						this.$Message.error(res.message);
					}
				});
			},
			obsIssues() {
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_obs', {
					id: this.formData.formItem.id
				}).then((res) => {
					if(res.status == 0) {
						this.$Message.success(res.message);
					} else {
						this.$Message.error(res.message);
					}
				});
			},
			// 从父级关弹层
			closeParent: function() {
				this.$emit("closeIssuesDetail")
			}
		},
		mounted() {}
	}
</script>

<style>

</style>