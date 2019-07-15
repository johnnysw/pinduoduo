<template>
	<view>
		<!-- 顶端选项卡 -->
		<view class="header">
			<scroll-view scroll-x class="bg-white nav tabbar">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur ':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
							<view class="category">{{item.name}}({{item.num}})</view>
					</view>
				</view>
			</scroll-view>
		</view>
			<view class="blank-top"></view>
			
		<!-- 未使用的优惠劵 开始-->
		<block >
			<view class="coupon coupon1" v-for="(item1,index1) in dataUnused" :key="index1 +'-label0'"  :class="TabCur== 0 ? '':'not-active'" :data-id="index1 +'-label0'">
				<!-- 优惠劵左部分样式 开始 -->
				<view class="coupon1-left">
					<view class="title">优<br/>惠<br/>劵</view>
				</view>
				<!-- 优惠劵左部分样式 结束 -->
				
				<!-- 优惠劵右部分样式 开始 -->
				<view class="coupon1-right">
					<view class="price">
						<text class="price-unit">￥</text><text class="price-num">{{item1.price}}</text>
					</view>
					<view class="category">
						<text class="title">{{item1.categoryTitle}}</text><text>，</text><text class="top-limit">满{{item1.categoryTopLimit}}可用</text>
					</view>
					<view class="used">去使用</view>
					<view class="limit-time">
						{{item1.LimitTime}}
					</view>
				</view>
				<!-- 优惠劵右部分样式 结束 -->
				
				<!-- 优惠劵半圆角实现部分 开始 -->
				<view class="mask mask-top"></view>
				<view class="mask mask-top-left"></view>
				<view class="mask mask-left"></view>
				<view class="mask mask-bottom-left"></view>
				<view class="mask mask-bottom"></view>
				<view class="mask mask-right"></view>
				<!-- 优惠劵半圆角实现部分 结束 -->
			</view>
		</block>
		<!-- 未使用的优惠劵 结束-->
		
		<!-- 已使用优惠劵  开始-->
			<view class="coupon coupon2" v-for="(item2,index2) in dataUsed" :key="index2 +'-label1'"  :class="TabCur== 1 ? '':'not-active'">
				<!-- 优惠劵左部分样式 开始 -->
				<view class="coupon2-left">
					<view class="title">优<br/>惠<br/>劵</view>
				</view>
				<!-- 优惠劵左部分样式 结束 -->
				
				<!--优惠劵右部分样式 开始 -->
				<view class="coupon2-right">
					<view class="price">
						<text class="price-unit">￥</text><text class="price-num">{{item2.price}}</text>
					</view>
					<view class="category">
						<text class="title">{{item2.categoryTitle}}</text><text>，</text><text class="top-limit">满{{item2.categoryTopLimit}}可用</text>
					</view>
					<view class="used">已使用</view>
					<view class="limit-time">
						{{item2.LimitTime}}
					</view>
				</view>
				<!-- 优惠劵右部分样式 结束 -->
				
				<!-- 优惠劵半圆角实现部分 开始 -->
				<view class="mask mask-top"></view>
				<view class="mask mask-top-left"></view>
				<view class="mask mask-left"></view>
				<view class="mask mask-bottom-left"></view>
				<view class="mask mask-bottom"></view>
				<view class="mask mask-right"></view>
				<!-- 优惠劵半圆角实现部分 结束 -->
			</view>
		<!-- 已使用优惠劵  结束-->
		
		<!-- 已失效优惠劵 开始-->
			<view class="coupon coupon3" v-for="(item3,index3) in dataDisabled" :key="index3 +'-label2'"  :class="TabCur== 2 ? '':'not-active'">
				<!-- 优惠劵左部分样式 开始 -->
				<view class="coupon3-left">
					<view class="title">优<br/>惠<br/>劵</view>
				</view>
				<!-- 优惠劵左部分样式 结束 -->
				
				<!-- 优惠劵右部分样式 开始 -->
				<view class="coupon3-right">
					<view class="price">
						<text class="price-unit">￥</text><text class="price-num">{{item3.price}}</text>
					</view>
					<view class="category">
						<text class="title">{{item3.categoryTitle}}</text><text>，</text><text class="top-limit">满{{item3.categoryTopLimit}}可用</text>
					</view>
					<view class="used">已失效</view>
					<view class="limit-time">
						{{item3.LimitTime}}
					</view>
				</view>
				<!-- 优惠劵右部分样式 结束 -->
				
				<!-- 优惠劵半圆角实现部分 开始 -->
				<view class="mask mask-top"></view>
				<view class="mask mask-top-left"></view>
				<view class="mask mask-left"></view>
				<view class="mask mask-bottom-left"></view>
				<view class="mask mask-bottom"></view>
				<view class="mask mask-right"></view>
				<!-- 优惠劵半圆角实现部分 结束 -->
			</view>
		<!-- 已失效优惠劵  结束-->
		
		<!-- 底部领取优惠劵入口  开始-->
		<view class="footer">
			<navigator url="../couponCenter/couponCenter">
				<view class="btn">
					领取更多优惠劵
				</view>
			</navigator>
			
		</view>
		<view class="blank-bottom"></view>
		<!-- 底部领取优惠劵入口  结束-->
		
	</view>
