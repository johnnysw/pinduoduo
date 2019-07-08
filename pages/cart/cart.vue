<template>
	<view class='shadow'>
		<view class='cart'>
			<view class='header'>
				<img src="../../static/cate1.jpg" alt="">
				<view class='text'>
					<view>￥{{this.price}}</view>
					<text>请选择:颜色分类 尺寸</text>
				</view>
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
		<view class='footer'>确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specSelected: [],
				shuliang: 1,
				price: 350,
				bigList: [
					{
						id: 1,
						name: '尺寸',
					},
					{	
						id: 2,
						name: '颜色分类',
					},
				],
				smallList: [
					{
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
						name: '白色',
					},
					{
						id: 6,
						pid: 2,
						name: '黑色',
					},
					{
						id: 7,
						pid: 2,
						name: '藏蓝',
					},
				]

			}
		},
		onLoad() {

		},
		methods: {
			add() {
				this.shuliang++;
			},
			reduce() {
				this.shuliang--;
			},
			change(index, pid){
				let list = this.smallList;
				list.forEach(item=>{
					if(item.pid === pid){
						this.$set(item, 'selected', false);
					}
				})
			
				this.$set(list[index], 'selected', true);
				this.specSelected = []; 
				list.forEach(item=>{ 
					if(item.selected === true){ 
						this.specSelected.push(item); 
					} 
				})
				
			}
		}
	}
</script>

<style>
	.shadow {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.cart {
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
		font-size: 20upx;
	}

	.text view {
		color: #ef1c00;
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
	}

	.list {
		height: 120upx;
		width: 100%;
		border-bottom: 2upx solid #ddd;
	}

	.select {
		color: #000;
		font-size: 10upx;
		margin-top: 20upx;
	}

	.kind {
		width: 70upx;
		height: 38upx;
		background: #eee;
		border-radius: 6upx;
		text-align: center;
		line-height: 38upx;
		color: #000;
		float: left;
		margin: 20upx 10upx 0 0;
		font-size: 2upx;
	}

	.buy {
		height: 80upx;
		border-bottom: 1px solid #ddd;
	}

	.btn {
		float: right;
	}

	.reduce {
		color: #989898;
	}

	.add {
		color: #666;
	}

	.selected {
		color: #ee1d00;
		background: #fff;
		border: 2upx solid #ee1d00;
	}
</style>
