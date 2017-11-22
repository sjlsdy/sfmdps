<template>
	<div :style="{left:boxLeft}" class="box">
		<div class="close-btn">
			<Button type="primary" shape="circle" icon="close-round" @click="closeBtn"></Button>
		</div>
		<div class="boxmain">
			<issuesDetail ref="issuesDetail"></issuesDetail>
		</div>
	</div>
</template>

<script>
	import issuesDetail from './issuesDetail'
	export default {
		components: {
			issuesDetail,
		},
		data() {
			return {
				bodyWidth: 0,
				boxLeft: '100%',
			}
		},
		methods: {
			showPage(id) {
				this.$refs.issuesDetail.initData(id);
				this.bodyWidth = document.body.clientWidth;
				this.boxLeft = this.bodyWidth + 'px';
				this.setOpen(this.bodyWidth, 1);
			},
			closeBtn() {
				this.$emit("closeDetailBox")
				this.setClose(0, 1);
			},
			setOpen(num, level) {
				var _slef = this;
				if(num > 0) {
					_slef.boxLeft = num + 'px';
					setTimeout(function() {
						_slef.setOpen(num - (20 * (level * 0.2)), level + 1);
					}, 10);
				} else {
					this.boxLeft = '0px';
				}

			},
			setClose(num, level) {
				var _slef = this;
				if(num < _slef.bodyWidth) {
					_slef.boxLeft = num + 'px';
					setTimeout(function() {
						_slef.setClose(num + (20 * (level * 0.2)), level + 1);
					}, 10);
				} else {
					this.boxLeft = '100%';
				}
			},
		}
	}
</script>

<style>
	.box {
		overflow: hidden;
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 999;
	}
	.box .close-btn {
		position: absolute;
		top: 20px;
		left: 20px;
	}
	.box .boxmain {
		overflow-y: auto;
	}
</style>