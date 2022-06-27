// pages/practice/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id:null,//题库ID
		tiList:[],//所有题目
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let id = options.id
		this.init()
	},
	/**
	 * 下载题库信息
	 */
	init(){
		wx.cloud.callFunction({
			name: 'index',
			data:{
				type:'dati',
				store_id:"6d85a2b962b967f40d115e651c0b7410"
			}
		}).then(res=>{
			let tiList = res.result
			this.setData({tiList})
			console.log(tiList)
		})
	}
})