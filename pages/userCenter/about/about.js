const util = require('../../../utils/util');

Page({
  data: {
    list: [
      {id: 0, title: '用户协议', url: '/pages/userCenter/agreement/agreement'},
      {id: 1, title: '退换货说明', url: '/pages/userCenter/annouceRefund/annouceRefund'},
      {id: 2, title: '名词解释', url: '/pages/userCenter/dictionary/dictionary'},
      {id: 3, title: '资质信息', url: '/pages/userCenter/qualification/qualification'},
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