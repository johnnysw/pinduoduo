import Mock from 'mockjs';

let data = Mock.mock("https://www.coupon3.com",{
	"list|1-10":[
		{
			
			"price|100-500":120,
			"categoryTopLimit|1000-5000":1000,
			"categoryTitle":"@ctitle(2,3)劵",
			"LimitTime":'@date("yyyy.MM.dd")-@date("yyyy.MM.dd")'
		}
	]
});
export default data;