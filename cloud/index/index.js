// 云函数入口文件
const cloud = require('wx-server-sdk')
const _ = require('lodash')

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
	}else if(type == 'tiku'){
		let res = await cloud.database().collection('store').get()
		let tiList = res.data
		_.flatMap(tiList,item=>{
			if(item.question_ids){
				item.size = item.question_ids.length
			}else{
				item.size = 0
			}
		})
		result = tiList
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