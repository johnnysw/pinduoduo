<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.img" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 商品标题简介 -->
		<view class="introduce-section">
			<text class="title">{{commodityList.title}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{commodityList.price}}</text>
			</view>
			<view class="bot-row">
				<text class="xiaoliang">销量: {{commodityList.quantity}}</text>
				<text class="kucun">库存: {{commodityList.inventory}}</text>
				<text>浏览量: {{commodityList.views}}</text>
			</view>
		</view>

		<!-- 购买类型和服务 -->
		<view class="c-list">
			<view class="c-row1 b-b" @click="goumaileixing">
				<text class="c-tit">购买类型</text>
				<view class="con">
					<view class="selected-text">
						<text v-show="isShow">请选择</text>
						<text class="size">{{leixing[0]}}</text>
						<text class="color">{{leixing[1]}}</text>
					</view>
				</view>
				<text class='cuIcon-right'></text>
			</view>
			<view class="c-row2 b-b">
				<text class="c-tit">服务</text>
				<view class="bz-list con">
					<text class="seven">7天无理由退换货</text>
					<text>假一赔十</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<view class="e-left">
					<text class="tit">评价</text>
					<text class="tit">({{num}})</text>
				</view>
				<view class="e-right">
					<text class="tip">好评率 100%</text>
					<text class='cuIcon-right'></text>
				</view>
			</view>
			<view class="eva-box">
				<view class="left">
					<image class="portrait" :src="evaluation.headimage" mode="aspectFill"></image>
				</view>
				<view class="right">
					<text class="name">{{evaluation.name}}</text>
					<text class="con">{{evaluation.content}}</text>
					<view class="bot">
						<text class="attr">购买类型：{{evaluation.size}} {{evaluation.color}}</text>
						<text class="time">{{evaluation.date}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 图文详情 -->
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="pic" v-for="(item,index) in imgList" :key="index">
				<image :src="item.img" mode=""></image>
			</view>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="one">
				<view class="bottom-left">
					<text class="lg text-gray cuIcon-service"></text>
				</view>
				<view class="bottom-left">
					<text class="lg text-gray cuIcon-favor" :class="{active: favorite}" @click="toFavorite"></text>
				</view>
				<view class="bottom-left">
					<text class="lg text-gray cuIcon-cart"></text>
				</view>
			</view>
			<view class="two">
				加入购物车
			</view>
			<view class="three">
				立即购买
			</view>
		</view>

		<goumaileixing ref="goumaileixing" :contentHeight="610" @aa='aa'></goumaileixing>
	</view>
</template>

<script>
	import goumaileixing from '@/components/goumaileixing/goumaileixing.vue';
	export default {
		components: {
			goumaileixing
		},
		data() {
			return {
				isShow: true,
				commodityList: {}, //标题简介
				imgList: [], //大图
				num: [], //评价数量
				dataList: [], //所有数据
				evaluationList: [], //评价数据
				evaluation: {}, //第一条评价
				leixing: {}, //选择的类型
				favorite: false, //收藏
			};
		},
		created() {
			this.getEvadata();
			this.getCommodity();
			this.getImg();
		},
		methods: {
			getEvadata() {
				uni.request({
						url: 'https://easy-mock.com/mock/5cea36ce8347da71af1d4b52/test/evaluation'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						// console.log(res.data);
						this.evaluationList = [...this.evaluationList, ...res.data.data.record];
						this.evaluation = this.evaluationList[0];
						this.num = this.evaluationList.length;
						// console.log(this.evaluationList);
					})
			},
			getCommodity() {
				uni.request({
						url: 'https://easy-mock.com/mock/5cea36ce8347da71af1d4b52/test/commodityDetails'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						// console.log(res.data);
						this.commodityList = { ...this.commodityList,
							...res.data.data.record
						};
						// console.log(this.commodityList);
					})
			},
			getImg() {
				uni.request({
						url: 'https://easy-mock.com/mock/5cea36ce8347da71af1d4b52/test/img'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						// console.log(res.data);
						this.imgList = [...this.imgList,
							...res.data.data.record
						];
						// console.log(this.imgList);
					})
			},
			goumaileixing() {
				this.$refs.goumaileixing.eject();
				// this.isShow=false;
			},
			aa(a) {
				// console.log(a);
				this.leixing = { ...this.leixing,
					...a
				};

				this.isShow = false;
			},
			//收藏
			toFavorite() {
				this.favorite = !this.favorite;
			},
		}
	}
</script>

<style>
	.carousel {
		height: 650upx;
	}

	.carousel>swiper {
		height: 100%;
	}

	.swiper-item {
		height: 650upx;
	}

	.image-wrapper {
		height: 650upx;
	}

	/* 标题简介 */
	.introduce-section {
		/* height: 180upx; */
		background: #fff;
		padding: 0 20upx;
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 28upx;
		font-weight: bold;
		margin: 20upx 0;
	}

	.price-box {
		height: 40upx;
		font-size: 30upx;
		color: #f00;
		font-weight: bold;
		align-items: flex-start;
	}

	.bot-row {
		flex: 40upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 20upx;
		color: #999999;
		align-items: flex-start;
	}

	.xiaoliang {
		margin-right: 100upx;
	}

	.kucun {
		margin-right: 100upx;
	}

	/* 购买类型和服务 */
	.c-list {
		font-size: 22upx;
		margin: 10upx 0;
		background: #fff;
		padding: 0 20upx;
	}

	.c-row1 {
		border-bottom: 1upx solid #ccc;
		display: flex;
	}

	.b-b {
		height: 90upx;
		line-height: 90upx;
	}

	.c-tit {
		color: #999999;
		width: 130upx;
	}

	.con {
		flex: 1;
	}

	.size {
		margin-right: 46upx;
	}

	.c-row2 {
		display: flex;
	}

	.seven {
		margin-right: 46upx;
	}

	/* 评价 */
	.eva-section {
		margin: 10upx 0;
		background: #fff;
	}

	/* 上面 */
	.e-header {
		padding: 0 20upx;
		height: 90upx;
		border-bottom: 1upx solid #ccc;
		line-height: 90upx;
		display: flex;
	}

	.e-left {
		flex: 1;
	}

	.tit {
		font-size: 28upx;
		font-weight: bold;
		color: #454545;
	}

	.tip {
		font-size: 24upx;
		color: #999999;
		text-align: right;
	}

	.cuIcon-right {
		color: #999999;
	}

	/* 下面 */
	.eva-box {
		margin: 0 20upx;
		display: flex;
	}

	.left {
		/* flex:62upx; */
		width: 62upx;
		height: 62upx;
		border-radius: 50%;
		margin: 20upx 20upx auto 0;
	}

	.portrait {
		width: 62upx;
		height: 62upx;
		border-radius: 50%;
	}

	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.name {
		flex: 62upx;
		color: #999999;
		font-size: 28upx;
		margin-top: 20upx;
		line-height: 62upx;
		/* font-weight: bold; */
	}

	.con {
		font-size: 22upx;
		font-weight: bold;
		color: #454545;
	}

	.bot {
		flex: 60upx;
		font-size: 20upx;
		color: #999999;
		line-height: 60upx;
		display: flex;
	}

	.attr {
		flex: 1;
		text-align: left;
	}

	.time {
		text-align: right;
	}

	/* 图文详情 */
	.detail-desc {
		margin-top: 10upx;
		margin-bottom: 100upx;
	}

	.d-header {
		background: #FFFFFF;
		font-size: 28uppx;
		text-align: center;
		height: 70upx;
		line-height: 70upx;
		font-weight: bold;
	}

	.pic {
		width: 100%;
	}

	.pic image {
		width: 100%;
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		bottom: 0;
		height: 100upx;
		width: 750upx;
		background: #FFFFFF;
		display: flex;
	}

	.one {
		flex: 1;
		margin-left: 40upx;
		margin-right: 5upx;
	}

	.two {
		width: 240upx;
		line-height: 100upx;
		color: #FFFFFF;
		font-size: 28upx;
		background: #f57766;
		text-align: center;
	}

	.three {
		width: 240upx;
		line-height: 100upx;
		color: #FFFFFF;
		font-size: 28upx;
		background: #FF0000;
		text-align: center;
	}

	.bottom-left {
		width: 40upx;
		margin-right: 35upx;
		display: inline-block;
	}

	.lg {
		line-height: 100upx;
		font-size: 40upx;
		color: #646464;
	}

	.active {
		color: #f5a566;
	}
</style>
