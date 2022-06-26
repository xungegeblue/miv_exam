// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()

	let type = event.type
	let result = null

	if(type == 'banner'){
		//获取录播图配置
		result = await cloud.database().collection('config').where({
			name:'轮播图'
		}).get()
	}else{
		result =  {
			event,
			openid: wxContext.OPENID,
			appid: wxContext.APPID,
			unionid: wxContext.UNIONID,
		}
	}
	console.log(result)
	return result
}