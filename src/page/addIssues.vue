<template>
	<div>
		<Form ref="formData" :model="formData.formItem" :rules="formData.ruleValidate" :label-width="80">
			<FormItem label="status" prop="status">
				<Select v-model="formData.formItem.status">
					<Option v-for="item in formData.formItem.statusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="type" prop="type">
				<Select v-model="formData.formItem.type">
					<Option v-for="item in formData.formItem.typeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="issueDate" prop="issueDate">
				<DatePicker type="date" @on-change="changeIssuesDate"></DatePicker>
			</FormItem>
			<FormItem label="qsensor" prop="qsensor">
				<Select v-model="formData.formItem.qsensor">
					<Option v-for="item in formData.formItem.qsensorArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="prio" prop="prio">
				<Input v-model="formData.formItem.prio" placeholder=""></Input>
			</FormItem>
			<FormItem label="description">
				<Input v-model="formData.formItem.description" placeholder=""></Input>
			</FormItem>
			<FormItem label="picture">
				<Input v-model="formData.formItem.picture" placeholder=""></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="submitForm">提交issuess</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'
	export default {
		data() {
			return {
				data: '',
				formData: {
					formItem: {
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
					},
					ruleValidate: {
						status: [{
							required: true,
							message: 'status 必须填',
							trigger: 'blur'
						}],
						type: [{
							required: true,
							message: 'type 必须填',
							trigger: 'blur'
						}],
						issueDate: [{
							required: true,
							message: 'issueDate 必须填',
							trigger: 'blur'
						}],
						qsensor: [{
							required: true,
							message: 'qsensor 必须填',
							trigger: 'blur'
						}],
						prio: [{
							required: true,
							message: 'prio 必须填',
							trigger: 'blur'
						}],
					}
				}
			}
		},
		methods: {
			submitForm() {
				this.$refs['formData'].validate((valid) => {
					if(valid) {
						fetchPostUrlencoded('/www/?m=issues&c=issues&a=add_issues', {
							status: this.formData.formItem.status,
							type: this.formData.formItem.type,
							issueDate: this.formData.formItem.issueDate,
							qsensor: this.formData.formItem.qsensor,
							prio: this.formData.formItem.prio,
							description: this.formData.formItem.description,
							picture: this.formData.formItem.picture
						}).then((res) => {
							if(res.status == 0) {
								this.data = res.data;
								this.$Message.success(res.message);
								this.$router.push('/')
							} else {
								this.$Message.error(res.message);
							}
						});
					} else {
						this.$Message.error('表单未填写完整');
					}
				})
			},
			// 切换issues日期
			changeIssuesDate(e) {
				this.formData.formItem.issueDate = e;
			}
		}
	}
</script>

<style>

</style>