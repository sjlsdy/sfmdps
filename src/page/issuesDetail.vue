<template>
	<div>
		<Form ref="formData" :model="formData.formItem" :label-width="120">
			<FormItem label="issueType">
				{{formData.formItem.issueType}}
			</FormItem>
			<FormItem label="status">
				{{formData.formItem.status}}
				<Dropdown placement="bottom-start" style="margin-left: 20px;" trigger="custom" :visible="statusVisible">
					<a href="javascript:void(0)" @click="openStatus">
						Change Status
						<Icon type="arrow-down-b"></Icon>
					</a>
					<DropdownMenu slot="list">
						<Button type="text" long v-if="formData.formItem.status != 'open'" @click="changeStatus('open')">open</Button>
						<Button type="text" long v-if="formData.formItem.status != 'observation'" @click="changeStatus('observation')">observation</Button>
						<Button type="text" long v-if="formData.formItem.status != 'closed'" @click="changeStatus('closed')">Closed</Button>
					</DropdownMenu>
				</Dropdown>
			</FormItem>
			<FormItem label="type">
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

			<FormItem label="ST Eff">
				{{formData.formItem.stEff == 1?'已验证':'未验证'}}
			</FormItem>
			<FormItem label="short term solution	">
				{{formData.formItem.shortTermSolution}}
			</FormItem>
			<FormItem label="LT Eff">
				{{formData.formItem.ltEff == 1?'已验证':'未验证'}}
			</FormItem>
			<FormItem label="Long term solution">
				{{formData.formItem.longTermSolution}}
			</FormItem>
			<FormItem label="RC Eff">
				{{formData.formItem.rcEff == 1?'已验证':'未验证'}}
			</FormItem>
			<FormItem label="Root cause">
				{{formData.formItem.rootCause}}
			</FormItem>

			<FormItem label="picture">
				<img :src="formData.formItem.picture" />
			</FormItem>
			<FormItem v-if="formData.formItem.status != 'observation'">
			</FormItem>
		</Form>
	</div>
</template>

<script>
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	export default {
		data() {
			return {
				statusVisible: false,
				formData: {
					formItem: {
						id: '',
						issueType: '',
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
			initData(id) {
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_detail', {
					'id': id
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
			openStatus() {
				this.statusVisible = true;
			},
			changeStatus(e) {
				this.statusVisible = false;
				fetchPostUrlencoded('/www/?m=issues&c=issues&a=issues_status', {
					id: this.formData.formItem.id,
					status: e
				}).then((res) => {
					if(res.status == 0) {
						this.$Message.success(res.message);
					} else {
						this.$Message.error(res.message);
					}
					this.initData(this.formData.formItem.id);
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