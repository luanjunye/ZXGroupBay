const util = require('../../../utils/util');

Page({
  data: {
    tapCount: 0,
  },

  onLoad: function (options) {

  },


  // 添加点击次数
  addTapCount(){
    this.setData({
      tapCount: this.data.tapCount + 1
    });
    if(this.data.tapCount > 10){
      wx.setStorageSync('showVideo', true);
    }
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