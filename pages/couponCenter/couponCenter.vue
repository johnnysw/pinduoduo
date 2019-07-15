<template>
	<!-- 领劵中心 -->
	<view>
		<view class="coupon-center" v-for="(item,index) in couponList" :key="index">
			<!-- 优惠劵左部分 开始-->
			<view class="coupon-left">
				<view class="price">
					<text class="price-unit">￥</text><text class="price-num">{{item.price}}</text>
				</view>
				<view class="category">
					<text class="category-title">{{item.categoryTitle}}</text><text>，</text><text class="top-limit">满{{item.categoryTopLimit}}可用</text>
				</view>
				<view class="limit-time">
					<text class="time">{{item.LimitTime}}</text>
				</view>
			</view>
			<!-- 优惠劵左部分 结束-->
			
			<!-- 优惠劵右部分 开始-->
			<view class="coupon-right">
				立即领取
			</view>
			<!-- 优惠劵右部分 结束-->
			
			<!-- 优惠劵圆角 开始-->
			<view class="mask mask-top"></view>
			<view class="mask mask-top-right"></view>
			<view class="mask mask-left"></view>
			<view class="mask mask-bottom-right"></view>
			<view class="mask mask-bottom"></view>
			<view class="mask mask-right"></view>
			<!-- 优惠劵圆角 结束-->
		</view>
	</view>
</template>

<script>
	//模拟数据
	import "../../Mock/mock4"
	import axios from "axios"
	
	export default {
		data() {
			return {
				transitionList:[],    //信息过渡列表
				couponList:[]         //优惠劵列表
			}
		},
		onLoad(e) {
			//获取优惠劵信息
			axios.get("https://www.coupon4.com")
			.then((result)=>{
				for(var i=0;i<result.data.list.length;i++){
						this.transitionList[i] = result.data.list[i]
				}
				this.couponList=this.transitionList
			})
		},
		methods: {
			
			
		}
	}
</script>

<style>
	/* 优惠劵整体样式 开始*/
	.coupon-center{
		width: 710upx;
		height: 180upx;
		margin: 20upx 0 0 20upx;
		font-family: PingFangSC;
		position: relative;
	}
	/* 优惠劵整体样式 结束*/
	
	/* 优惠劵左部样式 开始 */
	.coupon-left{
		width: 510upx;
		height: 180upx;
		background: #FFFFFF;
		float: left;
	}
	.coupon-left .price,.category{
		color: #333333;
		position: absolute;
		
	}
	.coupon-left .price{
		top: 30upx;
		right: 250upx;
	}
	.coupon-left .price-unit{
		font-size: 24upx;
	}
	.coupon-left .price-num{
		font-size: 36upx;
	}
	.coupon-left .category{
		font-size: 22upx;
		top: 72upx;
		right: 249upx;
	}
	.coupon-left .limit-time{
		height: 56upx;
		width: 450upx;
		color:#999999;
		border-top: 1upx solid #DDDDDD;
		line-height: 56upx;
		position: absolute;
		right: 250upx;
		top: 123upx;
	}
	.coupon-left .time{
		position: absolute;
		right: 0;
		font-size: 20upx;
	}
	/* 优惠劵左部样式 结束 */
	
	/* 优惠劵右部样式 开始 */
	.coupon-right{
		width: 200upx;
		height: 180upx;
		background: #ef1c00;
		float: right;
		font-size: 28upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 180upx;
		float: right;
	}
	/* 优惠劵右部样式 结束 */
	
	/* 优惠劵圆角样式 开始 */
	.mask{
		position: absolute;
		width: 20upx;
		height: 20upx;
		background-color:  #f1f1f1;
		border-radius:10upx ;
	}
	.mask-top{
		right:190upx;
		top: -10upx;
	}
	.mask-top-right{
		right: -10upx;
		top: -10upx;
	}
	.mask-left{
		left: -10upx;
		top: 80upx;
	}
	.mask-bottom-right{
		top: 170upx;
		right: -10upx;
	}
	.mask-bottom{
		top: 170upx;
		right: 190upx;
	}
	.mask-right{
		top: 80upx;
		right: -10upx;
	}
	/* 优惠劵圆角样式 结束 */

</style>
