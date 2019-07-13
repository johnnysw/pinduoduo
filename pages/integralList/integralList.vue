<template>
	<view class="integral">
		<view class="bar">
			<view class="cuIcon-back"></view>
			<view class="content">积分明细</view>
		</view>
		<view class="total">
			<image class="image3" src="../../static/img/integral/integral3.png"></image>
			<view class="number">
				1000
			</view>
			<view class="text">
				积分
			</view>
		</view>
		
		<view class="coupons">
			<view class="header-left">
				积分换券
			</view>
		
			<view class="header-right">
				查看已兑换的券&nbsp&gt
			</view>
			
			<view class="content">
				<image class="image" src="../../static/img/integral/integral.png"></image>
				<image class="image2" src="../../static/img/integral/integral2.png"></image>
				<view class="left">
					<view class="text-price"></view>
					<view class="number">30</view> 
				</view>
				<view class="middle">
					<view class="top">
						30元购物券
					</view>
					<view class="bottom">
						3000积分兑换
					</view>
					<view class="bottom">
						满30.01使用
					</view>
				</view>
				<view class="right">
					<text class="text-price"></text>
					<text class="number">30</text>
					<button class="btn">立即兑换</button>
				</view>
			</view>
		</view>
		
		<view class="list">
			<view class="header-left">
				积分明细
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<view class="product">
				<view v-for="(item,index) in showList" :key="index" class="product-item">
					<view class="title">
						{{item.title}}
					</view>
					<view class="content">
						{{item.content}}
					</view>
					<!-- <view class="number"> -->
					<view class="number" :style="{ 'color': item.number>0 ? '#F12100' : '#666' }">
						{{item.number}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				nav:['全部','收入','支出'],
				list: [],
				showList: []
			}
		},
		onLoad: function() {
			uni.request({
				url: 'https://www.easy-mock.com/mock/5d268e34ae612f2b796a7c51/pddapp/pddapp',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.list=res.data.data.list;
					this.showList=res.data.data.showList;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60; 
				switch(this.TabCur){
					case '1': 
						let searchList1 = this.list.filter((item,index) => {
							if(item.number > 0){
								return item
							}
						});
						this.showList = [...searchList1];
						break; 
					case '2':
						let searchList2 = this.list.filter((item,index) => {
							if(item.number < 0){
								return item
							}
						});
						this.showList = [...searchList2];
						break; 
					default:
						this.showList = [...this.list]
				}
			}
		}
	}
</script>

<style>
	.integral{
		position: relative;
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
		color: #666;
		background: rgba(255,255,255,1);
		position: absolute;
		left: 20upx;
		top: 73upx;
	}
	
	.bar .content{
		width: 113upx;
		height: 35upx;
		font-size: 28upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		position: absolute;
		left: 320upx;
		top: 65upx;
	}
	
	/* 第一部分 */
	.total .image3{
		width: 750upx;
		height: 330upx;
		position: relative;
		top: 130upx;
	}
	
	.total .number{
		font-size: 48upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255,255,255,1);
		position: absolute;
		left: 295upx;
		top: 190upx;
	}
	
	.total .text{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255,255,255,1);
		position: absolute;
		left: 408upx;
		top: 210upx;
	}
	
	/* 第二部分 */
	.coupons{
		width: 710upx;
		height: 280upx;
		background: rgba(255,255,255,1);
		border-radius: 5upx;
		margin: 20upx;
		position: absolute;
		top: 300upx;
	}
	
	.coupons .header-left,.list .header-left{
		font-size: 28upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		position: absolute;
		left: 20upx;
		top: 31upx;
		z-index: 1;
	}
	
	.coupons .header-right{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(153,153,153,1);
		position: absolute;
		left: 493upx;
		top: 32upx;
	}
	
	.content{
		width: 670upx;
		height:170upx;
		position: absolute;
		left: 20upx;
		top: 90upx;
	}
	
	.content .image{
		width: 670upx;
		height:170upx;
	}
	
	.content .image2{
		width: 1upx;
		height: 168upx;
		position: absolute;
		left: 468upx;
		top: 1upx;
	}
	
	.content .left .text-price{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(239,28,0,1);
		position: absolute;
		left: 33upx;
		top: 55upx;
	}
	
	.content .left .number{
		font-size: 60upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(239,28,0,1);
		position: absolute;
		left: 53upx;
		top: 50upx;
	}
	
	.content .middle{
		position: absolute;
		left: 168upx;
		top: 39upx;
	}
	
	.content .middle .top{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
	}
	
	.content .middle .bottom{
		font-size: 20upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(153,153,153,1);
	} 
	
	.content .right .text-price{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		position: absolute;
		left: 523upx;
		top: 31upx;
	}
	
	.content .right .number{
		font-size: 60upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		position: absolute;
		left: 546upx;
		top: 25upx;
	}
	
	.content .right .btn{
		width: 160upx;
		height: 40upx;
		background: rgba(239,28,0,1);
		border-radius: 20upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255,254,254,1);
		position: absolute;
		left: 494upx;
		top: 99upx;
		line-height: 40upx;
	}
	
	/* 第三部分 */
	.list{
		width: 710upx;
		height: 870upx;
		background: rgba(255,255,255,1);
		border-radius: 5upx;
		margin: 20upx;
		position: absolute;
		top: 600upx;
	}
		
	.list .nav{
		position: absolute;
		top: 61upx;
	}
	
	.list .nav .cu-item{
		height: 90upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		margin: 0 40upx 0 40upx;
	}
	
	.list .product{
		width: 710upx;
		position: absolute;
		top: 150upx;
		left: 20upx;
	}
	
	.list .product .product-item{
		width: 680upx;
		height: 119upx;
		position: relative;
		border-bottom: 1px solid rgba(221,221,221,1);
	}
	
	.list .product .title{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51,51,51,1);
		position: absolute;
		top: 31upx;
	}
	
	.list .product .content{
		font-size: 20upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(153,153,153,1);
		position: absolute;
		top: 72upx;
		left: -1upx;
	}
	
	.list .product .number{
		font-size: 24upx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		position: absolute;
		right: 11upx;
		top: 50upx;
	}
	
	.red{
		color: #F37B1D;
	}
</style>
