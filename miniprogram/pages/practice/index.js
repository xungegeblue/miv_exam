require('../../lib/lodash-fix')
const _ = require('../../lib/lodash.min');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: null, //题库ID
		tiList: [], //所有题目
		current: 0,
		swiperHeight: 0,
		mode: 'dati', //答题模式（dati）、背题模式（beiti）、考试模式(kaoshi)
		answer: {}, //回答过的题目
		trueAnswer:{}, //正确答案
		okSubmit:{}//确认选择（current->true/false)
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
			let trueAnswer = {}
			_.forEach(tiList,(v,k)=>{
				trueAnswer[k] = v.true
			})
			this.setData({trueAnswer})
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
		this.setData({
			['okSubmit[' + this.data.current + ']']: true
		})
			console.log(this.data.answer)
			console.log(this.data.okSubmit)

	},
	handlerAnswer(e) {
		
		let item = this.data.tiList[this.data.current]
		let type = item.type
		let the_answer = e.currentTarget.dataset.answer
		
		//已经选择过了
		if(this.data.okSubmit[this.data.current] === true){
			console.log('选择过了')
			return
		}

		if (type === '多选题') {
			//判断题
			let str = this.data.answer[this.data.current]
			
			if(str == null){
				this.setData({
					['answer[' + this.data.current + ']']: the_answer
				})
			}else if(str.indexOf(the_answer)==-1){
				this.setData({
					['answer[' + this.data.current + ']']: the_answer+str
				})
			}else{
				this.setData({
					['answer[' + this.data.current + ']']: str.replace(the_answer,"")
				})
			}
		} else {
			//单选、或者判断题
			this.setData({
				['answer[' + this.data.current + ']']: the_answer
			})
			this.goNext()
		}
		//console.log(this.data.answer)
	},
	changeMode(e){
		let mode = e.currentTarget.dataset.mode
		this.setData({mode})
	}
})