<template>
	<view class="content">
		<view class="search-box">
				<image src="../../static/index-img/arrow-left.png" mode="" class="back" @click="goback"></image>
				<image src="../../static/index-img/fangdajing.png" mode="" class="fangdajing"></image>
				<input class="search-input" type="text" placeholder="搜索" placeholder-style="color:#999999"/>
				<view class="search-button">搜索</view>
		</view>
		<view class="search-history">
			<view class="search-history-title">搜索历史</view>
			<image src="../../static/index-img/trash.png" mode="" class="search-trash"></image>
			<view class="history1">连衣裙</view>
			<view class="history2">小香风套装</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goback:function(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	.content{
		width: 750upx;
		height: 1334upx;
		background-color: #FFFFFF;
		text-align: center;
	}
	.search-box {
		width: 750upx;
		height: 129upx;
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 99;
		border-bottom: 1upx solid #DDDDDD;
	}
	.fangdajing {
		width: 30upx;
		height: 30upx;
		position: absolute;
		left: 80upx;
		top: 72upx;
		z-index: 10;
	}
	.search-input {
		width: 550upx;
		height: 50upx;
		background-color: #EEEEEE;
		border-radius: 25upx;
		position: absolute;
		left: 60upx;
		top: 59upx;
		placeholder: "搜索";
		text-align: left;
		padding-left: 61upx;
		padding-top: 10upx;
		font-size: 28upx;
	}
	.back{
		width: 15upx;
		height: 24upx;
		position: absolute;
		left: 20upx;
		top: 72upx;
	}
	.search-button{
		width: 100upx;
		height: 50upx;
		background-color: #EF1C00;
		border-radius: 25upx;
		font-size: 28upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 50upx;
		position: absolute;
		right: 20upx;
		top: 59upx;
	}
	.search-history-title{
		font-size: 28upx;
		color: #333333;
		position: absolute;
		left: 19upx;
		top: 150upx;
	}
	.search-trash{
		width: 30upx;
		height: 32upx;
		position: absolute;
		right: 20upx;
		top: 150upx;
	}
	.history1{
		width: 110upx;
		height: 40upx;
		border: 1upx solid #DDDDDD;
		border-radius: 20upx;
		font-size: 24upx;
		color: #999999;
		text-align: center;
		line-height: 40upx;
		position: absolute;
		left: 20upx;
		top: 198upx;
	}
	.history2{
		width: 160upx;
		height: 40upx;
		border: 1upx solid #DDDDDD;
		border-radius: 20upx;
		font-size: 24upx;
		color: #999999;
		text-align: center;
		line-height: 40upx;
		position: absolute;
		left: 140upx;
		top: 198upx;
	}
</style>