</template>

<script>
	//模拟数据mock
	import "../../Mock/mock1"
	import "../../Mock/mock2"
	import "../../Mock/mock3"
	import axios from "axios"
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				num:[],                         //优惠劵数量
				list:[{                         //顶部tab菜单
						id:0,
						name:"未使用",
						num:0
					  },
					  {
						  id:1,
						  name:"已使用",
						  num:0
					  },
					  {
						  id:2,
						  name:"已失效",
						  num:0
					  }],
				dataUnused:[],                  //未使用优惠劵列表
				dataUsed:[],                    //已使用优惠劵列表
				dataDisabled:[]                 //已失效优惠劵列表
			}
		},
		onLoad(e) {
			
			//获取未使用优惠劵信息
			axios.get("https://www.coupon1.com")
			.then((result)=>{
					this.dataUnused = result.data.list
				//获取已使用优惠卷数量
				this.list[0].num = this.dataUnused.length
			})
			
			//获取优惠劵信息
			axios.get("https://www.coupon2.com")
			.then((result)=>{
					this.dataUsed=result.data.list
				//获取优惠卷数量
				this.list[1].num = this.dataUsed.length
			})
			
			//获取已失效优惠劵信息
			axios.get("https://www.coupon3.com")
			.then((result)=>{
					this.dataDisabled=result.data.list
				//获取优惠卷数量
				this.list[2].num= this.dataDisabled.length
				
			})
			
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			}
		}
	}
</script>

