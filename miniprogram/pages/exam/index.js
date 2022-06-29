require('../../lib/lodash-fix')
const _ = require('../../lib/lodash.min');
import {strSort} from '../../lib/tool'
import Dialog from '../../compoents/dialog/dialog';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: null, //题库ID
		exam:null,
		tiList: [], //所有题目
		current: 0,
		swiperHeight: 0,
		mode: 'dati', //答题模式（dati）、背题模式（beiti）、考试模式(kaoshi)
		answer: {}, //回答过的题目
		trueAnswer:{}, //正确答案
		okSubmit:[],//确认选择（current->true/false)
		scoreMap:[],//答题情况（current-是否正确）
		popup:false,
		show:false,
		loadding:false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let id = options.id
		console.log(id)
		this.setData({id})
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
				type: 'kaoshi',
				exam_id: this.data.id
			}
		}).then(res => {
			let tiList = res.result.questions
			let exam = res.result.exam
			//排序好正确答案
			_.forEach(tiList,(v,k)=>{
				v.true = strSort(v.true)
			})
			this.setData({loadding:true})
			this.setData({
				exam,
				tiList,
				scoreMap:  new Array(tiList.length),
				okSubmit: new Array(tiList.length)
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

		let an = this.data.answer[this.data.current]

		this.setData({
			['okSubmit[' + this.data.current + ']']: an!=''
		})
		console.log(this.data.okSubmit)

		let okSubmit = this.data.okSubmit
		let scoreMap = new Array(this.data.tiList.length)
		_.forEach(this.data.tiList,(v,k)=>{
			console.log('for .....')
			if(okSubmit[k]){
				//答题完毕
				let a = this.data.answer[k]
				let b = this.data.trueAnswer[k]
				let status = a===b
				scoreMap[k] = status
			}else{
				scoreMap[k] = undefined
			}
		})
		
		this.setData({scoreMap})
		
	},
	handlerAnswer(e) {
		
		let item = this.data.tiList[this.data.current]
		let type = item.type
		let the_answer = e.currentTarget.dataset.answer
		
		
		
		if (type === '多选题') {
			//判断题
			let str = this.data.answer[this.data.current]
			
			if(str == null){
				this.setData({
					['answer[' + this.data.current + ']']: the_answer
				})
			}else if(str.indexOf(the_answer)==-1){
				this.setData({
					['answer[' + this.data.current + ']']: strSort(the_answer+str)
				})
			}else{
				this.setData({
					['answer[' + this.data.current + ']']: str.replace(the_answer,"")
				})
			}
			this.goNext()
		} else {
			//单选、或者判断题
			this.setData({
				['answer[' + this.data.current + ']']: the_answer
			})
			this.goNext()
		}
		//console.log(this.data.answer)
	},
	showMobal(){
		console.log('sho')
		this.setData({popup:true})
	},
	close(){
		this.setData({popup:false})
	},
	changeTi(e){
		let current = e.currentTarget.dataset.current
		if(current === this.data.current){
			this.setData({popup:false})	
		}else{
			let popup = false
			this.setData({current,popup})
		}
	},
	submit(){
		this.setData({show:true})
		console.log('提交试卷')
	},
	onClose(e){
		//提交试卷
	  if(e.type === 'confirm'){
			console.log('提交试卷！')
			//计算分数、答对、答错、正确率
			console.log(this.data.scoreMap)
			let score = 0;
			let allScore = 0;
			let trueCount = 0;
			let errorCount = 0;
			let rate = 0;

			_.forEach(this.data.tiList,(v,k)=>{
					allScore+=v.score
					let a = this.data.scoreMap[k]
					if(a!=true){
						errorCount+=1
						score+=v.score
					}else{
						trueCount+=1
					}
			})
			rate = ((trueCount * 100)/(trueCount + errorCount) * 100) 
			rate = Math.round(rate/100)

			let item = {score,allScore,trueCount,errorCount,rate}
			item.name = this.data.exam.name
			item = JSON.stringify(item)
			console.log("item:"+item)

			wx.navigateTo({
				url: '/pages/exam_result/index?item='+item,
			})
		}
	}
})