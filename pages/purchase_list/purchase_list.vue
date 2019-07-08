<template>
	<view class="content">
		<view class="goods-list">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.image"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
					<text>已售 {{item.sales}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>
<!-- http://yapi.demo.qunar.com/mock/75419/wujy_test/test -->
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				loadingType: 'more', //加载更多状态
				goodsList: []
			};
		},
		
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			this.cateId = options.tid;
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				let goodsList = await this.$api.json('goodsList');
				if(type === 'refresh'){
					this.goodsList = [];
				}
				this.goodsList = this.goodsList.concat(goodsList);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType  = this.goodsList.length > 20 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: #FFFFFF;
	}
	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		font-size: 26upx;
		color: #333333;
		margin-left: 8upx;
		margin-top: 19upx;
	}
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		background: #fff;
		border-top: 1upx solid #DDDDDD;
		padding: 0 20upx;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 350upx;
			padding-top: 19upx;
			&:nth-child(2n+1){
				margin-right: 10upx;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 350upx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 7upx;
			margin-top: 19upx;
			margin-bottom: -1upx;
			font-size: 20upx;
			color: #999999;
		}
		.price{
			font-size: 24upx;
			color: #EF1C00;
			line-height: 24upx;
			margin-left: 8upx
			&:before{
				content: '￥';
				font-size: 24upx;
			}
		}
	}
</style>
