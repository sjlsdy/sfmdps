<template>
	<div>
		<Form ref="formData" :model="formData.formItem" :rules="formData.ruleValidate" :label-width="120">
			<FormItem label="issueType" prop="issueType">
				<Select v-model="formData.formItem.issueType">
					<Option v-for="item in formData.formItem.issueTypeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
				<Input v-model="formData.formItem.description" type="textarea" :rows="4" placeholder=""></Input>
			</FormItem>
			<FormItem label="picture">
				<Row>
					<Col span="24">
					<Upload action="/www/?m=issues&c=issues&a=uploadimg" type="drag" :show-upload-list="false" :on-success="uploadSuccess" :on-error="uploadError">
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>Click or drag files here to upload</p>
						</div>
					</Upload>
					</Col>
					<Col span="20">
					</Col>
				</Row>
				<div style="width: 200px;" v-if="formData.formItem.picture != ''">
					<br />
					<img :src="formData.formItem.picture" width="100%" style="display: block; border: #DDDDDD 1px solid; padding: 4px;" />
				</div>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="submitForm">Submit issue</Button>
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
						issueType: '',
						issueTypeArr: [{
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
						issueType: [{
							required: true,
							message: '请选择issue分类',
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
							issueType: this.formData.formItem.issueType,
							type: this.formData.formItem.type,
							issueDate: this.formData.formItem.issueDate,
							qsensor: this.formData.formItem.qsensor,
							prio: this.formData.formItem.prio,
							description: this.formData.formItem.description,
							picture: this.formData.formItem.picture
						}).then((res) => {
							if(res.status == 0) {
								this.$Message.success(res.message);
								this.closeParent();
								// 提交成功重置表单
								this.$refs["formData"].resetFields();
								this.formData.formItem.status = '';
								this.formData.formItem.type = '';
								this.formData.formItem.qsensor = '';
								this.formData.formItem.prio = '';
								this.formData.formItem.description = '';
								this.formData.formItem.picture = '';
							} else {
								this.$Message.error(res.message);
							}
						});
					} else {
						this.$Message.error('表单未填写完整');
					}
				})
			},
			uploadSuccess(response, file, fileList) {
				if(response.status == 0) {
					this.$Message.success(response.message);
					this.formData.formItem.picture = response.data.url;
				} else {
					this.$Message.error(response.message);
				}
			},
			uploadError(error, file, fileList) {
				this.$Message.error('上传失败');
				this.$Message.error('可能上传的文件过大');
			},
			// 切换issues日期
			changeIssuesDate(e) {
				this.formData.formItem.issueDate = e;
			},
			// 从父级关弹层
			closeParent: function() {
				this.$emit("closeNewIssues")
			}
		},
		mounted() {

		}
	}
</script>

<style>

</style>