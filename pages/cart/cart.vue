<template>
	<view>
	<view @click='toggleSpec()'>点击加入购物车</view>
	<view class="popup" :class="specClass" @click="toggleSpec()" @touchmove.stop.prevent="stopPrevent">
		<view class='shadow'></view><!-- 阴影层 -->
		<view class='cart' @click.stop="stopPrevent"><!-- 购物车部分，分为不动头尾与可滚动中间部分 -->
			<view class='header'>
				<img src="../../static/cate1.jpg" alt="">
				<view class='text'>
					<view><strong>￥{{this.price}}</strong></view>
					<text>请选择:颜色分类 尺寸</text>
				</view>
				<text class='lg text-gray cuIcon-close' @click='toggleSpec()'></text>
			</view>
			<view class='content'>
				<view class='list' v-for='(item,index) in bigList' :key='index'>
					<view class='select'>{{item.name}}</view>
					<view class='kind' :class='{selected: childItem.selected}' v-for='(childItem, childIndex) in smallList' v-if="childItem.pid === item.id"
					 @click='change(childIndex, childItem.pid)' :key='childIndex'>{{childItem.name}}</view>
				</view>
				<view class='buy'>
					<text class='select'>购买数量</text>
					<view class='btn'>
						<view class='kind reduce' @click='reduce()'>-</view>
						<view class='kind'>{{this.shuliang}}</view>
						<view class='kind add' @click='add()'>+</view>
					</view>
				</view>
			</view>
		</view>
		<view class='footer' @click="toggleSpec()">确定</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specClass: 'none',
				specSelected: [],
				shuliang: 1,
				price: 350,
				bigList: [{
						id: 1,
						name: '尺码',
					},
					{
						id: 2,
						name: '颜色分类',
					},
				],
				smallList: [{
						id: 1,
						pid: 1,
						name: 'S',
					},
					{
						id: 2,
						pid: 1,
						name: 'M',
					},
					{
						id: 3,
						pid: 1,
						name: 'L',
					},
					{
						id: 4,
						pid: 1,
						name: 'XL',
					},
					{
						id: 5,
						pid: 2,
						name: '卡其',
					},
					{
						id: 6,
						pid: 2,
						name: '白色',
					},
					{
						id: 7,
						pid: 2,
						name: '黑色',
					}, {
						id: 8,
						pid: 2,
						name: '藏蓝'
					}
				]

			}
		},
		onLoad() {
			// 开始默认选中第一项
			this.bigList.forEach(item => {
				for (let cItem of this.smallList) {
					if (cItem.pid === item.id) {
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break;
					}
				}
			})
		},
		methods: {
			//阻止事件冒泡
			stopPrevent(){},
			// 弹出窗与弹回窗
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			add() {
				this.shuliang++;
			},
			reduce() {
				this.shuliang--;
			},
			// 选择规格,点击变化
			change(index, pid) {
				let list = this.smallList;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
					}
				})

			}
		}
	}
</script>

<style lang='scss'>
	.shadow {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.cart {
		z-index: 100;
		width: 100%;
		height: 520upx;
		position: fixed;
		bottom: 100upx;
		background: #fff;
		box-sizing: border-box;
		padding: 0 20upx;
	}

	.header {
		width: 100%;
		height: 200upx;
		position: sticky;
		top: 0;
		border-bottom: 0.5upx solid #ddd;
	}

	.header img {
		width: 160upx;
		height: 160upx;
		margin-top: 20upx;
	}

	.text {
		position: absolute;
		top: 100upx;
		left: 180upx;
		color: #999;
		font-size: 22upx;
	}

	.text view {
		color: #ef1c00;
		font-size: 28upx;
	}

	.cuIcon-close {
		float: right;
		font-size: 44upx;
		margin-top: 10upx;
		color: #989898;
	}

	.content {
		width: 100%;
		height: 320upx;
		overflow: auto;
	}

	.footer {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		position: fixed;
		bottom: 0;
		background: #ef1c00;
		text-align: center;
		color: #fff;
		font-size: 30upx;
		z-index: 99;
	}

	.list {
		height: 120upx;
		width: 100%;
		border-bottom: 2upx solid #ddd;
		padding: 15upx 0 15upx 0;
	}
	/* 文字部分 */
	.select {
		color: #000;
		font-size: 26upx;
		margin:0 0 14upx 0;
	}
	/* 按钮部分 */
	.kind {
		min-width: 70upx;
		height: 40upx;
		background: #eee;
		border-radius: 6upx;
		text-align: center;
		line-height: 38upx;
		color: #000;
		float: left;
		margin: 0 10upx 0 0;
		font-size: 20upx;
	}

	.buy {
		height: 80upx;
		border-bottom: 1px solid #ddd;
		padding-top: 20upx;
	}

	.btn {
		float: right;
	}

	.reduce {
		color: #989898;
		font-size: 40upx;
	}

	.add {
		color: #666;
	}

	.selected {
		color: #ee1d00;
		background: #fff;
		border: 2upx solid #ee1d00;
	}
	/* 弹出窗部分 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.shadow{
				animation: showPopup 0.2s linear both;
			}
			.cart {
				animation: showLayer 0.2s linear both;
			}
			.footer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.shadow{
				animation: hidePopup 0.2s linear both;
			}
			.cart {
				animation: hideLayer 0.2s linear both;
			}
			.footer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
		}
</style>
