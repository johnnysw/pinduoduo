<template>
	<view class="content">
		<view class='shadow'></view><!-- 上部阴影部分 -->
		<view class='cart'><!-- 购物车部分 -->
            <view class='img-content'>
            <img src="../../static/cate1.jpg" alt="">
            <view class='img-text'>
				<view>￥{{this.price}}</view>
				<text>请选择：颜色分类 尺寸</text>
            </view>
            </view>
		<hr>
		<view class='size'>
			<view class='num'>尺码</view>
				<view 
				:class='{select:sizeObj.isSel,selected:sizeObj.isSelected}' 
				@click='change(sizeObj,index)'
				v-for='(sizeObj,index) in sizeList' 
				:key='index' >{{sizeObj.size}}</view>
		</view>
		<hr>
		<view class='color'>
			<view class='num'>颜色分类</view>
				<view 
				:class='{select:colorObj.isSel,selected:colorObj.isSelected}' 
				@click='change(colorObj,index)'
				v-for='(colorObj,index) in colorList' 
				:key='index'>{{colorObj.color}}</view>
		</view>	
		<hr>
		<view class='bottom'>
			<text class='num'>购买数量</text>
			<view class='btn'>
				<view class='select' @click='reduce()'>-</view>
				<view class='select'>{{this.shuliang}}</view>
				<view class='select' @click='add()'>+</view>
			</view>
		</view>
		</view>
		<view class='footer'>确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:350,
				shuliang:1,
				sizeList:[{
					size:'S',
					isSelected:false,
					isSel:true
				},{
					size:'M',
					isSelected:false,
					isSel:true
				},{
					size:'L',
					isSelected:false,
					isSel:true
				},{
					size:'XL',
					isSelected:false,
					isSel:true
				}],
				colorList:[{
					color:'卡其',
					isSelected:false,
					isSel:true
				},{
					color:'白色',
					isSelected:false,
					isSel:true
				},{
					color:'黑色',
					isSelected:false,
					isSel:true
				},{
					color:'藏蓝',
					isSelected:false,
					isSel:true
				},]
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
			},
			change(sizeObj,index){
				sizeObj.isSelected=!sizeObj.isSelected;
			}
		}
	}
</script>

<style>
	ul,li{
		list-style: none;
		padding: 0 0;
	}
	.content{
		width: 100%;
		height: 100%;
		display:flex;
		position:fixed;
		flex-direction: column;
	}
	.img-content{
		display:flex;
		flex:3;
		margin-bottom: 10px;
	} 
	.img-text{
		flex:1;
		margin-top: 50px;
	}
	.img-text view{
		color:#ef1c00;
		font-size: 20px;
	}
	.shadow{
		width: 100%;
		height: 270px;
		background: rgba(11,6,6,0.8);
	}
	.cart{
		height: 320px;
		flex:1;
		background: #fff;
		padding: 10px 10px 0 10px;
		display: flex;
		flex-direction: column;
	}
	.cart img{
		width: 100px;
		height: 100px;
		margin-right:10px ;
	}
	.select{
		width: 40px;
		height: 20px;
		background: #eee;
		border-radius: 4px;
		text-align:center;
		line-height: 20px;
		color:#000;
		float:left;
		margin-right: 5px;
	}
	.selected{
		color:#ef1c00;
		background:#fbebee;
	}
	.size{
		position: relative;
		width: 100%;
		height: 50px;
		flex:2;
		margin: 10px 0;
	}
	.color{
		flex:2;
		margin: 10px 0;
	}
	.bottom{
		flex:1;
		margin: 10px 0;
	}
	.footer{
		width: 100%;
		height: 110px;
		background: #ef1c00;
		text-align: center;
		color:#fff;
		font-size: 20px;
		line-height: 60px;
	}
	.num{
		color: #000;
		font-size: 15px;
		margin-bottom:10px;
	}
	.btn{
		float:right;
	}
</style>
