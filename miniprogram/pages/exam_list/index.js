// pages/exam_list/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	onLoad(){
		wx.cloud.callFunction({
			name: 'index',
			data:{
				type:'kaoshi_list'
			}
		}).then(res=>{
			let tiList = res.result
			console.log('考试！')
			console.log(tiList)
			this.setData({tiList})
		})
	},
	checkLogin(){
		//判断用户登录
		let userInfo = wx.getStorageSync('userInfo')
		if(userInfo!=null && userInfo!=""){
			return true
		}else{
			return false
		}
	},
	goExam(e){
		if(!this.checkLogin()){
			wx.showToast({
				title: '请先进行登录',
				icon:'none'
			})
			return
		}
		let id = e.currentTarget.dataset.item._id
		wx.navigateTo({
			url: `/pages/exam/index?id=${id}`,
		})
	}
})