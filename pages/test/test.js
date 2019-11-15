const util = require('../../utils/util');

Page({
  data: {
    count: 3,
    index: 1
  },

  onLoad: function (options) {

  },

  increaseIconBadge(count){
    let that = this;
    let currentCount = that.data.count + count;

    wx.setTabBarBadge({
      index: that.data.index,
      text: currentCount.toString(),
      success: () => {
        that.setData({
          count: currentCount
        })
      }
    })
  },

  decreaseIconBadge(count){
    let that = this;
    let currentCount = that.data.count - count;

    if (currentCount < 1){
      wx.removeTabBarBadge({
        index: that.data.index,
        success: res => {
          that.setData({
            count: 0
          })
        }
      });
    } else {
      wx.setTabBarBadge({
        index: that.data.index,
        text: currentCount.toString(),
        success: () => {
          that.setData({
            count: currentCount
          })
        }
      })
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