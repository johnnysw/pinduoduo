<template>
	<view class="content">
		<!-- 地址列表begin -->
		<ul v-for='(item,index) in address' :key='index' class="address-wrapper" @click='checkadd(item,index)'>
			<li class="address-name">{{item.name}}</li>
			<li class="address-called">{{item.called}}</li>
			<li class="address-add">{{item.add}}</li>
		</ul>
		<!-- 地址列表end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:[{name:'Felix',called:'13113331222',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学电气与信息学院（原工程学院）'},
				{name:'Felix',called:'13113331333',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学教学楼'},
				{name:'Felix',called:'13113331555',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学主楼'},
				{name:'Felix',called:'13113331666',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学成栋楼'}]//备选地址列表
			}
		},
		onLoad() {
			
		},
		methods: {
			checkadd(item,index){
				console.log(index)
				uni.navigateTo({
					url: '../confirm-order/confirm-order?id='+index
				});
			}
		}
	}
</script>

<style>
	*{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	page{
		background-color: #eee;
	}
	.address-wrapper{
		background-color: white;
		width: 710upx;
		font-size: 28upx;
		color: #333;
		margin: 0 auto;
		position: relative;
		margin-top:20upx ;
		overflow: hidden;
	}
	.address-name{
		position: relative;
		float: left;
		margin-top: 24upx;
		margin-left: 20upx;
	}
	.address-called{
		position: relative;
		/* float: none; */
		margin-top: 24upx; 
		left: 20upx;
	}
	.address-add{
		clear: both;
		font-size: 24upx;
		margin-top: 20upx;
		margin-left: 20upx;
		color: #666;
		width: 630upx;
		margin-bottom:20upx ;
	}
</style>
