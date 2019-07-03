<template>
	<view class="content">
		<view class='shadow'></view><!-- 上部阴影部分 -->
		<view class='cart'>
			<view class='image'>
				<img src="../../static/cate1.jpg" alt="">
				<span>￥350</span><br>
				<span>请选择： 颜色分类  尺寸</span>
			</view>
		<view class='size'>
			<span>尺码</span>
			<button class="cu-btn">S</button>
			<button class="cu-btn">M</button>
			<button class="cu-btn">L</button>
			<button class="cu-btn">XL</button>
		</view>
		<view class='color'>
			<span>颜色分类</span>
			<button class="cu-btn">卡其</button>
			<button class="cu-btn">白色</button>
			<button class="cu-btn">黑色</button>
			<button class="cu-btn">藏蓝</button>
		</view>	
		<view class='bottom'>
			<span>购买数量</span>
			<button class="cu-btn">-</button>
			<button class="cu-btn">数量</button>
			<button class="cu-btn">+</button>
			<span class='pay'>确认</span>
		</view>
		</view><!-- 购物车部分 -->
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
	.content{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.shadow{
		width: 100%;
		height: 366px;
		background: rgba(11,6,6,0.8);
	}
	
</style>
