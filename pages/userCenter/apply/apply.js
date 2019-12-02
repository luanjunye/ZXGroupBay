const util = require('../../../utils/util');
const api = require('../../../config/url.js');

Page({
  data: {
    name: '',
    mobile: '',
    verifyCode: '',
    address:[],
    addressString: '',
    addressDetail: '',
    invitation: '',
    countdown: 60, // 验证码倒计时
    verifyCodeReceiving: false,
    intervalHandle: null // 倒计时 handle

  },

  onLoad: function (options) {

  },


  // 提交
  submit(){
    if (this.data.name.length < 1) {
      util.toast('请输入名字')
    } else if (!(util.REGEX.mobile.test(this.data.mobile))) {
      util.toast('请输入正确的手机号')
    } /*else if (this.data.verifyCode.length < 1) {
      util.toast('请填写验证码')
    } */else if (this.data.addressString.length < 1) {
      util.toast('请选择省市区')
    } else if (this.data.addressDetail.length < 1) {
      util.toast('请填写详细地址')
    } else {
      let requestData = {
        address: this.data.address.join(''),
        invitationCode: this.data.invitation,
        mobile: this.data.mobile,
        name: this.data.name,
        street: this.data.addressDetail,
        userId: util.getUserInfo().userId
      }
      util.request(api.MasterApply, requestData, 'POST').then(res => {
        util.toastSuccess('申请已成功提交');
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      })

    }
  },

  // 获取验证码
  getVerifyCode(){
    let that = this;
    this.setData({
      verifyCodeReceiving: true
    })

    let intervalHandle =  setInterval(()=>{
      if(that.data.countdown > 0){
        that.setData({
          countdown: that.data.countdown - 1
        })
      } else {
        that.setData({
          countdown: 60,
          verifyCodeReceiving: false,
        })
      }

    },1000)
  },


  // 修改地址时
  locationChange(e){
    let data = e.detail;
    this.setData({
      address: data.value,
      addressString: data.value.join('-')
    })
  },


  // input 值绑定
  handleInputChange: function(e) {
    let name = e.currentTarget.dataset.model; // 取出定义的变量名
    let value = e.detail.value; // 取出实时的变量值
    let dataMap = {}; // 定义一个键值对
    dataMap[name] = value; // 设置这个键值对的键和值
    this.setData(dataMap); // 刷新数据
    // 这里用于测试
    console.log(name, ':', this.data[name]) // 显示 page 内 data 的实际数据
  },


// ========================
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});