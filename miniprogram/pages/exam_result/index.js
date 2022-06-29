// pages/exam_result/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		score: 0,
		all_score: 0,
		true_count: 0,
		error_count: 0,
		rate: 0,
		name:'',
		loadding:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
    //显示考试情况
    let id = options.id
    wx.cloud.callFunction({
      name: 'index',
      data:{
        type:'get_record',
        id
      }
    }).then(res=>{
			console.log(res)
      this.setData({
				...res.result,
				loadding:true
			})
    })
		//let item = JSON.parse(options.item)
		//this.setData({...item})
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