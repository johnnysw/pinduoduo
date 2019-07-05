<template>
	<view class="content">
		<!-- 添加地址begin -->
		<!-- 当前未选择地址begin -->
		<view class="add-add" v-if="addtag=='0'" @click="addaddress">
			<image src="../../static/img/confirm-order/add.jpg" class="add-add-image"></image>
			<view class="add-add-words">手动添加地址</view>
			<image src="../../static/img/confirm-order/right.jpg" class="add-add-image2"></image>
		</view>
		<!-- 当前未选择地址end -->
		<!-- 当前已选择地址begin -->
		<view class="add-add-detail" v-if="addtag=='1'"  @click="addaddress">
			<image src="../../static/img/confirm-order/right.jpg" mode=""></image>
			<ul class="add-add-wrapper">
				<li class="add-add-name">{{addaddresscheck.name}}</li>
				<li class="add-add-called">{{addaddresscheck.called}}</li>
				<li class="add-add-add">{{addaddresscheck.add}}</li>
			</ul>
		</ul>
		</view>
		<!-- 当前已选择地址begin -->
		<!-- 添加地址end -->
		
		<!-- 下单商品详情begin -->
		<view class="order-details">
			<image :src="goods.image" class="order-details-image"></image>
			<view class="order-details-words">
				{{goods.detail}}
			</view>
			<view class="order-details-type">
				<text>购买类型：{{goods.type}}</text>
			</view>
			<view class="order-details-price">
				¥ {{goods.price}}
			</view>
			<view class="order-details-wrapper">
				<view class="order-details-number">
					购买数量
					<view class="order-details-number-wrapper">
						<view class="order-details-number-dec" @click="decnumber">
							-
						</view>
						<view class="order-details-number-value">
							{{goodsnumber}}
						</view>
						<view class="order-details-number-add" @click="addnumber">
							+
						</view>
					</view>
				</view>
				<view class="order-details-off">
					使用优惠
					<view class="">
						<image src="../../static/img/confirm-order/right.jpg" mode=""></image>
					</view>
				</view>
				<view class="order-details-other">
					订单备注
				</view>
			</view>
		</view>
		<!-- 下单商品详情end -->
		
		<!-- 方式选择begin -->
		<view class="payment-method">
			<view class="payment-method-first">
				<view class="payment-method-first-words">
					货到付款
				</view>
			</view>
			<view class="payment-method-second">
				<view class="payment-method-second-words">
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
		<view class="bottom-wrapper">
			<view class="bottom-wrapper-number">
				<text>共{{goodsnumber}}件</text>
			</view>
			<view class="bottom-wrapper-price">
				合计：<text>¥{{this.numberprice}}</text>
				<text></text>
			</view>
			<view class="bottom-wrapper-button">
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
				addtag:'0',//有无选择地址标示
				goodsnumber:1,//初始商品个数
				numberprice:350,//商品单价
				addid:'',//选择地址id
				goods:{image:'../../static/img/confirm-order/1.jpg',detail:'经典百搭版型  棉质外套  2019新款春秋装中长款卡其色女士风衣',type:'xl 卡其',price:'350'},
				additem:[{name:'Felix',called:'13113331222',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学电气与信息学院（原工程学院）'},
				{name:'Felix',called:'13113331333',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学教学楼'},
				{name:'Felix',called:'13113331555',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学主楼'},
				{name:'Felix',called:'13113331666',add:'黑龙江省 哈尔滨市 香坊区 铁东街道 长江路600号东北农业大学成栋楼'}],//备选地址
				addaddresscheck:[],//选择地址对象
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
			this.addid=option.id
			console.log(this.addid)
			this.addaddresscheck=this.additem[option.id]
			console.log(this.addaddresscheck)
			if(!this.addid){
				console.log('none')
			}else{
				this.addtag='1';
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
				this.goodsnumber+=1;
				this.numberprice=this.goods.price*this.goodsnumber
			},
			//减少商品个数
			decnumber:function(){
				if(this.goodsnumber>1){
					this.goodsnumber-=1;
					this.numberprice=this.goods.price*this.goodsnumber
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
	.add-add{
		width: 710upx;
		height: 90upx;
		background: white;
		margin: 0 auto;
		margin-top: 20upx;
		position: relative;
	}
	.add-add-words{
		font-size: 24upx;
		color: #333;
		line-height: 90upx;
		position: relative;
		left: 70upx;
	}
	.add-add-image{
		width: 30upx;
		height: 30upx;
		float: left;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		margin-left: 20upx;
	}
	.add-add-image2{
		width: 14upx;
		height: 24upx;
		float: left;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		margin-left: 676upx;
	}
	.add-add-detail{
		width: 710upx;
		// height: 120upx;
		background-color: white;
		position: relative;
		margin: 20upx auto;
		// overflow: hidden;
	}
	.add-add-wrapper{
		background-color: white;
		width: 710upx;
		font-size: 28upx;
		color: #333;
		margin: 0 auto;
		position: relative;
		margin-top:20upx ;
		overflow: hidden;
	}
	.add-add-detail image{
		width: 14upx;
		height: 24upx;
		position: absolute;
		top: 50%;
		right: 20upx;
		transform: translate(0,-50%);
		z-index: 2;
	}
	.add-add-name{
		position: relative;
		float: left;
		margin-top: 24upx;
		margin-left: 20upx;
	}
	.add-add-called{
		position: relative;
		/* float: none; */
		margin-top: 24upx; 
		left: 20upx;
	}
	.add-add-add{
		clear: both;
		font-size: 24upx;
		margin-top: 20upx;
		margin-left: 20upx;
		color: #666;
		width: 630upx;
		margin-bottom:20upx ;
	}
	
	
	
	.order-details{
		width: 710upx;
		height: 470upx;
		background: white;
		margin: 0 auto;
		margin-top: 20upx;
		position: relative;
	}
	.order-details-image{
		width: 160upx;
		height: 160upx;
		position: absolute;
		left: 20upx;
		top: 20upx;
	}
	.order-details-words{
		corlor:#333;
		font-size: 24upx;
		width: 491upx;
		position: absolute;
		left: 199upx;
		top: 29upx;
		line-height: 26.5upx;
		
	}
	.order-details-type{
		// width: 180upx;
		height: 40upx;
		background: #eee;
		position: absolute;
		left: 200upx;
		top: 96upx;
		font-size: 25upx;
		color: #999;
	}
	.order-details-type text{
		display: block;
		transform: scale(0.8);
	}
	.order-details-price{
		position: absolute;
		left: 199upx;
		top: 149upx;
		font-size: 26upx;
		color: #EF1C00;
	}
	.order-details-wrapper{
		width: 670upx;
		height: 270upx;
		position: absolute;
		top: 200upx;
		left: 50%;
		transform: translate(-50%,0);
	}
	.order-details-number,.order-details-off,.order-details-other{
		width: 100%;
		height: 90upx;
		border-top: 1px solid #ddd;
		font-size: 24upx;
		color: #333;
		line-height: 90upx;
		position: relative;
	}
	.order-details-number-wrapper{
		width: 180upx;
		height: 38upx;
		position: absolute;
		top: 25upx;
		right: 0upx;
	}
	.order-details-number-wrapper view{
		position: absolute;
		top: 0;
		line-height: 38upx;
		font-size: 20upx;
		text-align: center;
		color: #999;
	}
	.order-details-number-dec{
		width: 50upx;
		background-color: #eee;
		border-radius: 5upx;
	}
	.order-details-number-value{
		width: 60upx;
		background-color: #eee;
		border-radius: 5upx;
		margin-left: 60upx;
	}
	.order-details-number-add{
		width: 50upx;
		background-color: #eee;
		border-radius: 5upx;
		margin-left: 130upx;
	}
	.order-details-off image{
		width: 14upx;
		height: 24upx;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0,-50%);
	}
	.payment-method{
		width: 710upx;
		height: 180upx;
		background: white;
		margin: 0 auto;
		margin-top: 20upx;
		position: relative;
	}
	.payment-method-first,.payment-method-second{
		height: 90upx;
		width: 670upx;
		color: #333;
		font-size: 24upx;
		line-height: 90upx;
		position: relative;
		margin: 0 auto;
	}
	.payment-method-first{
		border-bottom: 1px solid #ddd;
	}
	.payment-method label{
		position: absolute;
		transform: translate(0,-50%);
		right: 20upx;
	}
	.payment-method label:nth-child(1){
		top: 45upx;
	}
	.payment-method label:nth-child(2){
		top: 135upx;
	}
	.bottom-wrapper{
		width: 100%;
		height: 99upx;
		background-color: white;
		position: fixed;
		bottom: 0;
	}
	.bottom-wrapper-number{
		color: #999;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		left: 283upx;
		font-size: 25upx;
	}
	.bottom-wrapper-number text{
		display: block;
		transform: scale(0.8);
	}
	.bottom-wrapper-price{
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
		left: 370upx;
		font-size: 24upx;
	}
	.bottom-wrapper-price text{
		color: #EF1C00;
	}
	.bottom-wrapper-button{
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
