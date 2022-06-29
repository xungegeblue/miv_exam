// index.js
require('../../lib/lodash-fix')
const _ = require('../../lib/lodash.min');
const dayjs = require('../../lib/dayjs')

Page({
	data:{
		banner:{},
		tiList:[]
	},
	onLoad(){
		wx.cloud.callFunction({
			name: 'index',
			data:{
				type:'tiku'
			}
		}).then(res=>{
			let tiList = res.result
			this.setData({tiList})
		})

		wx.cloud.callFunction({
			name: 'index',
			data:{
				type:'banner'
			}
		}).then(res=>{
				let banner = res.result.data[0]
				this.setData({
					banner
				})
		})
	},
	goPractice(e){
		let id = e.currentTarget.dataset.item._id
		wx.navigateTo({
			url: `/pages/practice/index?id=${id}`,
		})
	}
})
