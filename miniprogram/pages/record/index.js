// pages/record/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    rcList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
    wx.cloud.callFunction({
      name: 'index',
      data:{
        type:'record_list',
      }
    }).then(res=>{
      this.setData({rcList:res.result})
    })
	},
	goExamResult(e){
		let id = e.currentTarget.dataset.item._id
		console.log(id)
		wx.navigateTo({
			url: '/pages/exam_result/index?id='+id,
		})
	}

})