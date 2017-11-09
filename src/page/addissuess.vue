<template>
	<div>
		<Form :model="formItem" :label-width="80">
			<FormItem label="status">
				<Select v-model="formItem.status">
					<Option v-for="item in formItem.statusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="type">
				<Select v-model="formItem.type">
					<Option v-for="item in formItem.typeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="issueDate">
				<DatePicker type="formItem.issueDate" placeholder="Select date"></DatePicker>
				<Input v-model="formItem.issueDate" placeholder=""></Input>
			</FormItem>
			<FormItem label="qsensor">
				<Select v-model="formItem.qsensor">
					<Option v-for="item in formItem.qsensorArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="prio">
				<Input v-model="formItem.prio" placeholder=""></Input>
			</FormItem>
			<FormItem label="description">
				<Input v-model="formItem.description" placeholder=""></Input>
			</FormItem>
			<FormItem label="picture">
				<Input v-model="formItem.picture" placeholder=""></Input>
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
				}
			}
		},
		methods: {
			submitForm() {
				fetchGetHaveParam('/www/?m=issuess&c=issuess&a=add_issuess', {
					status: this.formItem.status,
					type: this.formItem.type,
					issueDate: this.formItem.issueDate,
					qsensor: this.formItem.qsensor,
					prio: this.formItem.prio,
					description: this.formItem.description,
					picture: this.formItem.picture
				}).then((res) => {
					if(res.status == 200) {
						this.data = res.data;
						this.$Message.success(res.message);
					} else {
						this.$Message.error(res.message);
					}
				});
			}
		}
	}
</script>

<style>

</style>