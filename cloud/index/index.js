// 云函数入口文件
const cloud = require('wx-server-sdk')

const _ = require('lodash')

cloud.init()

const db = cloud.database();
const cm = db.command;

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
	}else if(type == 'dati'){
		//查询题库
		let store_id = event.store_id
		let store = (await cloud.database().collection('store').doc(store_id).get()).data;
		//查询所有的题目
		let question_ids = store.question_ids
		
		let questions = (await cloud.database().collection('questions').where({_id:cm.in(question_ids)}).get()).data
	
		//返回所有的题目
		result = questions
	}else if(type == 'kaoshi_list'){
		let res = await cloud.database().collection('exam').get()
		let tiList = res.data
		_.flatMap(tiList,item=>{
			if(item.question_ids){
				item.size = item.question_ids.length
			}else{
				item.size = 0
			}
		})
		result = tiList
	}else if(type == 'kaoshi'){
		//查询题库
		let exam_id = event.exam_id
		let exam = (await cloud.database().collection('exam').doc(exam_id).get()).data;
		//查询所有的题目
		let question_ids = exam.question_ids

		let questions = (await cloud.database().collection('questions').where({_id:cm.in(question_ids)}).get()).data

		//返回所有的题目
		result = {exam,questions}
	}else if(type === 'login'){
		let name = event.name
		let avatar = event.avatar
		let remark = event.remark
		let openid = wxContext.OPENID
		let unionid =  wxContext.UNIONID
		//如果用户不存在就保存
		let user = (await cloud.database().collection('user').where({
			openid
		}).get()).data

		if(user.length == 0){
			cloud.database().collection('user').add({
				data:{
					name,
					remark,
					avatar,
					openid,
					unionid
				}
			})
		}else{
			//这里有缺陷，需要提示用户不存在
			result = {...user[0]}
		}
	}else{
		result =  {
			event,
			openid: wxContext.OPENID,
			appid: wxContext.APPID,
			unionid: wxContext.UNIONID,
		}
	}
	return result
}