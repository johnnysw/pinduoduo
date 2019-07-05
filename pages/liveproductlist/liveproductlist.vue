<template>
	<view class="productlist">
		<view class="productlist-title" >全部宝贝{{list.length}}</view>
		<scroll-view scroll-y="true" class="product">
			<view v-for="(item,index) in list" :key="index" class="product-item">
				<view class="image-wrapper">
					<view class="image-num">{{item.id}}</view>
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="price-box">
					<view class="title">{{item.title}}</view>
					<view class="price">￥{{item.price}}</view>
					<view class="sale">已售{{item.sales}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				list: [],
			}
		},
		onLoad: function() {
			uni.request({
				url: 'http://yapi.demo.qunar.com/mock/75419/wujy_test/test',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.list=res.data.list;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			
		},
	}
</script>

<style>
	.productlist {
		width: 750upx;
		height: 900upx;
		position: fixed;
		bottom: 0;
	}
	
	.productlist-title {
		width: 750upx;
		height: 80upx;
		line-height: 80upx;
		padding-left: 19upx;
		font-size: 28upx;
		color: #333333;
		border-bottom: 1upx solid #DDDDDD;
	}

	.product {
		height: 820upx;
		width: 710upx;
		position: absolute;
		left: 20upx
	}
	
	.product-item {
		width: 710upx;
		height: 180upx;
		border-bottom: 1upx solid #DDDDDD;
		display: flex;
	}
	
	.product-item:last-child{
		border-bottom: none;
	}
	
	.image-wrapper image {
		width: 140upx;
		height: 140upx;
		margin-top: 20upx;
	}
	
	.image-num{
		width: 30upx;
		height: 30upx;
		line-height: 30upx;
		text-align: center;
		color: #ffffff;
		font-size: 20upx;
		background-color: #333333;
		position: absolute;
		z-index: 99;
		margin-top: 20upx;	
	}
	
	.price-box {
		flex: 1
	}

	.title {
		width: 531upx;
		height: 53upx;
		font-size: 24upx;
		font-color: #333333;
		margin-top: 29upx;
		margin-left: 20upx;
	}

	.price {
		position: absolute;
		left: 159upx;
		margin-top: 48upx;
		color: #ef1c00;
		font-size: 24upx;
	}

	.sale {
		position: absolute;
		left: 620upx;
		margin-top: 48upx;
		color: #999999;
		font-size: 20upx
	}
	
</style>
