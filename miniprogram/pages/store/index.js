// pages/store/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tiList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.cloud.callFunction({
			name: 'index',
			data:{
				type:'tiku'
			}
		}).then(res=>{
			let tiList = res.result
			this.setData({tiList})
		})
	},
	goPractice(e){
		let id = e.currentTarget.dataset.item._id
		wx.navigateTo({
			url: `/pages/practice/index?id=${id}`,
		})
	}
})