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
	goExam(e){
		let id = e.currentTarget.dataset.item._id
		wx.navigateTo({
			url: `/pages/exam/index?id=${id}`,
		})
	}
})