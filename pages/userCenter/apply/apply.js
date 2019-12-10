const util = require('../../../utils/util');
const api = require('../../../config/url.js');

// 地图相关
const chooseLocation = requirePlugin('chooseLocation');
const key = 'HYZBZ-EX3CJ-CR2F6-KZDG3-AX3C2-CKFDF'; //使用在腾讯位置服务申请的key
const referer = '泽轩优选'; //调用插件的app的名称

Page({
  data: {
    name: '',
    mobile: '',
    verifyCode: '',
    address:[],
    addressString: '',
    addressLatitude: 0,
    addressLongitude: 0,
    pointAddress: '',
    addressDetail: '',
    invitation: '',
    idCard: '',
    bankCardNo: '',
    bankName: '',
    countdown: 60, // 验证码倒计时
    verifyCodeReceiving: false,
    intervalHandle: null // 倒计时 handle

  },

  onLoad: function (options) { },
  onShow: function () {
    // 页面显示时，获取地图选址返回的结果
    let location = chooseLocation.getLocation();
    if (location){
      console.log(location);
      this.setData({
        addressLatitude: location.latitude,
        addressLongitude: location.longitude,
        pointAddress: location.address + location.name
      })
    }
  },

  // 打开地图选择插件
  openAddressPlugin() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] == undefined || res.authSetting['scope.userLocation']) {
          wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
          });
        } else {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
            }
          })
        }
      }
    })
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
    } else if (!(util.REGEX.idCard.test(this.data.idCard))) {
      util.toast('身份证号有误')
    } else if (this.data.bankCardNo.length < 1) {
      util.toast('请填写银行卡号')
    } else if (this.data.bankName.length < 1) {
      util.toast('请填写开户行')
    } else if (this.data.pointAddress.length < 1) {
      util.toast('请选择定位地址')
    } else {
      let requestData = {
        address: this.data.address.join(''),
        invitationCode: this.data.invitation,
        mobile: this.data.mobile,
        name: this.data.name,
        street: this.data.addressDetail,
        idCard: this.data.idCard,
        bankNumber: this.data.bankCardNo,
        bankName: this.data.bankName,
        userId: util.getUserInfo().userId,
        latitude: this.data.addressLatitude,
        longitude: this.data.addressLongitude,
        pointAddress: this.data.pointAddress
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


  // 修改省市区地址时
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


  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});