<template>
	<view v-if='show' class="popup spec" @click="eject" @touchmove.stop.prevent="stopPrevent">
		<!-- 弹出层 -->
		<view class="layer attr-content" @click.stop.prevent="stopPrevent">
			<view class="a-t">
				<image :src="pic.img"></image>
				<view class="right">
					<text class="price">¥328.00</text>
					<text class="stock">库存：188件</text>
					<view class="selected">
						类型：
						<text v-show='isShow'>请选择</text>
						<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
							{{sItem.name}}
						</text>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in specList" :key="index">
				<text>{{item.name}}</text>
				<view class="item-list">
					<text class="tit text" v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex"
					 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
						{{childItem.name}}
					</text>
				</view>
			</view>
			<button class="btn" @click="test()">完成</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				isShow: true,
				imgList: [], //大图
				pic: {}, //小图
				xuan: {}, //选择的类型
				specSelected: [],
				specList: [{
						id: 1,
						name: '尺寸',
					},
					{
						id: 2,
						name: '颜色',
					},
				],
				specChildList: [{
						id: 1,
						pid: 1,
						name: 'XS',
					},
					{
						id: 2,
						pid: 1,
						name: 'S',
					},
					{
						id: 3,
						pid: 1,
						name: 'M',
					},
					{
						id: 4,
						pid: 1,
						name: 'L',
					},
					{
						id: 5,
						pid: 1,
						name: 'XL',
					},
					{
						id: 6,
						pid: 1,
						name: 'XXL',
					},
					{
						id: 7,
						pid: 2,
						name: '白色',
					},
					{
						id: 8,
						pid: 2,
						name: '珊瑚粉',
					},
					{
						id: 9,
						pid: 2,
						name: '草木绿',
					}
				]
			}
		},
		created() {
			this.getImg();
		},
		methods: {
			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				// console.log(list);
				list.forEach(item => {
					if (item.pid === pid) {
						// console.log(item);
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
						// console.log(this.specSelected);
						for (var i = 0; i < this.specSelected.length; i++) {
							this.xuan[i] = this.specSelected[i].name;
							// console.log(this.xuan);
						}
						this.isShow = false;
					}
				})
			},
			//弹出
			eject() {
				if (this.show) {
					setTimeout(() => {
						this.show = false;
					}, 200)
					return;
				}
				this.show = true;
				// console.log(this.xuan);
			},
			test() {
				this.show = false;
				let a = { ...this.xuan
				};
				// console.log(a);
				this.$emit("aa", a);
			},
			//防止冒泡和滚动穿透
			stopPrevent() {},
			getImg() {
				uni.request({
						url: 'https://easy-mock.com/mock/5cea36ce8347da71af1d4b52/test/img'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						this.imgList = [...this.imgList, ...res.data.data.record];
						this.pic = this.imgList[0];
					})
			},
		}
	}
</script>

<style>
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0upx;
		width: 100%;
		min-height: 40vh;
		-webkit-border-radius: 5upx 5upx 0 0;
		border-radius: 5upx 5upx 0 0;
		background-color: #fff;
	}

	.attr-content {
		padding: 10upx 30upx;
	}

	.a-t {
		display: flex;
	}

	uni-image {
		width: 170upx;
		height: 170upx;
		flex-shrink: 0;
		margin-top: -40upx;
		border-radius: 8upx;
	}

	uni-image>div,
	uni-image>img {
		width: 100%;
		height: 100%;
	}

	.right {
		display: flex;
		flex-direction: column;
		padding-left: 24upx;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		line-height: 42upx;
	}

	.attr-list {
		display: flex;
		flex-direction: column;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.item-list {
		padding: 20upx 0 0 0;
		display: flex;
		flex-wrap: wrap;
	}

	.item-list .selected {
		background: #f9ebeb;
	}

	.text {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eee;
		margin-right: 20upx;
		margin-bottom: 20upx;
		border-radius: 10upx;
		height: 60upx;
		padding: 0 20upx;
		font-size: $font-base;
		color: $font-color-dark;
	}

	.selected-text {
		margin-right: 10upx;
	}

	.btn {
		width: 95%;
		height: 66upx;
		line-height: 66upx;
		border-radius: 100upx;
		color: #fff;
		margin: 30upx auto 20upx;
		background: #f00;
	}
</style>
