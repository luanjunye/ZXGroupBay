const util = require('../../../utils/util');

Page({
  data: {
    name: String,
    mobile: String,
    verifyCode: Number,
    address:[],
    addressDetail: String,
    invitation: String,
  },

  onLoad: function (options) {

  },

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