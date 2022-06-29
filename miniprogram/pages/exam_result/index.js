// pages/exam_result/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		score: 0,
		allScore: 0,
		trueCount: 0,
		errorCount: 0,
		rate: 0,
		name:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		//显示考试情况
		let item = JSON.parse(options.item)
		this.setData({...item})
		//记录答题情况
	},
	back(){
		wx.navigateBack({
			delta: 3,
		})
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})