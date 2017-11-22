<template>
	<div>
		<div class="boxBg" v-if="boxBgView"></div>
		{{bodyWidth}}
		<div :style="{left:boxLeft}" class="box">
			<div class="close-btn">
				<Button type="primary" shape="circle" icon="close-round" @click="closeBtn"></Button>
			</div>
			<div class="boxmain">
				<issuesDetail ref="issuesDetail"></issuesDetail>
			</div>
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
				boxBgView: false,
				bodyWidth: 0,
				boxLeft: '100%',
			}
		},
		methods: {
			initSize() {
				this.bodyWidth = document.body.clientWidth;
			},
			showPage(id) {
				this.initSize();
				this.$refs.issuesDetail.initData(id);
				this.boxLeft = this.bodyWidth + 'px';
				this.setOpen(this.bodyWidth, 1);
				this.boxBgView = true;
			},
			closeBtn() {
				this.initSize();
				this.boxLeft = this.bodyWidth / 2 + 'px';
				this.setClose(this.bodyWidth / 2, 1);
			},
			setOpen(num, level) {
				var _slef = this;
				if(num > _slef.bodyWidth / 2) {
					_slef.boxLeft = num + 'px';
					setTimeout(function() {
						_slef.setOpen(num - (20 * (level * 0.2)), level + 1);
					}, 10);
				} else {
					_slef.boxLeft = '50%';
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
					_slef.boxLeft = '100%';
					_slef.boxBgView = false;
					_slef.$emit("closeDetailBox")
				}
			},
		}
	}
</script>

<style>
	.box {
		overflow: hidden;
		position: fixed;
		width: 50%;
		top: 0;
		bottom: 0;
		background: none;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
		z-index: 999;
	}
	
	.box .close-btn {
		position: absolute;
		top: 20px;
		right: 20px;
	}
	
	.box .boxmain {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background: #FFF;
		overflow-y: auto;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
	}
	
	.boxBg {
		background: rgba(0, 0, 0, 0.15);
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>