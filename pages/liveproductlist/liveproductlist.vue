<template>
	<view class="content">
		<view class="top" @click="hidelist">
			<view>
				<view class="photo"></view>
				<view class="photo-pic"></view>
				<view class="photo-name">主播名字</view>
				<view class="watching">223568人观看</view>
			</view>
			<view class="goback" @click="goback">
				<image src="../../static/liveproduct-img/goback.png" mode=""></image>
			</view>
		</view>
		<view class="buying">
			<image src="../../static/liveproduct-img/cart.png" mode=""></image>
			<text>王***正在去买</text>
		</view>
		<view class="cart-box" @click="showlist">
			<image src="../../static/liveproduct-img/cart-pic.png" mode=""></image>
		</view>
		<view class="talking">
			<input type="text" placeholder="和主播聊点什么？" placeholder-style="color:#FFFFFF">
		</view>
		<view class="productlist" :animation="animationData" style="transform: translateY(100%)">
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
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				list: [],
				animationData:{}
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
		onShow() {
			uni.hideTabBar({
				
			});
			var animation=uni.createAnimation({
				duration:300,
				timingFunction:"linear"
			})
			this.animation=animation;
			this.animationData=animation.export();
		},
		methods: {
			goback:function(){
				uni.switchTab({
					url:"../index/index"
				})
				uni.showTabBar({
					
				})	
			},
			showlist:function(){
				this.animation.translateY(0).step();
				this.animationData=this.animation.export();
			},
			hidelist:function(){
				this.animation.translateY("100%").step();
				this.animationData=this.animation.export();
			}
		},
	}
</script>

<style>
	.content{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #cccccc;
	}
	.top{
		width: 750upx;
		height: 100%;
		position: relative;
	}
	.photo{
		width: 280upx;
		height: 80upx;
		background-color: #000000;
		opacity: 0.3;
		border-radius: 40upx;
		position: absolute;
		left: 20upx;
		top: 44upx;
	}
	.photo-pic{
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		position: absolute;
		left: 30upx;
		top: 53.5upx;
		background-color: #BB8686;
	}
	.photo-name{
		color: #FFFFFF;
		font-size: 24upx;
		position: absolute;
		left: 100upx;
		top: 52upx;
	}
	.watching{
		color: #FFFFFF;
		font-size: 24upx;
		position: absolute;
		left: 100upx;
		top: 89upx;
	}
	.goback{
		width: 30upx;
		height: 30upx;
		position: absolute;
		right: 20upx;
		top: 69upx;
	}
	.goback image{
		width: 30upx;
		height: 30upx;
	}
	.cart-box{
		width: 90upx;
		height: 90upx;
		position: absolute;
		left: 20upx;
		bottom: 20upx;
		/* z-index: 99; */
	}
	.cart-box image{
		width: 90upx;
		height: 90upx;
	}
	.buying{
		width: 230upx;
		height: 50upx;
		background-color: #FF6600;
		opacity: 0.8;
		border-radius: 5upx;
		position: absolute;
		left: 20upx;
		bottom: 236upx;
	}
	.buying image{
		width: 30upx;
		height: 30upx;
		position: absolute;
		left: 14upx;
		top: 9upx;
	}
	.buying text{
		font-size: 24upx;
		color: #FFFFFF;
		position: absolute;
		left: 56upx;
		top: 10upx;
	}
	.talking{
		width: 605upx;
		height: 47upx;
		position: absolute;
		left: 122upx;
		bottom: 29upx;
		border-bottom: 1upx solid #FFFFFF;
	}
	.talking input{
		font-size: 24upx;
	}
	.productlist {
		width: 750upx;
		height: 900upx;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
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
