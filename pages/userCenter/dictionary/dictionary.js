const util = require('../../../utils/util');
const app = getApp();
Page({
  data: {
    contentHeight: 0
  },

  onLoad: function (options) {
    this.setData({
      contentHeight: app.globalData.screenHeight
    })
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