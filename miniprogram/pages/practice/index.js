// pages/practice/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: null, //题库ID
		tiList: [], //所有题目
		current: 0,
		swiperHeight: 0,
		mode: 'beiti', //答题模式（dati）、背题模式（beiti）、考试模式(kaoshi)
		answer: {}, //回答过的题目
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let id = options.id
		this.init()
	},
	swiperChange(e) {
		let current = e.detail.current
		this.setData({
			current
		})
		this.getHeight('deh')
	},
	/**
	 * 下载题库信息
	 */
	init() {
		wx.cloud.callFunction({
			name: 'index',
			data: {
				type: 'dati',
				store_id: "6d85a2b962b967f40d115e651c0b7410"
			}
		}).then(res => {
			let tiList = res.result
			this.setData({
				tiList
			})
			this.getHeight()
		})
	},
	getHeight() { //根据不同的类名，去获取不同的内容高度
		// 获取元素高度
		let query = wx.createSelectorQuery();
		//选择id
		let that = this;
		let id = '#swiper-' + this.data.current
		query.select(id).boundingClientRect(function (rect) {
			console.log(rect)
			console.log(rect.height + 20 + 'px')
			that.setData({
				swiperHeight: rect.height + 20 + 'px'
			})
		}).exec();
	},
	//切换下一题 
	goNext() {

		// let current = this.data.current
		// if (current + 1 < this.data.tiList.length) {
		// 	console.log('....')
		// 	this.setData({
		// 		current: current + 1
		// 	})
		// }
		// console.log(this.data.answer)

	},
	handlerAnswer(e) {
		//需要判断是否多选题
		let item = this.data.tiList[this.data.current]
		let type = item.type
		let the_answer = e.currentTarget.dataset.answer

		if(this.data.answer[this.data.current]!=null){
			return
		}

		this.setData({
			['answer[' + this.data.current + ']']: the_answer
		})

		if (type === '多选题') {

		} else {
			//单选、或者判断题
			this.goNext()
		}
		//console.log(this.data.answer)
	}
})