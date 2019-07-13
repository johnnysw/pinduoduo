<template>
	<view class="integral-rules">
		<view class="bar">
			<view class="cuIcon-back"></view>
			<view class="content">积分规则</view>
		</view>
		<view scroll-y="true" class="rules">
			<view v-for="(item,index) in list" :key="index" class="rules-item">
			<!-- <view class="rules-item"> -->
				<view class="title">
					{{item.title}}
				</view>
				<view class="content">
					<view class=""> 
					 {{item.content}}
					</view>
					<!-- <view class="">
						2.每周用户最多可获得6次领取积分资格，每天最多领取一次。
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad: function() {
			uni.request({
				url: 'https://www.easy-mock.com/mock/5d268e34ae612f2b796a7c51/pddapp/pddapp1',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.list=res.data.data.list;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
	.integral-rules{
		width: 750upx;
		background:rgba(255,255,255,1);
	}
	
	/* 导航栏 */
	.bar {
		width: 750upx;
		height: 130upx;
		background: rgba(255,255,255,1);
		border: 1upx solid rgba(221,221,221,1);
		position: fixed;
		top: 0;
		z-index: 99;
	}
	
	.bar .cuIcon-back{
		width: 14upx;
		height: 24upx;
		background:rgba(255,255,255,1);
		position: absolute;
		left: 20upx;
		top: 73upx;
	}
	
	.bar .content{
		font-size: 28upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		position: absolute;
		left: 320upx;
		top: 65upx;
	}
	
	/* 规则 */
	.rules{
		margin: 130upx 20upx 0 20upx;
	}
	
	.rules-item{
		width: 710upx;
		padding: 29upx 0 30upx 0;
		border-bottom: 1px solid rgba(221,221,221,1)
	}
	
	.rules-item .title{
		font-size: 28upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		padding-bottom: 28upx;
	}
	
	.rules-item .content{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(153,153,153,1);
	}
</style>
