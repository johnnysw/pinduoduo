<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
	 @scroll="scroll">
		<checkbox-group @change="checkboxChange">
			<view v-for="(item,index) in productList" :key="index" class="content">
				<checkbox class='round red' :class="item.checked?'checked':''" :checked="item.checked?true:false" :value="item.id"></checkbox>
				<view class="image"><img src="../../static/cate1.jpg" alt=""></view>
				<view class="product">
					<view class="product-title">{{item.title}}</view>
					<view><button class="product-kind">{{item.kind}}
							<text class="lg text-gray cuIcon-unfold"></text>
						</button>
					</view>
					<view class="product-num">
						<text class="price">￥{{item.price}}</text>
						<view class="btn">
							<button @click="reduce(index)" class="mini-btn" type="default" size="mini">-</button>
							<button class="mini-btn" type="default" size="mini">{{item.num}}</button>
							<button @click="add(index)" class="mini-btn" type="default" size="mini">+</button>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		<checkbox-group @change="checkboxAllChange">			
			<view class="fixed-bar">       <!-- 收藏删除操作bar -->             
				<checkbox class='round red' :class="checkAll?'checked':''" :checked="checkAll?true:false" value="all"></checkbox>
				<view class="fixed-btn" v-if="0">
					<view class="remove" @click="remove()">移入收藏夹</view>
					<view class="delete" @click="del()">删除</view>
				</view>
				<view v-else class="fixed-btn">                <!-- 结算操作bar -->                
					<text class="totalNum">共{{totalNum}}件</text>
					<view class="totalPrice">合计:<span>￥{{totalPrice}}</span></view>
					<view class="computed" @click="accout">结算</view>
				</view>
			</view>
		</checkbox-group>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				// totalNum: 0,
				// totalPrice: 0,
				checkAll: false,
				arrayId: [],
				productList: [{
						price: 350,
						kind: "购买类型，卡其色，XL",
						title: "经典百搭版型 棉质外套 2019新款春秋装中长款卡其色女士风衣",
						checked: false,
						id: 'a',
						num: 1
					},
					{
						price: 350,
						kind: "购买类型，卡其色，XL",
						title: "经典百搭版型 棉质外套 2019新款春秋装中长款卡其色女士风衣",
						checked: false,
						id: 'b',
						num: 1
					}
				],

			}
		},
		methods: {
			reduce(index) {
				if (this.productList[index].num > 0)
					this.productList[index].num--;
				else {
					this.productList[index].num = 0;
				}

			},
			add(index) {
				this.productList[index].num++;
			},

			checkboxChange: function(e) {
				var items = this.productList;
				var values = e.detail.value;
				console.log(values);
				this.arrayId = values;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if (values.includes(item.id)) {
						this.$set(item, 'checked', true)	
					} 
					else {
						this.$set(item, 'checked', false);	
					}

				}
				
				console.log(this.totalNum,this.totalPrice);
			},
			checkboxAllChange: function(e) {
				var values = e.detail.value;
				var items = this.productList;
				if (values.includes("all")) {
					this.checkAll = true;
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i]
						this.$set(item, 'checked', true);
					}
				} else {
					this.checkAll = false;
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i]
						this.$set(item, 'checked', false);
					}
				}

				console.log(this.arrayId);
			},
			remove() {
				console.log(Array.from(this.arrayId));
			},
			del() {
				console.log(Array.from(this.arrayId));
			},
			accout(){
				
			}
		},
		computed:{
			totalPrice(){ 
				let sum=0;
                this.productList.filter((elem,index)=>{
                    if(elem.checked){
                        sum+=elem.price*elem.num;
                    }
                })
                return sum;
			},			
			totalNum(){
				let sum=0;
				this.productList.filter((elem,index)=>{
				    if(elem.checked){
				        sum+=elem.num;
				    }
				})
				return sum;
			}
		}
	}
</script>

<style>
	uni-checkbox {
		margin-left: 10px
	}

	.content {
		display: flex;
		height: 240upx;
		background-color: #FFFFFF;
		margin-bottom: 10upx;
	}

	.content>view {
		margin: 20upx;
	}

	.product {
		flex: 2;
	}

	.product-kind {
		height: 36upx;
		padding: 0;
		color: #a4a4a4;
		font-size: 20upx;
		margin-top: 20upx;
		text-align: left;
		padding: 0 12upx;
		line-height: 36upx;
		display: inline-block;
	}

	.product-title {

		height: 60upx;
		color: #333333;
		font-size: 24upx;
		margin-top: 15upx;
		text-overflow: ellipsis;
		overflow: hidden;

	}

	.product-num {
		display: flex;
		justify-content: space-between;
		margin-top: 26upx;
		height: 40upx;
		line-height: 40upx;
	}

	.image {
		width: 192upx;
		height: 205upx;
		margin: 20upx;
	}

	img {
		height: 205upx;
		width: 100%;
	}

	.btn {
		display: flex;
		height: 38upx;
		font-size: 20upx;
	}

	.btn>button {
		flex: 1;
		margin-right: 10upx;
		font-size: 28upx;
		line-height: 40upx;
	}

	uni-checkbox.blue.checked .uni-checkbox-input {
		background-color: #ef1c00 !important;
		border-color: #ef1c00 !important;

	}

	.price {
		color: #ef1c00;
		font-size: 26upx;
	}

	.fixed-bar {
		height: 100upx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
	}

	.fixed-btn {
		line-height: 98upx;
		height: 98upx;
		display: flex;
		justify-content: space-between;

	}

	.fixed-btn>view {
		width: 200upx;
		color: #FFFFFF;
		line-height: 98upx;
		text-align: center;
	}

	.fixed-btn .totalNum {
		color: #545452;
		font-size: 20upx;
	}

	.fixed-btn .totalPrice {
		color: #000000;
		font-size: 24upx;
	}

	span {
		color: #ef1c00;
	}

	.remove {
		background-color: #f57766;
	}

	.delete,
	.computed {
		background-color: #ef1c00;
		font-size: 28upx;
	}

	button {
		background-color: #eeeeee;
	}

	uni-button:after {
		border: none;
	}

	uni-checkbox {
		display: flex;
	}
</style>
