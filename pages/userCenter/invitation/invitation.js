const util = require('../../../utils/util');

Page({
  data: {

  },

  onLoad: function (options) {

  },

  // 保存二维码到相册
  downloadPoster(){
    wx.saveImageToPhotosAlbum({
      filePath: '/assets/list1.jpg',
      success: res => {
        util.toastSuccess('二维码已保存到相册')
      }
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