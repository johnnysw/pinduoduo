<template>
	<view class="content">
		<view class='shadow'></view><!-- 上部阴影部分 -->
		<view class='cart'><!-- 购物车部分 -->
			<ul>
            <li class='img-content'>
            <img src="../../static/cate1.jpg" alt="">
            <view class='img-text'>
				<p>￥350</p>
				<span>请选择：颜色分类 尺寸</span>
            </view>
            </li>
        </ul>
		<hr>
		<view class='size'>
			<p class='num'>尺码</p>
			<ul>
				<li class='select'>S</li>
				<li class='select'>M</li>
				<li class='select'>L</li>
				<li class='select'>XL</li>
			</ul>	
		</view>
		<hr>
		<view class='color'>
			<p class='num'>颜色分类</p>
			<ul>
				<li class='select'>卡其</li>
				<li class='select'>白色</li>
				<li class='select'>黑色</li>
				<li class='select'>藏蓝</li>
			</ul>
		</view>	
		<hr>
		<view class='bottom'>
			<span class='num'>购买数量</span>
			<ul class='btn'>
				<li class='select'>-</li>
				<li class='select'>数量</li>
				<li class='select'>+</li>
			</ul>
		</view>
		</view>
		<p class='footer'>确定</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		onLoad() {
			 
		},
		methods: {

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
	.img-text p{
		color:#ef1c00;
		font-size: 20px;
	}
	.shadow{
		width: 100%;
		height: 270px;
		background: rgba(11,6,6,0.8);
	}
	.cart{
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
