<template>
	<view class="content">
		<view class="search-box">
			<navigator url="../index-search/index-search">
				<image src="../../static/index-img/fangdajing.png" mode="" class="fangdajing"></image>
				<input class="search-input" type="text" placeholder="搜索" placeholder-style="color:#999999" />
			</navigator>
			<navigator>
				<image src="../../static/index-img/bell.png" mode="" class="bell"></image>
			</navigator>
		</view>
		<view class="live-box">
			<img src="../../static/index-img/picture1.png" alt="">
			<view class="live-content">
				<view class="live-content-point"></view>
				<img src="../../static/index-img/living.png" alt="">
			</view>
		</view>
		<view class="label-box">
			<view class="label-box-button">
				<view class="button">
					<img src="../../static/index-img/pic1.png" alt="">
					<text>签到领积分</text>
				</view>
				<view class="button">
					<img src="../../static/index-img/pic2.png" alt="">
					<text>个护美妆</text>
				</view>
				<view class="button">
					<img src="../../static/index-img/pic3.png" alt="">
					<text>营养保健</text>
				</view>
				<view class="button">
					<img src="../../static/index-img/pic4.png" alt="">
					<text>家具厨卫</text>
				</view>
				<view class="button">
					<img src="../../static/index-img/pic5.png" alt="">
					<text>速食生鲜</text>
				</view>
			</view>
			<view class="label-box-pic">
				<img src="../../static/index-img/picture2.png" alt="">
			</view>
		</view>
		<view class="group-purchase">
			<view class="group-purchase-title">
				<img src="../../static/index-img/pic6.png" alt="" class="diamond">
				<view class="group-purchase-title-top">团购大全</view>
				<img src="../../static/index-img/group.png" alt="" class="group">
				<img src="../../static/index-img/arrow.png" alt="" class="arrow">
			</view>
			<scroll-view scroll-x="true" class="group-purchase-product">
				<view class="scroll-wrapper">
					<view v-for="(item,index) in list" :key="index" class="group-purchase-product-item">
						<image lazy-load="true" :src="item.image" alt="" class="product-image"></image>
						<view class="product-title">{{item.title}}</view>
						<view class="product-price">￥{{item.price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="guess">
			<img src="../../static/index-img/pic7.png" alt="" class="heart">
			<view class="guess-title">猜你喜欢</view>
			<img src="../../static/index-img/guess.png" alt="" class="guess-pic">
			<img src="../../static/index-img/arrow.png" alt="" class="arrow">
		</view>
		<view class="guess-product-list">
			<view class="guess-product-item" v-for="(item,index) in productlist" :key="index">
				<view class="guess-image-wrapper">
					<image lazy-load="true" :src="item.image" mode="" class="guess-product-image"></image>
				</view>
				<view class="guess-product-title">{{item.title}}</view>
				<view class="guess-price-box">
					<view class="guess-product-price">￥{{item.price}}</view>
					<view class="guess-product-sale">已售{{item.sales}}</view>
				</view>
			</view>
		</view>
		<text class="loading">
			{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
		</text>
	</view>
</template>

<script>
	import {uniLoadMore} from './../../components/uni-load-more/uni-load-more'
	var _self;
	var page=1;
	export default {
		data() {
			return {
				url: 'http://yapi.demo.qunar.com/mock/75419/wujy_test/test',
				list: [],
				productlist:[],
				loadingType: 0,  //loadmore状态
				contentText: {   //loadmore所用文本
					contentdown: "",
					contentrefresh: "正在寻找你可能喜欢的宝贝...",
					contentnomore: "抱歉，暂时找不到你可能喜欢的宝贝了"
				}
			}
		},
		components: {
			uniLoadMore
		},
		methods: {
			getPurchaseList:function(){
				uni.request({
					url: this.url,
					method: 'GET',
					data: {},
					success: res => {
						this.list=res.data.list;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getProductList:function(){
				_self.loadingType = 0;
				uni.showNavigationBarLoading();
				uni.request({
					url:`${this.url}?page=${page}`,
					method: 'GET',
					data: {},
					success: res => {
						let productList =[];
						let pages_count=res.data.list.length;
						for(var i=0;i<6;i++){
							productList.push(res.data.list[i]);
						}
						_self.productList = productList;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad() {
			_self=this;
			this.getPurchaseList();
			this.getProductList();
		},
		onReachBottom: function() {  //页面上拉触底事件的处理函数
				if (_self.loadingType != 0) {  //loadingType!=0  无数据则直接返回
					return false;
				}
				_self.loadingType = 1;
				uni.showNavigationBarLoading();  //显示加载动画
				uni.request({
					url:`${this.url}?page=${page}`,
					success: function(res) {
						let pages_count=res.data.list.length;
						if (_self.productlist.length==pages_count){
							_self.loadingType = 2;
							uni.hideNavigationBarLoading();  //关闭加载动画
							return false;
						}
						page++;  //每触底一次 page+1
						for(var i=_self.productlist.length;i<page*6;i++){
							if(i<pages_count){
							_self.productlist = _self.productlist.concat(res.data.list[i]);}  //将加载数据拼接在一起
							else{
								_self.loadingType = 0;
							}
						}
						_self.loadingType = 0;  //将loadingType重置归0
						uni.hideNavigationBarLoading(); 
						
					}
				});
			}
	}
</script>

<style>
	.content {
		text-align: center;
	}

	.search-box {
		width: 750upx;
		height: 129upx;
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 99;
	}

	.fangdajing {
		width: 30upx;
		height: 30upx;
		position: absolute;
		left: 40upx;
		top: 72upx;
		z-index: 10;
	}

	.search-input {
		width: 660upx;
		height: 50upx;
		background-color: #EEEEEE;
		border-radius: 25upx;
		position: absolute;
		left: 20upx;
		top: 59upx;
		placeholder: "搜索";
		text-align: left;
		padding-left: 61upx;
		padding-top: 10upx;
		font-size: 28upx;
	}

	.bell {
		width: 28upx;
		height: 30upx;
		position: absolute;
		right: 20upx;
		top: 72upx;
	}

	.live-box {
		width: 750upx;
		height: 390upx;
		margin-top: 129upx;
		position: relative;
	}

	.live-box img {
		width: 750upx;
		height: 390upx;
	}

	.live-content {
		width: 100upx;
		height: 40upx;
		background: #E30025;
		border-radius: 5upx;
		position: absolute;
		left: 30upx;
		top: 30upx;
	}

	.live-content-point {
		width: 6upx;
		height: 6upx;
		background: #FFFFFF;
		border-radius: 50%;
		position: absolute;
		left: 13upx;
		top: 17upx;
	}

	.live-content img {
		width: 58upx;
		height: 20upx;
		position: absolute;
		left: 29upx;
		top: 12upx;

	}

	.label-box {
		width: 750upx;
		height: 329upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.label-box-button {
		width: 710upx;
		height: 140upx;
		position: absolute;
		left: 20upx;
		margin-top: 20upx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.label-box-button .button {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20upx;
		width: 0;
	}

	.label-box-button .button img {
		width: 80upx;
		height: 80upx;
	}

	.label-box-button .button text {
		margin-top: 20upx;
	}

	.label-box-pic {
		width: 710upx;
		height: 140upx;
		position: absolute;
		left: 20upx;
		bottom: 20upx;
	}

	.label-box-pic img {
		width: 710upx;
		height: 140upx;
	}

	.group-purchase {
		width: 750upx;
		height: 440upx;
		margin-top: 11upx;
		background-color: #FFFFFF;
	}

	.group-purchase-title {
		width: 750upx;
		height: 100upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.group-purchase-title .diamond {
		width: 50upx;
		height: 50upx;
		position: absolute;
		left: 20upx;
		top: 25upx;
	}

	.group-purchase-title .group {
		width: 178upx;
		height: 18upx;
		position: absolute;
		left: 89upx;
		top: 61upx;
	}
	
	.group-purchase-title .arrow{
		width: 14upx;
		height: 24upx;
		position: absolute;
		right: 26upx;
		top: 38upx;
	}
	
	.group-purchase-title-top {
		font-size: 28upx;
		color: #333333;
		position: absolute;
		left: 90upx;
		top: 19upx;
	}

	.group-purchase-product {
		width: 710upx;
		height: 330upx;
		background-color: #FFFFFF;
		white-space: nowrap;
		margin: 0 20upx;
	}

	.scroll-wrapper {
		display: flex;
		align-items: flex-start;
	}

	.group-purchase-product-item {
		width: 230upx;
		height: 330upx;
		display: flex;
		flex-direction: column; 
		align-items: flex-start;
		margin-right: 10upx;
	}
	.group-purchase-product-item:last-child{
		margin-right: 0;
		
	}
	.product-image {
		width: 230upx;
		height: 230upx;
	}
	.product-title {
		width: 231upx;
		white-space: nowrap;
		overflow: hidden; 
		text-overflow:ellipsis;
		color: #333333;
		font-size: 24upx;
		margin-top: 19upx;
		text-align: left;
	}
	.product-price{
		font-size: 24upx;
		color: #EF1C00;
		margin-top: 19upx;
		/* width: 62upx;
		height: 19upx; */
	}
	.guess{
		width: 750upx;
		height: 100upx;
		background-color: #FFFFFF;
		position: relative;
		margin-top: 10upx;
	}
	.guess .heart {
		width: 50upx;
		height: 50upx;
		position: absolute;
		left: 20upx;
		top: 25upx;
	}
	
	.guess .guess-pic {
		width: 133upx;
		height: 18upx;
		position: absolute;
		left: 87upx;
		top: 61upx;
	}
	
	.guess .arrow{
		width: 14upx;
		height: 24upx;
		position: absolute;
		right: 26upx;
		top: 38upx;
	}
	
	.guess .guess-title {
		font-size: 28upx;
		color: #333333;
		position: absolute;
		left: 90upx;
		top: 19upx;
	}
	
	.guess-product-list{
		width: 750upx;
		background-color: #FFFFFF;
		display:flex;
		flex-wrap:wrap;
		padding:0 20upx;
	}
	.guess-product-item{
		display:flex;
		flex-direction: column;
		width: 350upx;
		height: 460upx;
	}
	.guess-product-item:nth-child(2n+1){
		margin-right: 10upx;
	}
	.guess-image-wrapper{
		width: 350upx;
		height: 350upx;
	}
	.guess-product-image{
		width: 350upx;
		height: 350upx;
	}
	.guess-product-title{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		font-size: 24upx;
		color: #333333;
		margin-left: 8upx;
		margin-top: 19upx;
		text-align: left;
	}
	.guess-price-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 8upx;
		margin-top: 19upx;
	}
	.guess-product-price{
		font-size: 24upx;
		color: #EF1C00;
		margin-left: -4upx;
	}
	.guess-product-sale{
		font-size: 20upx;
		color: #999999;
		margin-right: 7upx;
	}
	.loading{
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		/* margin-bottom: 15.6%; */
		background-color: #FFFFFF;
		color: #999999;
	}
</style>
