const app = getApp()

Page({
	globalData:{
    userInfo:null,
  },
  data: {
    avatar: "",
		name:"",
		remark:""
  },
  onLoad() {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  onChooseAvatar(e) {
		const { avatarUrl } = e.detail 
    this.setData({
      avatar:avatarUrl,
    })
	},
	saveInfo(){
		let avatar = this.data.avatar
		let name = this.data.name
		let remark = this.data.remark
		if(avatar===""){
			wx.showToast({
				icon: "none",
				title: '请选择个人头像',
			})
			return 
		}
		console.log(name)
		if(name === ""){
			wx.showToast({
				icon: "none",
				title: '请填写用户名',
			})
			return 
		}
		let that = this
		//进行登录
		wx.cloud.callFunction({
			name: 'index',
			data:{
				type:'login',
				avatar,
				name,
				remark
			}
		}).then(res=>{
				//保存数据
				app.globalData.userInfo = res.result
				console.log(app.globalData)
				//返回页面
				wx.navigateBack({
					delta: 1,
				})
		})
	},
	changeName(e){
		this.setData({
			name:e.detail
		})
	},
	changeRemark(e){
		this.setData({
			remark:e.detail
		})
	}
})
