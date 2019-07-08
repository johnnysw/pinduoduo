<template>
	<view class='total'>
		<view class="content">
			<!-- 拼单人数 -->
			<view class="up">
				<text class="tip">{{num}}</text>
				<text class="tip">人正在拼单，可直接参与</text>
				<text class='cuIcon-right'></text>
			</view>
			<!-- 拼单用户详情 -->
			<view class="wai">
				<view class="list" v-for="(obj,index) in userList" :key="index">
					<view class="middle">
						<!-- 用户信息 -->
						<view class="user">
							<view class='cu-avatar round'>
								<image class='img' :src="obj.img" mode=""></image>
							</view>
							<text class="name">{{obj.name}}</text>
						</view>
						<!-- 剩余时间 -->
						<view class="two">
							<view class="lack">
								<text>还差</text>
								<text class='num'>1人</text>
								<text>拼成</text>
							</view>
							<view class="time">
								<text>剩余</text>
								<text>{{obj.remainTimeStr}}</text>
							</view>
						</view>
						<view class="pindan">
							<button type="warn" class="btn">去拼单</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: [], //人数
				userList: [], //存所有的数据
				time: [], //当前时间减去模拟时间的时间差
				time1: [] //一天的毫秒数减去时间差的结果
			}
		},
		created() {
			this.getUser();
		},
		methods: {
			getUser() {
				uni.request({
						url: 'https://easy-mock.com/mock/5cea36ce8347da71af1d4b52/test/pinduoduo'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						// console.log(res.data);
						this.userList = [...this.userList, ...res.data.data.record];
						this.num = this.userList.length;
						console.log(this.userList);
						for (var i = 0; i < this.userList.length; i++) {
							var date1 = this.userList[i].date; //取出每个时间
							var date2 = new Date(); //当前时间
							var date3 = date2.getTime() - new Date(date1).getTime(); //计算时间差
							this.time.push(date3); //存入数组
						}
						// console.log(this.time);
						for (var j = 0; j < this.time.length; j++) {
							var oneday = 86400000;
							var count = oneday - this.time[j]; //24小时减去时间差
							this.time1.push(count); //存入数组
						}
						for (var x = 0; x < this.time1.length; x++) {
							for (var y = 0; y < this.userList.length; y++) {
								this.userList[y].remainTime = this.time1[y]; //把time1中的值分别赋给userList.remainTime
							}
						}
						let self = this;
						let timer = setInterval(function() {
							for (let i = 0; i < self.userList.length; i++) {
								self.userList[i].remainTime -= 1000;
								let t = self.userList[i].remainTime;
								if (t > 0) {
									let hour = Math.floor((t / 3600000) % 24);
									let min = Math.floor((t / 60000) % 60);
									let sec = Math.floor((t / 1000) % 60);
									hour = hour < 10 ? '0' + hour : hour;
									min = min < 10 ? '0' + min : min;
									sec = sec < 10 ? '0' + sec : sec;
									let format = '';
									format = `${hour} : ${min} : ${sec} `;
									self.userList[i].remainTimeStr = format;
								} else {
									// 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
									let flag = self.userList.every((val, ind) => val.remainTime <= 0);
									if (flag) clearInterval(timer);
									self.userList[i].remainTimeStr = `00 : 00 : 00 `;
								}
							}
						}, 1000)
					})
			}
		}
	}
</script>

<style>
	/* 拼单人数 */
	.total {
		background: #fff;
	}

	.content {
		margin: 0upx 20upx;
	}

	.up {
		display: flex;
		height: 90upx;
		line-height: 90upx;
		font-size: 24upx;
	}

	.cuIcon-right {
		flex: 1;
		text-align: right;
	}

	.tip {
		font-weight: bold;
	}

	/* 拼单详情 */
	.wai {
		height: 220upx;
		overflow: hidden;
	}

	.list {
		height: 110upx;
	}

	.middle {
		display: flex;
		height: 112upx;
		border-top: 2upx solid #ccc;
	}

	.user {
		margin: auto 0;
		font-weight: bold;
		font-size: 22upx
	}

	.img {
		width: 62upx;
		height: 62upx;
		border-radius: 50%;
	}

	.name {
		line-height: 62upx;
		margin-left: 20upx;
		font-size: 24upx;
	}

	.two {
		flex: 1;
		margin: 20upx 20upx;
		display: flex;
		flex-direction: column;
	}

	.num {
		color: #f00;
	}

	.lack {
		text-align: right;
		font-weight: bold;
		font-size: 24upx;
		flex: 1;
	}

	.time {
		text-align: right;
		font-size: 22upx;
		flex: 1;
	}

	.pindan {
		line-height: 115upx;
		margin: auto 0 auto auto;
	}

	.btn {
		color: #fff;
		background: red;
		width: 160upx;
		height: 70upx;
		line-height: 70upx;
		font-size: 24upx;
		border-radius: 5upx;
	}
</style>
