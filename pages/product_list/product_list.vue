<template>
	<view class="page">
				
		<view class="menu">
			<view class="item" v-bind:class="{activeClass: (activeIndex == 1)}" @click="changeType(1)">
				<text>综合排序</text>
			</view>
			<view class="item" v-bind:class="{activeClass: (activeIndex == 2)}" @click="changeType(2)">
				<text>销量优先</text>
			</view>
			<view class="item" v-bind:class="{activeClass: (activeIndex == 3)}" @click="changeType(3)">
				<text>价格优先</text>
			</view>
			
		</view>
		
		<view class="list">
			<view v-for="(product,index) in productList" :key="index" @click="toProduct(item.id)" :data-index="index">
			   <view class='product'>
				   <image lazy-load :key="index" :src="product.image"></image>
				        <text class="title">{{product.title}}</text>
				<view><text class='price'>￥{{product.price}}</text><text class="count">已售{{product.count}}</text> </view>
			   </view> 
					  
	         </view>

		</view>
		

		 <text class="loading-text">
			{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
		 </text>
						
		
	</view>
	

</template>

<script>
	
	import {uniLoadMore} from './../../static/uni-load-more'
	var  _self;
	var  page = 1;
	export default {
		data() {
			return {					
				url:"https://easy-mock.com/mock/5d1f86d12afbd07594948213/product/integrated",
				productList: [],
				activeIndex: 1,  //排序模式
				loadingType: 0,  //上拉下滑状态
				contentText: {   //上拉下滑操作所用文本
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
				
			}
		},
		components: {
			uniLoadMore
		},
		methods: {
			getProductList: function() {//第一次回去数据
				_self.loadingType = 0;
				uni.showNavigationBarLoading();
				uni.request({
					url:`${this.url}?page=${page}`,
					method:"GET",
					success: function(res) {
						// console.log(res.data);
						let productList =[];
						let pages_count=res.data.productList.length;
						for(var i=0;i<6;i++){
							productList.push(res.data.productList[i]);
						}
						_self.productList = productList;
						if(pages_count==res.data.productList.length){
							uni.showToast({
								title: '已是最新',
								duration: 2000
							});
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				});				
			},
			changeType(index){  //排序方式切换
				//取消默认高亮
				this.activeIndex = index; 
				
			    switch(index){
				case 1:{	
				    uni.stopPullDownRefresh();  //停止拉取
					this.url="https://easy-mock.com/mock/5d1f86d12afbd07594948213/product/integrated";
					this.productList=[];     //清空列表
					page=1,
					this.getProductList();    //重新拉去
					break;
				}
					
				case 2:{
					uni.stopPullDownRefresh();
					this.url="https://easy-mock.com/mock/5d1f86d12afbd07594948213/product/sVolume";				
					this.productList=[];
					page=1,
					this.getProductList();
					break;
				}
				
				case 3:{
					uni.stopPullDownRefresh();
					this.url="https://easy-mock.com/mock/5d1f86d12afbd07594948213/product/price";					
					this.productList=[];
					page=1,
					this.getProductList();
					break;
				}
			}				
			},
			toProduct(id){

				uni.navigateTo({
					// url: `/pages/product/product?id=${id}`
				})
			},
					
	},
	onLoad(options){
		_self = this;
		this.getProductList();
	},	
	onPullDownRefresh() { //下滑
			this.getProductList();
		},
	onReachBottom: function() {  //上拉
			// console.log(_self.productList.length);
			if (_self.loadingType != 0) {//loadingType!=0;直接返回
				return false;
			}
			_self.loadingType = 1;
			uni.showNavigationBarLoading();//显示加载动画
			uni.request({
				url:`${this.url}?page=${page}`,
				success: function(res) {
					let pages_count=res.data.productList.length;
					
					if (_self.productList.length==pages_count) {//没有数据
						_self.loadingType = 2;
						uni.hideNavigationBarLoading();//关闭加载动画
						return false;
					}
					page++;//每触底一次 page +1
					// console.log(page);
					for(var i=_self.productList.length;i<page*6;i++){
						if(i<pages_count){
						_self.productList = _self.productList.concat(res.data.productList[i]);}//将数据拼接在一起
						else{
							_self.loadingType = 0;
						}
					}
					_self.loadingType = 0;//将loadingType归0重置
					uni.hideNavigationBarLoading();//关闭加载动画
					
				}
			});
		}
	}
		
</script>

<style>
	.page{
		position: relative;
		height:100%;
	}
	.menu{
		width: 100%;
		border-top: 1upx solid #DDDDDD;
		background:white;
		position:sticky;
		left:0;
		z-index: 100;
		top:0;		
	}
	
	.item{
		overflow: hidden;
		display: inline-block;
		width: 33.3%;
		height: 70upx;
		text-align: center;
		line-height:70upx;
		color: #333333;
		font-size: 32upx;
	}

	.activeClass{
		box-sizing: border-box;
		color: #E22927;
	}
	.list{
		background: white;
		overflow: hidden;
        height: 100%;
		padding: 0 5upx 10upx 10upx;
	
	
	}
		
	.product{	
		    
			width: 47%;
			float: left;
			margin: 10upx;
		}	
	.title{
		display: inline-block; 
		white-space: nowrap;
		width:100%;
		overflow: hidden; 
		text-overflow:ellipsis;
		font-size: 30upx;
	}
	
	
	image{
		width:100%;
		height:375upx;
	}
	.price{
		float:left;
		color:red;
		font-size: 25upx;
	}
	.count{
		float: right;
		color:#999999;
		font-size: 25upx;
	}

	.loading-text{
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	
	
</style>
