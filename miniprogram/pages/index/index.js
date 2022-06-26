// index.js
require('../../lib/lodash-fix')
const _ = require('../../lib/lodash.min');
const dayjs = require('../../lib/dayjs')

Page({
	data:{
		banner:{}
	},
	onLoad(){
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
	}
})
