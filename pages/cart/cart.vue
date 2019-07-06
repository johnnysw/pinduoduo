<template>
	<view class='shadow'>
	<view class='cart'>
		<view class='header'>
			<img src="../../static/cate1.jpg" alt="">
			<view class='text'>
				<view>￥{{this.price}}</view>
				<text>请选择：颜色分类 尺寸</text>
			</view>
		</view>
		<view class='content'>
			<view class='list' v-for='(obj,index) in bigList' :key='index'>
				<view class='select'>{{obj.name}}</view>
				<view class='kind' v-for='(kindObj,index) in obj.kind' :key='index'>{{kindObj.size}}</view>
			</view>
			<view class='buy'>
				<text class='select'>购买数量</text>
				<view class='btn'>
					<view class='kind' @click='reduce()'>-</view>
					<view class='kind'>{{this.shuliang}}</view>
					<view class='kind' @click='add()'>+</view>
				</view>
			</view>
		</view>
		<view class='footer'>确定</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shuliang:1,
				price:350,
				bigList:[{
					name:'尺码',
					kind:[{
						size:'S'
					},{
						size:'M'
					},{
						size:'L'
					},{
						size:'XL'
					}]
				},{
					name:'颜色分类',
					kind:[{
						size:'卡其'
					},{
						size:'白色'
					},{
						size:'黑色'
					},{
						size:'藏蓝'
					}]
				}]
			}
		},
		onLoad() {

		},
		methods: {
			add(){
				this.shuliang++;
			},
			reduce(){
				this.shuliang--;
			}
		}
	}
</script>

<style>
	.shadow{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.cart{
		width: 100%;
		height: 620upx;
		position: fixed;
		bottom:0;
		background: #fff;
		
	}
	.header{
		width: 100%;
		height: 200upx;
		position:sticky;
	    top:0;
		border:0.5upx solid #ddd;
	}
	.header img{
		width: 160upx;
		height: 160upx;
	}
	.text{
		position: absolute;
		top:100upx;
		left:200upx;
		color:#999;
		font-size:20upx;
	}
	.text view{
		color:#ef1c00;
	}
	.content{
		width: 100%;
		height: 320upx;
		overflow: auto;
	}
	.footer{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		position: sticky;
		bottom:0;
		background: #ef1c00;
		text-align:center;
		color:#fff;
		font-size: 30upx;
	}
	.list{
		height: 120upx;
		width: 100%;
		border-bottom:1px solid #ddd;
	}
	.select{
		color: #000;
		font-size: 10upx;
	}
	.kind{
		width: 70upx;
		height: 38upx;
		background: #eee;
		border-radius: 6upx;
		text-align:center;
		line-height: 38upx;
		color:#000;
		float:left;
		margin-right: 10upx;
		font-size: 2upx;
	}
	.buy{
		height: 80upx;
		border-bottom:1px solid #ddd;
	}
	.btn{
		float:right;
	}
</style>
