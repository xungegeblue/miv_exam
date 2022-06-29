const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:null,
		hasUserInfo:false,
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		console.log('show...')
		let userInfo = app.globalData.userInfo
		if(userInfo!=null){
			this.setData({
				hasUserInfo:true,
				userInfo,
			})
		}
	},
	getUserInfo(){
		//用户登录
		wx.navigateTo({
			url: '/pages/info/index',
		})
	}
})