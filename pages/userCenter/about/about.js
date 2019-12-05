const util = require('../../../utils/util');

Page({
  data: {
    list: [
      {id: 0, title: '用户协议', url: '/pages/userCenter/agreement/agreement'},
      {id: 1, title: '退换货说明', url: '/pages/userCenter/annouceRefund/annouceRefund'},
    ]
  },

  onLoad: function (options) {

  },

  // 跳转页面
  menuListTaped(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: this.data.list[id].url
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