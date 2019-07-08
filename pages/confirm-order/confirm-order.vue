<template>
	<view class="content">
		<!-- 添加地址begin -->
		<!-- 当前未选择地址begin -->
		<view class="addAdd" v-if="addTag=='0'" @click="addaddress">
			<image src="../../static/img/confirm-order/add.jpg" class="addAddImage"></image>
			<view class="addAddWords">手动添加地址</view>
			<image src="../../static/img/confirm-order/right.jpg" class="addAddImage2"></image>
		</view>
		<!-- 当前未选择地址end -->
		<!-- 当前已选择地址begin -->
		<view class="addAddDetail" v-if="addTag=='1'"  @click="addaddress">
			<image src="../../static/img/confirm-order/right.jpg" mode=""></image>
			<ul class="addAddWrapper">
				<li class="addAddName">{{addaddressCheck.name}}</li>
				<li class="addAddCalled">{{addaddressCheck.called}}</li>
				<li class="addAddAdd">{{addaddressCheck.add}}</li>
			</ul>
		</ul>
		</view>
		<!-- 当前已选择地址begin -->
		<!-- 添加地址end -->
		
		<!-- 下单商品详情begin -->
		<view class="orderDetails">
			<image :src="goods.image" class="orderDetailsImage"></image>
			<view class="orderDetailsWords">
				{{goods.detail}}
			</view>
			<view class="orderDetailsType">
				<text>购买类型：{{goods.type}}</text>
			</view>
			<view class="orderDetailsPrice">
				¥ {{goods.price}}
			</view>
			<view class="orderDetailsWrapper">
				<view class="orderDetailsNumber">
					购买数量
					<view class="orderDetailsNumberWrapper">
						<view class="orderDetailsNumberDec" @click="decnumber">
							-
						</view>
						<view class="orderDetailsNumberValue">
							{{goodsNumber}}
						</view>
						<view class="orderDetailsNumberAdd" @click="addnumber">
							+
						</view>
					</view>
				</view>
				<view class="orderDetailsOff">
					使用优惠
					<view class="">
						<image src="../../static/img/confirm-order/right.jpg" mode=""></image>
					</view>
				</view>
				<view class="orderDetailsOther">
					订单备注
				</view>
			</view>
		</view>
		<!-- 下单商品详情end -->
		
		<!-- 方式选择begin -->
		<view class="paymentMethod">
			<view class="paymentMethodFirst">
				<view class="paymentMethodFirstWords">
					货到付款
				</view>
			</view>
			<view class="paymentMethodSecond">
				<view class="paymentMethodSecondWords">
					orange
				</view>
			</view>
			<radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
                    <view>
                        <radio :value="item.value" :checked="index === current" color="#05D527"/>
                    </view>
                </label>
            </radio-group>
		</view>
		<!-- 方式选择end -->
		
		<!-- bottom begin -->
		<view class="bottomWrapper">
			<view class="bottomWrapperNumber">
				<text>共{{goodsNumber}}件</text>
			</view>
			<view class="bottomWrapperPrice">
				合计：<text>¥{{this.numberPrice}}</text>
				<text></text>
			</view>
			<view class="bottomWrapperButton">
				提交订单
			</view>
		</view>
		<!-- bottom end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addTag:'0',//有无选择地址标示
				goodsNumber:1,//初始商品个数
				numberPrice:350,//商品单价
				addId:'',//选择地址id
				goods:{image:'../../static/img/confirm-order/1.jpg',detail:'经典百搭版型  棉质外套  2019新款春秋装中长款卡其色女士风衣',type:'xl 卡其',price:'350'},
				addItem:[{name:'Felix',called:'13113331222',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学电气与信息学院（原工程学院）'},
				{name:'Felix',called:'13113331333',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学教学楼'},
				{name:'Felix',called:'13113331555',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学主楼'},
				{name:'Felix',called:'13113331666',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学成栋楼'}],//备选地址
				addaddressCheck:[],//选择地址对象
				items: [{
                    value: '货到付款',
                    name: ''
                },
                {
                    value: 'orange',
                    name: '',
                    checked: 'true'
                },],
				current: 0
			}
		},
		//初始判断地址有无选择
		onLoad(option) {
			this.addId=option.id
			console.log(this.addId)
			this.addaddressCheck=this.addItem[option.id]
			console.log(this.addaddressCheck)
			if(!this.addId){
				console.log('none')
			}else{
				this.addTag='1';
			}
		},
		methods: {
			//选择地址跳转
			addaddress:function(){
				uni.navigateTo({
					url: '../confirm-order/confirm-order-after'
				});
			},
			//付款方式选择
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				console.log(evt.detail.value)
			},
			//添加商品个数
			addnumber:function(){
				this.goodsNumber+=1;
				this.numberPrice=this.goods.price*this.goodsNumber
			},
			//减少商品个数
			decnumber:function(){
				if(this.goodsNumber>1){
					this.goodsNumber-=1;
					this.numberPrice=this.goods.price*this.goodsNumber
				}
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
		font-family: PingFangSC-Regular;
	}
	.content {
		overflow: hidden;
	}
	.addAdd{
		width: 710upx;
		height: 90upx;
		background: white;
		margin: 0 auto;
		margin-top: 20upx;
		position: relative;
	}
	.addAddWords{
		font-size: 24upx;
		color: #333;
		line-height: 90upx;
		position: relative;
		left: 70upx;
	}
	.addAddImage{
		width: 30upx;
		height: 30upx;
		float: left;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		margin-left: 20upx;
	}
	.addAddImage2{
		width: 14upx;
		height: 24upx;
		float: left;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		margin-left: 676upx;
	}
	.addAddDetail{
		width: 710upx;
		// height: 120upx;
		background-color: white;
		position: relative;
		margin: 20upx auto;
		// overflow: hidden;
	}
	.addAddWrapper{
		background-color: white;
		width: 710upx;
		font-size: 28upx;
		color: #333;
		margin: 0 auto;
		position: relative;
		margin-top:20upx ;
		overflow: hidden;
	}
	.addAddDetail image{
		width: 14upx;
		height: 24upx;
		position: absolute;
		top: 50%;
		right: 20upx;
		transform: translate(0,-50%);
		z-index: 2;
	}
	.addAddName{
		position: relative;
		float: left;
		margin-top: 24upx;
		margin-left: 20upx;
	}
	.addAddCalled{
		position: relative;
		/* float: none; */
		margin-top: 24upx; 
		left: 20upx;
	}
	.addAddAdd{
		clear: both;
		font-size: 24upx;
		margin-top: 20upx;
		margin-left: 20upx;
		color: #666;
		width: 630upx;
		margin-bottom:20upx ;
	}
	
	
	
	.orderDetails{
		width: 710upx;
		height: 470upx;
		background: white;
		margin: 0 auto;
		margin-top: 20upx;
		position: relative;
	}
	.orderDetailsImage{
		width: 160upx;
		height: 160upx;
		position: absolute;
		left: 20upx;
		top: 20upx;
	}
	.orderDetailsWords{
		corlor:#333;
		font-size: 24upx;
		width: 491upx;
		position: absolute;
		left: 199upx;
		top: 29upx;
		line-height: 26.5upx;
		
	}
	.orderDetailsType{
		// width: 180upx;
		height: 40upx;
		background: #eee;
		position: absolute;
		left: 200upx;
		top: 96upx;
		font-size: 25upx;
		color: #999;
	}
	.orderDetailsType text{
		display: block;
		transform: scale(0.8);
	}
	.orderDetailsPrice{
		position: absolute;
		left: 199upx;
		top: 149upx;
		font-size: 26upx;
		color: #EF1C00;
	}
	.orderDetailsWrapper{
		width: 670upx;
		height: 270upx;
		position: absolute;
		top: 200upx;
		left: 50%;
		transform: translate(-50%,0);
	}
	.orderDetailsNumber,.orderDetailsOff,.orderDetailsOther{
		width: 100%;
		height: 90upx;
		border-top: 1px solid #ddd;
		font-size: 24upx;
		color: #333;
		line-height: 90upx;
		position: relative;
	}
	.orderDetailsNumberWrapper{
		width: 180upx;
		height: 38upx;
		position: absolute;
		top: 25upx;
		right: 0upx;
	}
	.orderDetailsNumberWrapper view{
		position: absolute;
		top: 0;
		line-height: 38upx;
		font-size: 20upx;
		text-align: center;
		color: #999;
	}
	.orderDetailsNumberDec{
		width: 50upx;
		background-color: #eee;
		border-radius: 5upx;
	}
	.orderDetailsNumberValue{
		width: 60upx;
		background-color: #eee;
		border-radius: 5upx;
		margin-left: 60upx;
	}
	.orderDetailsNumberAdd{
		width: 50upx;
		background-color: #eee;
		border-radius: 5upx;
		margin-left: 130upx;
	}
	.orderDetailsOff image{
		width: 14upx;
		height: 24upx;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0,-50%);
	}
	.paymentMethod{
		width: 710upx;
		height: 180upx;
		background: white;
		margin: 0 auto;
		margin-top: 20upx;
		position: relative;
	}
	.paymentMethodFirst,.paymentMethodSecond{
		height: 90upx;
		width: 670upx;
		color: #333;
		font-size: 24upx;
		line-height: 90upx;
		position: relative;
		margin: 0 auto;
	}
	.paymentMethodFirst{
		border-bottom: 1px solid #ddd;
	}
	.paymentMethod label{
		position: absolute;
		transform: translate(0,-50%);
		right: 20upx;
	}
	.paymentMethod label:nth-child(1){
		top: 45upx;
	}
	.paymentMethod label:nth-child(2){
		top: 135upx;
	}
	.bottomWrapper{
		width: 100%;
		height: 99upx;
		background-color: white;
		position: fixed;
		bottom: 0;
	}
	.bottomWrapperNumber{
		color: #999;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		left: 283upx;
		font-size: 25upx;
	}
	.bottomWrapperNumber text{
		display: block;
		transform: scale(0.8);
	}
	.bottomWrapperPrice{
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		left: 370upx;
		font-size: 24upx;
	}
	.bottomWrapperPrice text{
		color: #EF1C00;
	}
	.bottomWrapperButton{
		width: 200upx;
		height: 98upx;
		background: #EF1C00;
		line-height: 98upx;
		text-align: center;
		font-size: 28upx;
		color: white;
		position: absolute;
		right: 0;
	}
</style>
