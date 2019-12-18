const util = require('../../../utils/util');

Page({
  data: {
    pics: [
      'https://xiaochengxu-tuan.oss-cn-hangzhou.aliyuncs.com/images/2019-12-18/157665840556892.jpg',
      'https://xiaochengxu-tuan.oss-cn-hangzhou.aliyuncs.com/images/2019-12-18/157665841857795.jpg',
      'https://xiaochengxu-tuan.oss-cn-hangzhou.aliyuncs.com/images/2019-12-18/157665842427284.jpg'
      ]
  },

  onLoad: function (options) {},


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