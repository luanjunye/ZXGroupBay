const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
const app = getApp();

Page({
  data: {
    postUrl: ''
  },

  onLoad: function () {
    this.getPoster();
  },

  // 获取海报信息
  getPoster(){
    let that = this;
    util.request(api.TuanPoster, {}, 'GET').then(res=>{
      that.setData({
        postUrl: res
      })
    })
  },

  // 保存海报到相册
  downloadPoster(){

    wx.downloadFile({
      url: this.data.postUrl,
      success (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: res => {
              util.toastSuccess('海报已保存到相册')
            }
          })
        }
      }
    })
  },

// ========================
  onPullDownRefresh: function () {
    this.getPoster();
  },

  onReady: function () { },
  onShow: function () { },

  // onHide: function () { },
  // onUnload: function () { },
  // onReachBottom: function () { },
  // onShareAppMessage: function () { }
});