<style>
	/* 顶部tab菜单样式 开始 */
	.header .tabbar{
		width: 100vw;
		height: 90upx;
		background: #FFFFFF;
		position: fixed;
		top: 90upx;
		z-index: 999;
	}
	.blank-top{
		width: 100vw;
		height: 90upx;
	}
	
	.header .category{
		font-size: 24upx;
		font-family: PingFangSC;
	}
	/* 顶部tab菜单样式 结束 */
	
	.not-active{
		display: none;
	} 
	
	/* 优惠劵整体部分样式 开始*/
	.coupon{
		width: 710upx;
		height: 180upx;
		background-color: #FFFFFF;
		margin-left: 20upx;
		margin-top:20upx ;
		position: relative;
		font-family: PingFangSC;
	}
	/* 优惠劵整体部分样式 结束*/
	
	/* 未使用的优惠劵左部分样式 开始 */
	.coupon1-left{
		width: 80upx;
		height: 180upx;
		background-color: #ef1c00;
		color:white;
		float: left;
		font-size: 24upx;
		margin: 0 auto;
		text-align: center;
	}
	.coupon1-left .title{
		transform: translateY(49upx);
		font-size: 24upx;
	}
	/* 未使用的优惠劵左部分样式 结束 */
	
	
	
	/* 未使用的优惠劵右部分整体样式 开始 */
	.coupon1-right{
		width: 630upx;
		height: 180upx;
		left: 0;
		float: left;
		color: #999999;
	}
	/* 未使用的优惠劵右部分整体样式 结束 */
	
	/* 未使用的优惠劵价格部分样式 开始 */
	.coupon1-right .price{
		position: absolute;
		color: #333333;
		left: 99upx;
		top: 30upx;
	}
	.coupon1-right .price-unit{
		font-size: 24upx;
	}
	.coupon1-right .price-num{
		font-size: 36upx;
	}
	/* 未使用的优惠劵价格部分样式 结束 */
	
	/* 未使用的优惠劵种类部分样式 开始 */
	.coupon1-right .category{
		color: #333333;
		font-size: 22upx;
		position: absolute;
		left: 99upx;
		top: 78upx;
	}
	/* 未使用的优惠劵种类部分样式 结束 */
	
	/* 未使用的优惠劵按钮样式 开始 */
	.coupon1-right .used{
		position: absolute;
		right: 20upx;
		top: 63upx;
		bottom: 77upx;
		color: #FFFFFF;
		text-align: center;
		line-height:40upx ;
		background: #ef1c00;
		width: 110upx;
		height: 40upx;
		font-size: 20upx;
	}
	/* 未使用的优惠劵按钮样式 开始 */
	
	/* 未使用的优惠劵使用时间 开始 */
	.coupon1-right .limit-time{
		width: 600upx;
		border-top: 1px solid #DDDDDD;
		color: #999999;
		font-size: 20upx;
		height: 56upx;
		line-height:56upx ;
		position: absolute;
		bottom: 0;
		margin: 0 0 0 20upx;
	}
	/* 未使用的优惠劵使用时间 开始 */
	
	/* 优惠劵半圆角样式 开始 */
	.mask{
		position: absolute;
		width: 20upx;
		height: 20upx;
		background-color:  #f1f1f1;
		border-radius:10upx ;
	}
	.mask-top{
		top: -10upx;
		left: 70upx;
	}
	.mask-top-left{
		top: -10upx;
		left: -10upx;
	}
	.mask-left{
		top: 80upx;
		left: -10upx;
	}
	.mask-bottom-left{
		top: 170upx;
		left: -10upx;
	}
	.mask-bottom{
		top: 170upx;
		left: 70upx;
	}
	.mask-right{
		top: 80upx;
		left: 700upx;
	}	
	/* 优惠劵半圆角样式 结束*/
	
	
	/* 已使用优惠劵左部分样式 开始 */
	.coupon2-left{
		width: 80upx;
		height: 180upx;
		background-color: #999999;
		color:white;
		float: left;
		font-size: 24upx;
		margin: 0 auto;
		text-align: center;
	}
	.coupon2-left .title{
		transform: translateY(49upx);
		font-size: 24upx;
	}
	/* 已使用优惠劵左部分样式 结束 */
	
	
	
	/* 已使用优惠劵右部分整体样式 开始 */
	.coupon2-right{
		width: 630upx;
		height: 180upx;
		left: 0;
		float: left;
		color: #999999;
	}
	/* 已使用优惠劵右部分整体样式 结束 */
	
	/* 已使用优惠劵价格部分样式 开始 */
	.coupon2-right .price{
		position: absolute;
		color: #999999;
		left: 99upx;
		top: 30upx;
	}
	.coupon2-right .price-unit{
		font-size: 24upx;
	}
	.coupon2-right .price-num{
		font-size: 36upx;
	}
	/* 已使用优惠劵价格部分样式 结束 */
	
	/* 已使用优惠劵种类部分样式 开始 */
	.coupon2-right .category{
		color: #999999;
		font-size: 22upx;
		position: absolute;
		left: 99upx;
		top: 78upx;
	}
	/* 已使用优惠劵种类部分样式 结束 */
	
	/* 已使用优惠劵按钮样式 开始 */
	.coupon2-right .used{
		position: absolute;
		right: 20upx;
		top: 63upx;
		bottom: 77upx;
		color: #FFFFFF;
		text-align: center;
		line-height:40upx ;
		background: #999999;
		width: 110upx;
		height: 40upx;
		font-size: 20upx;
	}
	/* 已使用优惠劵按钮样式 结束 */
	
	/* 已使用优惠劵使用时间 开始 */
	.coupon2-right .limit-time{
		width: 600upx;
		border-top: 1px solid #DDDDDD;
		color: #999999;
		font-size: 20upx;
		height: 56upx;
		line-height:56upx ;
		position: absolute;
		bottom: 0;
		margin: 0 0 0 20upx;
	}
	/* 已使用优惠劵使用时间 结束 */
	
	
	/* 优惠劵左部分样式 开始 */
	.coupon3-left{
		width: 80upx;
		height: 180upx;
		background-color: #DDDDDD;
		color:white;
		float: left;
		font-size: 24upx;
		margin: 0 auto;
		text-align: center;
	}
	.coupon3-left .title{
		transform: translateY(49upx);
		font-size: 24upx;
	}
	/* 优惠劵左部分样式 结束 */
	
	
	
	/* 优惠劵右部分整体样式 开始 */
	.coupon3-right{
		width: 630upx;
		height: 180upx;
		left: 0;
		float: left;
		color: #999999;
	}
	/* 优惠劵右部分整体样式 结束 */
	
	/* 优惠劵价格部分样式 开始 */
	.coupon3-right .price{
		position: absolute;
		color: #999999;
		left: 99upx;
		top: 30upx;
	}
	.coupon3-right .price-unit{
		font-size: 24upx;
	}
	.coupon3-right .price-num{
		font-size: 36upx;
	}
	/* 优惠劵价格部分样式 结束 */
	
	/* 优惠劵种类部分样式 开始 */
	.coupon3-right .category{
		color: #999999;
		font-size: 22upx;
		position: absolute;
		left: 99upx;
		top: 78upx;
	}
	/* 优惠劵种类部分样式 结束 */
	
	/* 优惠劵按钮样式 开始 */
	.coupon3-right .used{
		position: absolute;
		right: 20upx;
		top: 63upx;
		bottom: 77upx;
		color: #FFFFFF;
		text-align: center;
		line-height:40upx ;
		background: #dddddd;
		width: 110upx;
		height: 40upx;
		font-size: 20upx;
	}
	/* 优惠劵按钮样式 开始 */
	
	/* 优惠劵使用时间 开始 */
	.coupon3-right .limit-time{
		width: 600upx;
		border-top: 1px solid #DDDDDD;
		color: #999999;
		font-size: 20upx;
		height: 56upx;
		line-height:56upx ;
		position: absolute;
		bottom: 0;
		margin: 0 0 0 20upx;
	}
	/* 优惠劵使用时间 结束 */
	
	
	/* 底部领取优惠劵入口样式 开始 */
.footer{
		width: 100vw;
		height: 130upx;
		background-color: #FFFFFF;
		position:fixed;
		bottom: 0;
	}
	 .blank-bottom{
		width: 100vw;
		height: 130upx;
	}
	.footer .btn{
		width: 710upx;
		height: 90upx;
		font-size: 28UPX;
		background-color: #ef1c00;
		color: #fffefe;
		text-align: center;
		line-height: 90upx;
		margin: 20upx 0 0 20upx;
	}
		/* 底部领取优惠劵入口样式 结束 */
</style>
