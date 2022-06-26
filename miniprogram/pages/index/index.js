// index.js
require('../../lib/lodash-fix')
const _ = require('../../lib/lodash.min');
const dayjs = require('../../lib/dayjs')

Page({
	onLoad(){
	
		//0, 使用lodash
		//console.log(_.random(0, 5))
		//console.log(dayjs().format('YYYY-MM-DD') )
		
		//1，云数据库demo
		// wx.cloud.database().collection('exam').get().then(res=>{
		// 	console.log(res)
    // })
    
    //2，云函数demo
    // wx.cloud.callFunction({
    //   name: 'index'
    // }).then(res=>{
    //   console.log(res)
    // })
	}
})
