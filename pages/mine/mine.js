const util = require('../../utils/util');

Page({
  data: {

  },


  applyGroupMaster(){
    wx.showToast({
      icon: 'none',
      title: '您已提交过申请了,请耐心等待审核'
    })
  },

  onLoad: function (options) {

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